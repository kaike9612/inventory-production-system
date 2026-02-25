# INSTRUCOES DE EXECUCAO - Sistema de Inventario e Producao

## CONFIGURACAO DO BANCO DE DADOS

```
sql
CREATE DATABASE inventory_db;
```

---

## CONFIGURACAO DO BACKEND

Navegue ate o diretorio do backend e execute:

```
bash
cd inventory-backend
mvn clean install
mvn spring-boot:run
```

O backend iniciara em: http://localhost:8080

---

## CONFIGURACAO DO FRONTEND

Navegue ate o diretorio do frontend e execute:

```
bash
cd inventory-frontend
npm install
npm run dev
```

O frontend iniciara em: http://localhost:3000

---

## VERIFICACAO

Apos iniciar ambos os servicos:

1. Backend: http://localhost:8080 - Deve exibir a pagina de boas-vindas do Spring Boot ou resposta JSON
2. Frontend: http://localhost:3000 - Deve exibir a interface do Sistema de Inventario e Producao

---

## DADOS DE EXEMPLO

O sistema carregara automaticamente os seguintes dados de exemplo ao iniciar:

### Materias-Primas:
- Aco (50 kg)
- Plastico (30 kg)
- Parafuso (500 unidades)
- Tinta (2000 ml)

### Produtos:
- Suporte de Parede (R$ 25,00)
- Caixa Plastica (R$ 15,00)
- Kit Montagem (R$ 45,00)

### Associacoes (BOM):
- Suporte de Parede: 2kg Aco + 8 Parafusos + 50ml Tinta
- Caixa Plastica: 1.5kg Plastico
- Kit Montagem: 12 Parafusos
