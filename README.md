# Inventory Production System

## Descricao

Sistema completo de gestao de producao e inventario. Permite gerenciar materias-primas, produtos, simular producao e visualizar metricas no dashboard.

### Stack

- Java 17
- Spring Boot 3.2
- PostgreSQL (producao) / H2 (desenvolvimento)
- React + Vite
- TypeScript
- Tailwind CSS

---

## Arquitetura do Projeto

```
inventory-production-system/
├── inventory-backend/          # Backend Spring Boot
│   ├── src/main/java/com/inventory/
│   │   ├── config/            # Configuracoes (CORS, Web, DataInitializer)
│   │   ├── controller/       # Controladores REST
│   │   ├── service/          # Logica de negocio
│   │   ├── repository/       # Acesso a dados
│   │   ├── entity/           # Entidades JPA
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── mapper/           # Mapeadores Entidade <-> DTO
│   │   └── exception/        # Tratamento de excecoes
│   └── src/main/resources/
│       ├── application.yml    # Configuracoes
│       ├── schema.sql         # Schema do banco
│       └── data.sql           # Dados de teste
└── inventory-frontend/       # Frontend React
    ├── src/
    │   ├── components/       # Componentes reutilizaveis
    │   ├── pages/            # Telas da aplicacao
    │   ├── services/         # Comunicacao com API
    │   └── types/            # Tipos TypeScript
    └── package.json
```

### Backend (inventory-backend/)

O backend e responsavel por toda a logica de negocio e persistencia de dados:

- **Controller**: Recebe requisicoes HTTP e direciona para os servicos
- **Service**: Contem a logica de negocio
- **Repository**: Acessa o banco de dados
- **Entity**: Representa as tabelas do banco de dados
- **DTO**: Objetos para transferencia de dados entre camadas
- **Config**: Configuracoes de CORS, Web e inicializacao de dados

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
- PostgreSQL (para producao) - Opcional para desenvolvimento

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

### Desenvolvimento (H2 - em memoria)

O projeto ja vem configurado para usar H2 em desenvolvimento. Nenhuma configuracao adicional e necessaria.

### Producao (PostgreSQL)

1. Instale o PostgreSQL
2. Crie o banco de dados:

```
sql
CREATE DATABASE inventory_db;
```

3. Configure as credenciais em `inventory-backend/src/main/resources/application.yml`:

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

```powershell
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

## Funcionalidades

### Dashboard
- Visualizacao de estatisticas gerais
- Total de produtos cadastrados
- Total de materias-primas
- Produto mais caro

### Gerenciamento de Produtos
- Criar, editar e excluir produtos
- Definir nome e preco

### Gerenciamento de Materias-Primas
- Criar, editar e excluir materias-primas
- Controle de estoque

### Simulacao de Producao
- Calculo automatico de capacidade de producao
- Verificacao de disponibilidade de materias-primas
- Valor total producible

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

### Associacoes (Produto <-> Materia-Prima)

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | /api/product-raw-materials | Listar associacoes |
| POST | /api/product-raw-materials | Criar associacao |
| DELETE | /api/product-raw-materials/{id} | Excluir associacao |

### Simulacao de Producao

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | /api/production/simulation | Calcular capacidade de producao |

---

## Dados de Exemplo

O sistema possui um `DataInitializer` que cria dados automaticamente ao iniciar se o banco estiver vazio.

### Materias-Primas

- Iron (100 unidades)
- Plastic (50 unidades)
- Copper (80 unidades)
- Aluminum (60 unidades)
- Glass (40 unidades)
- E outras...

### Produtos

- Widget A (R$ 25,00)
- Widget B (R$ 50,00)
- Gadget X (R$ 100,00)
- Gadget Y (R$ 75,00)
- E outros...

---

## Implementacoes e Alteracoes Recentes

### Backend
- Configuracao H2 para desenvolvimento
- DataInitializer para criacao automatica de dados
- WebConfig para configuracoes de CORS
- Tratamento centralizado de excecoes
- Validacao com Bean Validation
- Transactions explicitas com @Transactional
- JOIN FETCH para evitar queries N+1

### Frontend
- Interface responsiva com Tailwind CSS
- Notificacoes toast (Sonner)
- Tratamento de erros em requisicoes
- Componentes funcionais com Hooks

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

### "Porta 8080 ja em uso"

```
powershell
# Encontrar o processo
netstat -ano | findstr :8080

# Matar o processo (substitua PID)
kill -f PID
```

---

## Boas Praticas Implementadas

### Backend
- Transactions explicitas com @Transactional
- Validacao com Bean Validation (@Valid)
- Tratamento centralizado de excecoes
- Lombok para reduzir boilerplate
- Mapper pattern para DTOs
- Logging com SLF4J
- CORS configurado
- JOIN FETCH para evitar N+1 queries
- Verificacoes defensivas contra NullPointerException

### Frontend
- TypeScript para tipagem estatica
- Componentes funcionais com Hooks
- Separacao de responsabilidades (services, components, pages)
- Tratamento de erros em requisicoes
- Notificacoes toast (Sonner)
- Design responsivo com Tailwind CSS

---

## Comandos Git

```
powershell
# Adicionar todas as alteracoes
git add .

# Commit com mensagem profissional
git commit -m "feat: description"

# Push para main
git push origin main
```

---

## 👤 Autor

Desenvolvido por Kaike Souza
