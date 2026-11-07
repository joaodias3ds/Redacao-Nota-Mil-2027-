# Abre a URL OAuth no navegador sem o Windows cortar os & 
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $root

# Garante servidor OAuth rodando em outra janela se necessário
$portBusy = Get-NetTCPConnection -LocalPort 53682 -ErrorAction SilentlyContinue
if (-not $portBusy) {
  Start-Process -FilePath 'node' -ArgumentList 'scripts/google-oauth-gmail.mjs','curso' -WorkingDirectory $root -WindowStyle Minimized
  Start-Sleep -Seconds 2
}

# Lê a URL do arquivo gerado pelo script node (mais seguro)
$urlFile = Join-Path $root 'dados e chaves\privados\_oauth-url-curso.txt'
if (Test-Path -LiteralPath $urlFile) {
  $url = (Get-Content -LiteralPath $urlFile -Raw).Trim()
  Start-Process $url
  Write-Host 'Navegador aberto. Autorize com o Gmail do CURSO.'
} else {
  Write-Host 'Aguarde o servidor gerar a URL e rode este script de novo.'
}
