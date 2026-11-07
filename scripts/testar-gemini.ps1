# Testa GEMINI_API_KEY de privados/gemini.env sem imprimir a chave
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root 'dados e chaves\privados\gemini.env'
if (-not (Test-Path -LiteralPath $envFile)) {
  Write-Host 'Falta gemini.env — rode .\scripts\salvar-gemini-key.ps1 primeiro.'
  exit 1
}

$map = @{}
Get-Content -LiteralPath $envFile -Encoding UTF8 | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
  if ($_ -match '^([^=]+)=(.*)$') { $map[$Matches[1].Trim()] = $Matches[2].Trim() }
}
$key = $map['GEMINI_API_KEY']
$model = if ($map['GEMINI_MODEL']) { $map['GEMINI_MODEL'] } else { 'gemini-3.1-flash-lite' }
if ([string]::IsNullOrWhiteSpace($key)) {
  Write-Host 'GEMINI_API_KEY vazia no arquivo.'
  exit 1
}

$tmp = Join-Path $env:TEMP 'gemini-test-body.json'
[System.IO.File]::WriteAllText(
  $tmp,
  '{"contents":[{"parts":[{"text":"Responda em uma frase curta em portugues: confirme que a API Gemini esta funcionando."}]}]}',
  (New-Object System.Text.UTF8Encoding $false)
)

$uri = "https://generativelanguage.googleapis.com/v1beta/models/$model`:generateContent"
try {
  $raw = & curl.exe -sS -X POST $uri `
    -H "Content-Type: application/json" `
    -H "x-goog-api-key: $key" `
    --data-binary "@$tmp"
  if (-not $raw) { throw 'Resposta vazia da API' }
  $resp = $raw | ConvertFrom-Json
  if ($resp.error) { throw $resp.error.message }
  $text = $resp.candidates[0].content.parts[0].text
  Write-Host 'Gemini OK'
  Write-Host ("modelo=" + $model)
  Write-Host ("resposta=" + $text)
  exit 0
} catch {
  Write-Host 'Gemini FALHOU'
  Write-Host $_.Exception.Message
  exit 1
}
