# Статистичний сервіс для обробки даних лістингів

### Цей мікросервіс призначений для збору, агрегації, зберігання та повернення статистичних даних стосовно розміщених лістингів.


## Swagger

Всі доступні api, та інформація щодо використання доступна
у  [Swagger документації](http://localhost:3000/docs)

## Запуск
```bash
git clone https://github.com/dimatk01/listing-analytics-api.git
cd listing-analytics-api
npm install
npm start:dev
```

## docker-compose
```bash
git clone https://github.com/dimatk01/listing-analytics-api.git
cd listing-analytics-api
docker-copmpose up --build
```

## Environment example
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root
DB_NAME=db_name
APP_PORT=3000
BASE_HOST=http://localhost:3000
```

### Технології
Сервіс реалізований за допомогою Node.js v20.11.0 та використовує Koa.js для обробки HTTP запитів. 
Дані зберігаються у базі даних Postgres.
