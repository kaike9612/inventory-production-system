# Configurar Java no PATH do usuário
$javaPath = "C:\Program Files\Java\jdk-17\bin"

# Obter PATH atual
$currentPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")

# Verificar se Java já está no PATH
if ($currentPath -notlike "*$javaPath*") {
    # Adicionar Java ao PATH
    $newPath = $currentPath + ";" + $javaPath
    [System.Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
    Write-Host "Java adicionado ao PATH do usuário"
} else {
    Write-Host "Java já está no PATH"
}

# Mostrar PATH atualizado
Write-Host "PATH atual:"
[System.Environment]::GetEnvironmentVariable("PATH", "User")
