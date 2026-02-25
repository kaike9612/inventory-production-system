@REM Maven Wrapper startup script for Windows
@REM Definir JAVA_HOME para JDK 17
set "JAVA_HOME=C:\Program Files\Java\jdk-17"

@echo off
set ERROR_CODE=0

@REM Get the directory where the script is located
set SCRIPT_DIR=%~dp0

@REM Remove trailing backslash
set SCRIPT_DIR=%SCRIPT_DIR:~0,-1%

@REM Use the script directory as project base dir
set MAVEN_PROJECTBASEDIR=%SCRIPT_DIR%

@REM Use default maven wrapper jar
set WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"

echo Using JAVA_HOME: %JAVA_HOME%
echo Using WRAPPER_JAR: %WRAPPER_JAR%
echo Using MAVEN_PROJECTBASEDIR: %MAVEN_PROJECTBASEDIR%

"%JAVA_HOME%\bin\java.exe" -classpath %WRAPPER_JAR% "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" org.apache.maven.wrapper.MavenWrapperMain %*

if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
cmd /C exit /B %ERROR_CODE%
