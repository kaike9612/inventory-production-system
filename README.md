# 🏭 Sistema de Gestão de Produção e Inventário

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-blue.svg" alt="Java 17">
  <img src="https://img.shields.io/badge/Spring Boot-3.2.0-green.svg" alt="Spring Boot">
  <img src="https://img.shields.io/badge/React-18-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-gray.svg" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</p>

Sistema completo de gestão de produção e inventário, desenvolvido com Java Spring Boot (backend) e React/TypeScript (frontend). Permite gerenciar produtos, matérias-primas e simular capacidade de produção baseada no estoque disponível.

---

## 📁 Estrutura do Projeto

```
inventory-production-system/
│
├── 📂 inventory-backend/                 # Backend Spring Boot (Java 17)
│   ├── src/main/java/com/inventory/
│   │   ├── config/                      # Configurações (CORS)
│   │   ├── controller/                  # Controladores REST
│   │   │   ├── ProductController.java
│   │   │   ├── RawMaterialController.java
│   │   │   ├── ProductRawMaterialController.java
│   │   │   └── ProductionSimulationController.java
│   │   ├── service/                     # Camada de negócio
│   │   │   ├── ProductService.java
│   │   │   ├── RawMaterialService.java
│   │   │   ├── ProductRawMaterialService.java
│   │   │   └── ProductionSimulationService.java
│   │   ├── repository/                  # Camada de acesso a dados
│   │   ├── entity/                      # Entidades JPA
│   │   │   ├── Product.java
│   │   │   ├── RawMaterial.java
│   │   │   └── ProductRawMaterial.java
│   │   ├── dto/                         # Data Transfer Objects
│   │   ├── mapper/                      # Mapeadores Entidade ↔ DTO
│   │   └── exception/                   # Tratamento de exceções
│   ├── src/main/resources/
│   │   ├── application.yml              # Configurações do Spring
│   │   ├── schema.sql                   # Schema do banco
│   │   └── data.sql                     # Dados de teste
│   ├── pom.xml                          # Dependências Maven
│   └── mvnw.cmd                         # Maven Wrapper (Windows)
│
├── 📂 inventory-frontend/                # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/                  # Componentes reutilizáveis
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── pages/                       # Páginas da aplicação
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   ├── RawMaterialsPage.tsx
│   │   │   └── ProductionSimulationPage.tsx
│   │   ├── services/                    # Serviços de API
│   │   │   └── api.ts
│   │   ├── types/                       # Interfaces TypeScript
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── cypress/                         # Testes E2E
│   ├── package.json
│   └── tsconfig.json
│
├── 📄 README.md                         # Este arquivo
└── 📄 INSTALLATION_GUIDE.md            # Guia de instalação detalhado
```

---

## 🛠️ Tecnologias

### Backend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Java | 17 | Linguagem principal |
| Spring Boot | 3.2.0 | Framework backend |
| Spring Data JPA | - | ORM |
| Hibernate | - | Implementação JPA |
| PostgreSQL | - | Banco de dados relacional |
| Lombok | - | Redução de boilerplate |

### Frontend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React | 18 | Biblioteca de UI |
| TypeScript | 5.x | Tipagem estática |
| Axios | 1.6 | Cliente HTTP |
| React Router | 6 | Roteamento |
| Tailwind CSS | 3.4 | Estilização |
| Cypress | 15 | Testes E2E |
| Sonner | 2.x | Notificações toast |

---

## 🚀 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Java JDK 17** - [Download](https://adoptium.net/temurin/releases/?version=17)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL 14+** - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### Configuração do Banco de Dados

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
    username: postgres    # Seu usuário
    password: postgres    # Sua senha
```

---

## ▶️ Como Executar

### Opção 1: Usando Maven Wrapper (Recomendado - sem instalar Maven)

```
powershell
# 1. Clone o repositório
git clone https://github.com/kaike9612/inventory-production-system.git
cd inventory-production-system

