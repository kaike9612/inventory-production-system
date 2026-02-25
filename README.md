# Inventory Production System

## Descricao

Sistema completo de gestao de producao e inventario. Permite gerenciar materias-primas, produtos, simular producao e visualizar metricas no dashboard.

### Stack

- Java 17
- Spring Boot
- PostgreSQL
- React + Vite
- TypeScript

---

## Arquitetura do Projeto

```
inventory-production-system/
├── inventory-backend/
└── inventory-frontend/
```

### Backend (inventory-backend/)

O backend e responsavel por toda a logica de negocio e persistencia de dados:

- **Controller**: Recebe requis e direcionicoes HTTPa para os servicos
- **Service**: Contem a logica de negocio
- **Repository**: Acessa o banco de dados
- **Entity**: Representa as tabelas do banco de dados
- **DTO**: Objetos para transferencia de dados entre camadas
- **Config**: Configuracoes de CORS e outros recursos

### Frontend (inventory-frontend/)

Interface de usuario em React:

- **Pages**: Telas da aplicacao (Dashboard, Produtos, Materias-Primas, Simulacao)
- **Components**: Componentes reutilizaveis (Header, Sidebar, Layout)
- **Services**: Comunicacao com a API REST
- **Types**: Definicoes de tipos TypeScript

---

## Pre-requisitos

### Backend

- JDK 17
- Maven Wrapper (ja incluido no projeto)
- PostgreSQL

### Frontend

- Node.js 18+

---

## Configuracao do Ambiente (Windows)

### Instalar Java 17

1. Acesse: https://adoptium.net/temurin/releases/?version=17
2. Baixe o instalador JDK 17 (x64)
3. Execute e instale normalmente

### Configurar JAVA_HOME e PATH

Abra o PowerShell como Administrador e execute:

```
powershell
# Definir JAVA_HOME permanentemente
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Eclipse Adoptium\jdk-17.0.x_x64", "Machine")

# Adicionar ao PATH
$path = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")
[System.Environment]::SetEnvironmentVariable("PATH", "$path;C:\Program Files\Eclipse Adoptium\jdk-17.0.x_x64\bin", "Machine")
```

### Verificar Instalacao

```
powershell
java -version
where.exe java
```

---

## Configuracao do Banco

### Criar Banco de Dados

Acesse o PostgreSQL e execute:

```
sql
CREATE DATABASE inventory_db;
```

### Configuracao no application.yml

O arquivo `inventory-backend/src/main/resources/application.yml` contem a configuracao do banco:

```
yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/inventory_db
    username: postgres
    password: sua_senha
  jpa:
    hibernate:
      ddl-auto: update
```

---

## Como Rodar o Projeto

### Backend

```
powershell
cd inventory-backend
.\mvnw.cmd spring-boot:run
```

O backend iniciara em: **http://localhost:8080**

A API estara disponivel em: **http://localhost:8080/api**

### Frontend

Crie o arquivo `.env.local` na pasta `inventory-frontend/`:

```
VITE_API_BASE_URL=http://localhost:8080
```

Execute:

```
powershell
cd inventory-frontend
npm install
npm run dev
```

O frontend estara disponivel em: **http://localhost:3000**

---

## Endpoints Principais

### Produtos

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | /api/products | Listar todos os produtos |
| POST | /api/products | Criar novo produto |
| GET | /api/products/{id} | Buscar produto por ID |
| PUT | /api/products/{id} | Atualizar produto |
| DELETE | /api/products/{id} | Excluir produto |

### Materias-Primas

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | /api/raw-materials | Listar todas as materias-primas |
| POST | /api/raw-materials | Criar nova materia-prima |
| GET | /api/raw-materials/{id} | Buscar materia-prima por ID |
| PUT | /api/raw-materials/{id} | Atualizar materia-prima |
| DELETE | /api/raw-materials/{id} | Excluir materia-prima |

