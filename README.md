# Rick and Morty

## Pré requisitos

- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://nodemon.io/)

Aplicação está utilizando [Sequelize](https://sequelize.org/v5/) ele da suporte aos bancos de dados PostgreSQL, MariaDB, MySQL, SQLite e MSSQL. Utilizei o PostgreSQL para fazer o teste, caso necessário utilizar outro tem a necessidade de instalar a dependencia do mesmo.

Para executar o projeto em ambiente de desenvolvimento certifique-se que tenha um .env.dev configurado conforme o examplo disponível em .env.exemple.

Antes de executar o projeto é necessário instalar as dependencias, executar as migrações e configurar as váriaveis de ambiente.

```
  npm install
  npm run db:migrate
```

## Cron

```
  npm run cron:dev
```

## Aplicação
```
  npm run dev
```