# 2. Iniciar o Backend
cd inventory-backend
.\setup-maven-wrapper.ps1    # Primeira vez apenas
.\mvnw.cmd spring-boot:run

# 3. Em outro terminal, iniciar o Frontend
cd inventory-frontend
npm install
npm start
```

### Opção 2: Com Maven instalado

```
powershell
# Backend
cd inventory-backend
mvn spring-boot:run

# Frontend (outro terminal)
cd inventory-frontend
npm install
npm start
```

---

## 🌐 Portas e URLs

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Backend | http://localhost:8080/api | API REST |
| Frontend | http://localhost:3000 | Interface web |
| PostgreSQL | localhost:5432 | Banco de dados |

---

## 📡 Endpoints da API

### Produtos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/products` | Listar todos os produtos |
| GET | `/api/products/{id}` | Buscar produto por ID |
| POST | `/api/products` | Criar novo produto |
| PUT | `/api/products/{id}` | Atualizar produto |
| DELETE | `/api/products/{id}` | Excluir produto |

### Matérias-Primas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/raw-materials` | Listar todas as matérias-primas |
| GET | `/api/raw-materials/{id}` | Buscar matéria-prima por ID |
| POST | `/api/raw-materials` | Criar nova matéria-prima |
| PUT | `/api/raw-materials/{id}` | Atualizar matéria-prima |
| DELETE | `/api/raw-materials/{id}` | Excluir matéria-prima |

### Associações (Produto ↔ Matéria-Prima)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/product-raw-materials` | Listar todas as associações |
| POST | `/api/product-raw-materials` | Criar associação |
| DELETE | `/api/product-raw-materials/{id}` | Excluir associação |

### Simulação de Produção
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/production/simulation` | Calcular capacidade de produção |

---

## 📊 Dados de Teste

O sistema é populado automaticamente com dados de teste ao iniciar:

### Matérias-Primas (Indústria de Bebidas)
| Nome | Estoque |
|------|---------|
| Concentrado de Cola | 500 |
| Açúcar | 800 |
| Água | 5000 |
| Garrafa PET 500ml | 2000 |
| Garrafa Vidro 600ml | 1500 |
| Lata Alumínio 350ml | 3000 |
| Concentrado de Laranja | 400 |
| Malte | 600 |
| Lúpulo | 200 |

### Produtos
| Nome | Preço |
|------|-------|
| Refrigerante Cola 350ml | R$ 5,50 |
| Suco de Laranja 1L | R$ 7,90 |
| Água Mineral 500ml | R$ 3,00 |
| Cerveja Pilsen 600ml | R$ 9,50 |

### Associações (Exemplo)
- **Refrigerante Cola**: Concentrado de Cola (5) + Açúcar (3) + Água (30) + Lata (1)
- **Suco de Laranja**: Concentrado de Laranja (40) + Água (60) + Garrafa PET (1)
- **Cerveja Pilsen**: Água (50) + Malte (10) + Lúpulo (2) + Garrafa Vidro (1)

---

## 🧪 Como Testar

### 1. Verificar se o Backend está rodando
```
powershell
curl http://localhost:8080/api/products
curl http://localhost:8080/api/raw-materials
```

### 2. Acessar o Frontend
Abra no navegador: **http://localhost:3000**

### 3. Testar Funcionalidades

#### Dashboard
- Acesse: http://localhost:3000
- Visualize estatísticas: total de produtos, matérias-primas, produto mais caro

#### Criar Produto
1. Vá para Products
2. Clique em "Novo Produto"
3. Preencha: Nome = "Novo Produto", Preço = 100.00
4. Clique em "Salvar"

#### Criar Matéria-Prima
1. Vá para Raw Materials
2. Clique em "Nova Matéria-Prima"
3. Preencha: Nome = "Nova Matéria", Estoque = 100
4. Clique em "Salvar"

#### Simular Produção
1. Vá para Simulation
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

## 📄 Licença

MIT License - sinta-se livre para usar e modificar!

---

## 👤 Autor

Desenvolvido por Kaike
