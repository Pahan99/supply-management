# Supply Chain Management System 🚋🚚

## Steps

### Initialize server
- Clone the repository.
- Run `npm install`
- Create the database 'supply_manage'
- Create .env file using the format of .env.example
- Edit database/database.json with relevant data.
- Run `npm run start` or `npm run start-dev`

### 
- If the database is empty,
  - To create tables, run `db-migrate up roles --config database/database.json`
  - To delete all tables, run `db-migrate reset --config database/database.json`
- Else
  - To delete all tables, run `db-migrate reset --config database/database.json`
  - To create tables, run `db-migrate up roles --config database/database.json`
- To add data, run `npm run seeders`
