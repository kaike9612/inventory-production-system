# RUN INSTRUCTIONS - Inventory Production System

## DATABASE SETUP

```
sql
CREATE DATABASE inventorydb;
```

---

## BACKEND SETUP

Navigate to the backend directory and run:

```
bash
cd inventory-backend
mvn clean install
mvn spring-boot:run
```

The backend will start on: http://localhost:8080

---

## FRONTEND SETUP

Navigate to the frontend directory and run:

```
bash
cd inventory-frontend
npm install
npm run dev
```

The frontend will start on: http://localhost:3000

---

## VERIFICATION

After starting both services:

1. Backend: http://localhost:8080 - Should display Spring Boot welcome page or JSON response
2. Frontend: http://localhost:3000 - Should display the Inventory Production System UI
