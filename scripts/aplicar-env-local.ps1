# Copia envs de "dados e chaves/privados" para os apps (só na sua máquina).
# Uso: .\scripts\aplicar-env-local.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$priv = Join-Path $root 'dados e chaves\privados'

function Copy-IfExists($src, $dst) {
  if (Test-Path -LiteralPath $src) {
    Copy-Item -LiteralPath $src -Destination $dst -Force
    Write-Host "OK  $dst"
  } else {
    Write-Host "FALTA  $src  (crie a partir dos EXEMPLO em dados e chaves\export)"
  }
}

Copy-IfExists (Join-Path $priv 'web.env') (Join-Path $root 'Redação Web\.env.local')
Copy-IfExists (Join-Path $priv 'mobile.env') (Join-Path $root 'Redação Mobile\.env')
Copy-IfExists (Join-Path $priv 'api.env') (Join-Path $root 'dados e chaves\05-deploy\api\local.env')

Write-Host ''
Write-Host 'Nunca rode git add em .env / .env.local / privados.'
