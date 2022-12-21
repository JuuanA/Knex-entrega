import knex from "knex";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "../database/coderhouse.sqlite"),
  },
  useNullAsDefault: true,
};

const database = knex(config);
const createMessageTable = async () => {
    try {
        await database.schema.createTable("messege" , (messageTable) => {
            messageTable.increments("id").primary();
            messageTable.string("username" ,100 ).notNullable();
            messageTable.string("messege", 500).notNullable();
            messageTable.string("time", 250).notNullable();
        });

        console.log("Tabla de mensajes creada! ")
        database.destroy();
    } catch (err) {
        console.log(err)
        database.destroy();
    }
}

createMessageTable();