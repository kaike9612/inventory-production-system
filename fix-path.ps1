# Corrigir PATH removendo caminhos inválidos
$currentPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")

# Remover caminhos inválidos com "x.x.x"
$newPath = $currentPath -replace ';C:\\Program Files\\Eclipse Adoptium\\jdk-17\.x\.x\.x-hotspot\\bin', ''

# Also remove duplicate entries
$parts = $newPath -split ';' | Select-Object -Unique
$newPath = $parts -join ';'

[System.Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
Write-Host "PATH corrigido!"
Write-Host "Novo PATH:"
$newPath
