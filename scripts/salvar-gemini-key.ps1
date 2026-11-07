# Lê a chave Gemini da área de transferência e grava em privados/gemini.env
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$priv = Join-Path $root 'dados e chaves\privados'
$out = Join-Path $priv 'gemini.env'

$key = (Get-Clipboard -Raw).Trim()
if ([string]::IsNullOrWhiteSpace($key)) {
  Write-Host 'Área de transferência vazia. Copie a API key no AI Studio e rode de novo.'
  exit 1
}
# remove aspas acidentais
$key = $key.Trim('"', "'")
# Formatos: AIza... (clássico) ou AQ.... (AI Studio recente)
if ($key -match '(AIza[0-9A-Za-z_\-]{20,}|AQ\.[0-9A-Za-z_\-]{20,})') {
  $key = $Matches[1]
} elseif ($key -match 'X-goog-api-key:\s*([^\s\\]+)') {
  $key = $Matches[1].Trim()
} else {
  Write-Host 'O texto copiado não parece uma API key do Gemini (AIza... ou AQ....).'
  Write-Host ('Tamanho copiado: ' + $key.Length)
  exit 1
}

$content = @"
# Gemini — NÃO SUBIR AO GIT
GEMINI_API_KEY=$key
GEMINI_MODEL=gemini-2.5-flash
"@
[System.IO.File]::WriteAllText($out, $content, (New-Object System.Text.UTF8Encoding $false))
Write-Host "OK: salvo em dados e chaves\privados\gemini.env"
Write-Host ("chave len=" + $key.Length + " (não exibida)")
Write-Host 'Próximo: .\scripts\testar-gemini.ps1'
