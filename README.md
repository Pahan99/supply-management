# Supply Chain Management System 🚋🚚

## Steps
* Clone the repository.
* Run `npm install`
* Create .env file using the format of .env.example
* Run `npm run start` or `npm run start-dev`
* To create tables, run `db-migrate up get-orders-view --config database/database.json`
* To delete all tables, run `db-migrate reset --config database/database.json`
* To add data, run `npm run seeders`