### Simulacao de Producao

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | /api/production/simulation | Calcular capacidade de producao |

---

## Dados de Exemplo

O sistema possui um `DataInitializer` que cria dados automaticamente se o banco estiver vazio. Sao criados:

### Materias-Primas

- Iron (100 unidades)
- Plastic (50 unidades)
- Copper (80 unidades)
- Aluminum (60 unidades)
- Glass (40 unidades)

### Produtos

- Widget A (R$ 25,00)
- Widget B (R$ 50,00)
- Gadget X (R$ 100,00)
- Gadget Y (R$ 75,00)

---

## Troubleshooting

### Erro: "java nao reconhecido"

Execute no PowerShell:

```
powershell
# Verificar onde o Java esta instalado
where.exe java

# Se nao encontrar, configure o JAVA_HOME
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.x_x64"
$env:PATH = "$env:PATH;$env:JAVA_HOME\bin"
```

### Erro: "connection refused"

O backend nao foi iniciado. Execute:

```
powershell
cd inventory-backend
.\mvnw.cmd spring-boot:run
```

### Erro: 404 em /api/*

Verifique se o context-path esta configurado corretamente. O backend usa o prefixo `/api`.

### Erro: CORS

Se houver erros de CORS, verifique a configuracao em `WebConfig.java` ou `CorsConfig.java`.

---

## Comandos Git para Commitar as Alteracoes

```
powershell
# Adicionar todas as alteracoes
git add .

# Commit com mensagem profissional
git commit -m "docs: update README with setup instructions and environment configuration"

# Push para main
git push origin main
```

### Verificar Branch Atual

```
powershell
git branch
```

Se estiver em outra branch e quiser enviar para main:

```powershell
git push origin nome-da-branch
2. Visualize a capacidade de produção baseada no estoque

---

## 📝 Commits Recentes

| Commit | Descrição |
|--------|-----------|
| `a9f16bf` | Adiciona Maven Wrapper completo e atualiza guia |
| `bffc0cb` | Atualiza guia com Maven Wrapper |
| `0d2495e` | Adiciona Maven Wrapper para executar sem Maven instalado |
| `8c0df66` | Adiciona guia de instalação para Java, Maven e PostgreSQL |
| `e7a6cc9` | Corrige versão do TypeScript para compatibilidade |
| `b4f8a2c` | Implementa simulação de produção |
| `c3d9e1f` | Adiciona dashboard com estatísticas |

---

## 🔧 Boas Práticas Implementadas

### Backend
- ✅ Transactions explícitas com `@Transactional`
- ✅ Validação com Bean Validation (`@Valid`)
- ✅ Tratamento centralizado de exceções
- ✅ Lombok para reduzir boilerplate
- ✅ Mapper pattern para DTOs
- ✅ Logging com SLF4J
- ✅ CORS configurado
- ✅ JOIN FETCH para evitar N+1 queries
- ✅ Verificações defensivas contra NullPointerException

### Frontend
- ✅ TypeScript para tipagem estática
- ✅ Componentes funcionais com Hooks
- ✅ Separação de responsabilidades (services, components, pages)
- ✅ Tratamento de erros em requisições
- ✅ Notificações toast (Sonner)
- ✅ Design responsivo com Tailwind CSS

---

## 🐛 Solução de Problemas

### "Porta 8080 já em uso"
```
powershell
# Encontrar o processo
netstat -ano | findstr :8080

# Matar o processo (substitua PID)
kill -f PID
```

### "Porta 3000 já em uso"
O React perguntará se deseja usar outra porta. Responda 'Y'.

### "Banco de dados não conecta"
1. Verifique se PostgreSQL está rodando
2. Confirme as credenciais em `application.yml`
3. Crie o banco `inventory_db`

### "Erro ao compilar frontend"
```
powershell
cd inventory-frontend
rm -rf node_modules
npm install
```

---

## 👤 Autor

Desenvolvido por Kaike Souza
