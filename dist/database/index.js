"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database;
/**
 * only one type of database could be used once executed
 *
 * @param concreteDatabase typeof database eg: sql,firestore,mongodb from where data neeed to transmitted
 */
function init(concreteDatabase) {
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
exports.Database = { init: init, getDatabase: getDatabase };
