# Script para baixar Maven Wrapper
# Execute: powershell -ExecutionPolicy Bypass -File setup-maven-wrapper.ps1

Write-Host "Baixando Maven Wrapper..." -ForegroundColor Cyan

# Baixar maven-wrapper.jar
$wrapperJarUrl = "https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"
$wrapperJarPath = "maven-wrapper.jar"

try {
    Invoke-WebRequest -Uri $wrapperJarUrl -OutFile $wrapperJarPath -UseBasicParsing
    Write-Host "Maven Wrapper.jar baixado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao baixar Maven Wrapper: $_" -ForegroundColor Red
    exit 1
}

# Verificar se Java está instalado
Write-Host "`nVerificando Java..." -ForegroundColor Cyan
$javaCheck = java -version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Java não encontrado! Por favor, instale o JDK 17." -ForegroundColor Red
    Write-Host "Baixe em: https://adoptium.net/temurin/releases/?version=17" -ForegroundColor Yellow
    exit 1
}

Write-Host "Java encontrado: $javaCheck" -ForegroundColor Green

Write-Host "`nMaven Wrapper configurado com sucesso!" -ForegroundColor Green
Write-Host "Agora você pode usar: .\mvnw.cmd spring-boot:run" -ForegroundColor Cyan
