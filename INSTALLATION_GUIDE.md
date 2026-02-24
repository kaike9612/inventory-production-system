# 🛠️ Guia de Instalação - Sistema de Produção e Inventário

## Problema Identificado
- Java e Maven não estão instalados ou não estão no PATH
- PostgreSQL pode não estar configurado

---

## 0️⃣ Instalar PostgreSQL (Banco de Dados)

### Opção A: Instalador Manual
1. Baixar: https://www.postgresql.org/download/windows/
2. Durante a instalação:
   - Senha: `postgres` (ou anote a senha definida)
   - Porta: `5432`

### Opção B: Via Chocolatey
```
powershell
choco install postgresql -y
```

### Criar o Banco de Dados
Abra o SQL Shell (psql) e execute:
```
sql
CREATE DATABASE inventory_db;
```

---

## 1️⃣ Instalar Java JDK 17

### Opção A: Instalador Manual

1. **Baixar JDK 17:**
   - Acesse: https://adoptium.net/temurin/releases/?version=17
   - Baixe o **JDK 17 (LTS)** → **Windows x64** → **.msi**

2. **Instalar:**
   - Execute o arquivo `.msi` baixado
   - Marque "Set JAVA_HOME variable" durante a instalação
   - Próximo, próximo, Finish!

3. **Adicionar ao PATH (se necessário):**
   - Variáveis de Ambiente → Variáveis do Sistema → Path
   - Adicione: `C:\Program Files\Eclipse Adoptium\jdk-17.0.x\bin`

### Opção B: Via Chocolatey (Recomendado)

```
powershell
# Abrir PowerShell como Administrador
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Instalar Java 17
choco install temurin17 -y

# Instalar Maven
choco install maven -y
```

### Opção C: Via Winget

```
powershell
winget install EclipseAdoptium.Temurin.17.JDK
winget install Apache.Maven
```

### Opção D: Usar Maven Wrapper (Recomendado - sem instalar Maven!)

O projeto já inclui o Maven Wrapper. Execute:

```
powershell
cd C:\Users\Kaike\Desktop\Projetos\inventory-production-system

# Entrar no diretório do backend
cd inventory-backend

# Baixar o Maven Wrapper JAR (primeira vez)
.\setup-maven-wrapper.ps1

# Executar o backend
.\mvnw.cmd spring-boot:run
```

---

## 2️⃣ Verificar Instalação

```
powershell
# Reinicie o terminal após instalar!

# Verificar Java
java -version

# Verificar Maven
mvn -version

# Verificar JAVA_HOME
echo $JAVA_HOME
```

**Saída esperada:**
```
java version "17.0.x"
OpenJDK Runtime Environment (Temurin) (build 17.0.x+...)
Maven 3.9.x
```

---

## 3️⃣ Iniciar o Backend

```
powershell
# Navegar para o diretório do projeto
cd C:\Users\Kaike\Desktop\Projetos\inventory-production-system

# Entrar no diretório do backend
cd inventory-backend

# Compilar e iniciar (primeira vez pode levar alguns minutos)
mvn spring-boot:run
```

O backend estará disponível em: **http://localhost:8080**

---

## 4️⃣ Iniciar o Frontend

Abra um **novo terminal**:

```
powershell
# Navegar para o diretório do projeto
cd C:\Users\Kaike\Desktop\Projetos\inventory-production-system

# Entrar no diretório do frontend
cd inventory-frontend

# Instalar dependências (primeira vez)
npm install

# Iniciar o frontend
npm start
```

O frontend estará disponível em: **http://localhost:3000**

---

## 5️⃣ Testar a Aplicação

### Verificar se backend está funcionando:
```
powershell
curl http://localhost:8080/api/products
curl http://localhost:8080/api/raw-materials
```

### Acessar via navegador:
1. **Dashboard:** http://localhost:3000
2. **Produtos:** http://localhost:3000/products
3. **Matérias-Primas:** http://localhost:3000/raw-materials
4. **Simulação:** http://localhost:3000/simulation

---

## ⚠️ Observações Importantes

1. **Banco de Dados:** O PostgreSQL deve estar rodando em `localhost:5432` com banco `inventory_db`
2. **Dados de Teste:** Os dados são inseridos automaticamente ao iniciar o backend
3. **CORS:** O frontend está configurado para conectar na porta 8080/api

---

## 🔧 Solução de Problemas

### "JAVA_HOME não está definido"
```
powershell
# No PowerShell, adicionar permanentemente:
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Eclipse Adoptium\jdk-17.0.x", "Machine")
```

### "Porta 8080 já em uso"
```
powershell
# Encontrar o processo
netstat -ano | findstr :8080

# Matar o processo (substitua PID pelo número encontrado)
kill -f PID
```

### "Porta 3000 já em uso"
```
powershell
# O frontend perguntará se deseja usar outra porta. Responda 'Y'
