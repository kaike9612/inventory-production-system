@echo off
echo ========================================
echo Configurando Java 17 no Windows
echo ========================================
echo.

echo Definindo JAVA_HOME...
setx JAVA_HOME "C:\Program Files\Java\jdk-17" /M

echo Adicionando Java ao PATH do sistema...
setx PATH "%PATH%;C:\Program Files\Java\jdk-17\bin" /M

echo.
echo ========================================
echo CONFIGURACAO CONCLUIDA!
echo ========================================
echo.
echo IMPORTANTE: Feche este terminal e abra um NOVO terminal PowerShell
echo.
echo Para verificar, execute no novo terminal:
echo   java -version
echo.
echo Para rodar o backend:
echo   cd c:\Users\Kaike\Desktop\Projetos\inventory-production-system\inventory-backend
echo   .\mvnw spring-boot:run
echo.
pause
