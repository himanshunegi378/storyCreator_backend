"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var app_1 = __importDefault(require("./app"));
var dotenv_1 = require("dotenv");
var database_1 = require("./database");
var fireStore_1 = require("./database/fireStore");
// import init from "./entity/connection";
dotenv_1.config({ path: "./.env" });
database_1.Database.init(fireStore_1.FirestoreDatabase);
var server = http_1.default.createServer(app_1.default);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
var port = normalizePort(process.env.PORT || "3000");
app_1.default.set("port", port);
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    // console.log(addr)
    // const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
    console.log("app started");
}
/**
 * Listen on provided port, on all network interfaces.
 */
// init()
//   .then(() => {
//   })
//   .catch((err) => {
//     console.log(err);
//   });
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
