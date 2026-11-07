# Copia envs de "dados e chaves/privados" para os apps (só na sua máquina).
# Uso: .\scripts\aplicar-env-local.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$priv = Join-Path $root 'dados e chaves\privados'

function Resolve-AppDir([string]$pattern) {
  $dir = Get-ChildItem -LiteralPath $root -Directory | Where-Object { $_.Name -like $pattern } | Select-Object -First 1
  if (-not $dir) { throw "Pasta do app nao encontrada: $pattern em $root" }
  return $dir.FullName
}

function Copy-IfExists($src, $dst) {
  if (Test-Path -LiteralPath $src) {
    $parent = Split-Path -Parent $dst
    if (-not (Test-Path -LiteralPath $parent)) {
      New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }
    Copy-Item -LiteralPath $src -Destination $dst -Force
    Write-Host "OK  $dst"
  } else {
    Write-Host "FALTA  $src  (crie a partir dos EXEMPLO em dados e chaves\export)"
  }
}

$webDir = Resolve-AppDir 'Reda*Web*'
$mobileDir = Resolve-AppDir 'Reda*Mobile*'

Copy-IfExists (Join-Path $priv 'web.env') (Join-Path $webDir '.env.local')
Copy-IfExists (Join-Path $priv 'mobile.env') (Join-Path $mobileDir '.env')

$apiDeploy = Join-Path $root 'dados e chaves\05-deploy\api'
Copy-IfExists (Join-Path $priv 'api.env') (Join-Path $apiDeploy 'local.env')

Write-Host ''
Write-Host 'Nunca rode git add em .env / .env.local / privados.'
