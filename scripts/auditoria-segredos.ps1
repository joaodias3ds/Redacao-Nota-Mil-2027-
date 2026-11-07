# Auditoria antes de git push — rode DUAS vezes se for publicar.
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $root

$failed = $false

function Is-AllowedExample([string]$name) {
  return ($name -match '\.example$' -or $name -match '\.EXEMPLO' -or $name -eq '.env.example')
}

Write-Host '=== 1) Segredos reais presentes (ok se estiverem no .gitignore) ==='
$secretFiles = Get-ChildItem -LiteralPath $root -Recurse -Force -File -ErrorAction SilentlyContinue |
  Where-Object {
    $p = $_.FullName
    if ($p -match '\\node_modules\\|\\\.git\\|\\\.next\\|\\_tmp_remote\\|\\dist\\|\\\.expo\\') { return $false }
    if (Is-AllowedExample $_.Name) { return $false }
    if ($_.Name -eq 'NAO-SUBIR.txt' -or $_.Name -eq '.gitkeep') { return $false }
    if ($p -match '\\dados e chaves\\privados\\') { return $true }
    if ($_.Name -eq '.env' -or $_.Name -eq '.env.local' -or $_.Name -match '^\.env\.') { return $true }
    if ($_.Name -match 'credentials\.json|service-account|client_secret|\.pem$|\.p12$') { return $true }
    return $false
  }

foreach ($f in $secretFiles) {
  $ignored = git check-ignore -q $f.FullName 2>$null
  if ($LASTEXITCODE -eq 0) {
    Write-Host "  OK (ignorado pelo git): $($f.FullName)"
  } else {
    $failed = $true
    Write-Host "  RISCO NAO IGNORADO: $($f.FullName)"
  }
}

Write-Host ''
Write-Host '=== 2) git status (nao deve listar .env / privados) ==='
$status = git status --porcelain 2>$null
$bad = $status | Where-Object { $_ -match '\.env(\.|$)|credentials|privados[/\\]|service-account|client_secret|\.pem' }
# allow .env.example
$bad = $bad | Where-Object { $_ -notmatch '\.env\.example|\.EXEMPLO' }
if ($bad) {
  $failed = $true
  $bad | ForEach-Object { Write-Host "  RISCO staged/untracked: $_" }
} else {
  Write-Host '  status limpo em relacao a segredos'
}

Write-Host ''
Write-Host '=== 3) Busca por padroes de segredo no codigo versionavel ==='
$scanRoots = @(
  (Join-Path $root 'Redação Mobile'),
  (Join-Path $root 'Redação Web'),
  (Join-Path $root 'packages'),
  (Join-Path $root 'design-system'),
  (Join-Path $root 'referencia'),
  (Join-Path $root 'scripts'),
  (Join-Path $root 'docs'),
  (Join-Path $root 'dados e chaves')
)
$regex = 'AIza[0-9A-Za-z\-_]{20,}|sk-[A-Za-z0-9]{20,}|npg_[A-Za-z0-9]{10,}|eyJ[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}|postgres(ql)?://[^:\s]+:[^@\s]+@'
foreach ($sr in $scanRoots) {
  if (-not (Test-Path -LiteralPath $sr)) { continue }
  Get-ChildItem -LiteralPath $sr -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object {
      $_.FullName -notmatch 'node_modules|\.next|dist|\.expo|\\privados\\' -and
      $_.Extension -match '\.(ts|tsx|js|jsx|md|json|kt|css|ps1|txt)$' -and
      -not (Is-AllowedExample $_.Name)
    } |
    ForEach-Object {
      $lines = Select-String -LiteralPath $_.FullName -Pattern $regex -ErrorAction SilentlyContinue
      foreach ($l in $lines) {
        if ($l.Line -match 'SUBSTITUA|EXEMPLO|placeholder|MY_GEMINI|publishable|YOUR_|SEU_REF|example\.com') { continue }
        $failed = $true
        Write-Host "  RISCO $($_.FullName):$($l.LineNumber)"
      }
    }
}

Write-Host ''
if ($failed) {
  Write-Host 'RESULTADO: FALHOU — nao faca push.'
  exit 1
} else {
  Write-Host 'RESULTADO: OK para push (ainda assim revise git status).'
  exit 0
}
