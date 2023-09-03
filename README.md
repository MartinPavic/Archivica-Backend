# Archivica-Backend


### Migrations:

https://github.com/ilovepixelart/ts-migrate-mongoose#readme

Located in `Archivica-Backend/migration`

Migration scripts are located in `Archivica-Backend/migration/migrations`

Config in .env file:
- `MIGRATE_MONGO_URI`
- `MIGRATE_MIGRATIONS_PATH`

##### Create:
- npx migrate create what-is-new

##### Upgrade:
- npx migrate up migration-name

##### Downgrade:
- npx migrate down migration-name
