FROM mysql:8

COPY ./server/src/db/migration_data /var/lib/migration_data