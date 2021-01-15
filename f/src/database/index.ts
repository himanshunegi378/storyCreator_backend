import DatabaseImpl from "./databseImpl";

let database: DatabaseImpl;
/**
 * only one type of database could be used once executed
 *
 * @param concreteDatabase typeof database eg: sql,firestore,mongodb from where data neeed to transmitted
 */
function init(concreteDatabase: new () => DatabaseImpl) {
  if (database) {
    throw new Error("Database already initalized");
  }
  database = new concreteDatabase();
}

function getDatabase() {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
}

export const Database = { init, getDatabase };
