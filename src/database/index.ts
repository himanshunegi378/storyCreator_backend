import DatabaseImpl from "./databseImpl";

let database: DatabaseImpl;
function init(databasetype: any) {
  if (database) {
    throw new Error("Database already initalized");
  }
  database = new databasetype();
}

function getDatabase() {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
}

export const Database = { init, getDatabase };
