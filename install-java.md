# Como Instalar Java 17 no Windows

## Opção 1: Eclipse Temurin (Recomendado - Gratuito)

1. Acesse: https://adoptium.net/temurin/releases/
2. Selecione:
   - Version: **17**
   - Package: **JDK**
   - Architecture: **x64**
   - OS: **Windows**
   - Installer: **MSI**
3. Clique em **Download**

## Opção 2: Oracle JDK 17 (Gratuito para desenvolvimento)

1. Acesse: https://www.oracle.com/java/technologies/downloads/#java17
2. Baixe **Windows x64 Installer** (jdk-17.xx_windows-x64_bin.msi)

---

## Após Instalar - Configuração

### 1. Descubra onde o Java foi instalado
Procure nas pastas:
- `C:\Program Files\Eclipse Adoptium\`
- `C:\Program Files\Java\`

Geralmente o caminho será algo como:
- `C:\Program Files\Eclipse Adoptium\jdk-17.0.11.9-hotspot`

### 2. Configure JAVA_HOME (PowerShell como Administrador)

```
powershell
# Defina a variável JAVA_HOME (substitua pelo caminho correto)
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Eclipse Adoptium\jdk-17.0.11.9-hotspot", "Machine")

# Adicione ao PATH (PowerShell)
$path = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")
[System.Environment]::SetEnvironmentVariable("PATH", "$path;C:\Program Files\Eclipse Adoptium\jdk-17.0.11.9-hotspot\bin", "Machine")
```

### 3. Verifique a instalação

Abra um **novo** terminal PowerShell e execute:

```
powershell
java -version
```

Deverá mostrar algo como:
```
openjdk version "17.0.11" 2024-04-16
...
```

---

## Problema Comum: JAVA_HOME Apontando para Pasta Errada

Se você viu o erro:
> JAVA_HOME is set to an invalid directory (C:\Program Files\Eclipse Adoptium\jdk-17.x.x.x-hotspot)

Significa que o JAVA_HOME está configurado, mas指向 uma pasta que não existe.

**Solução:**
1. Descubra a pasta real onde o Java está instalado
2. Corrija o JAVA_HOME

No PowerShell, execute após instalar:
```
powershell
# Listar pastas do Java
Get-ChildItem "C:\Program Files\Eclipse Adoptium" -ErrorAction SilentlyContinue
Get-ChildItem "C:\Program Files\Java" -ErrorAction SilentlyContinue
```

---

## Após Configurar o Java

Volte ao diretório do projeto e execute:

```
powershell
cd c:\Users\Kaike\Desktop\Projetos\inventory-production-system\inventory-backend
.\mvnw spring-boot:run
