"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var init = function () {
    return typeorm_1.createConnection({
        type: "mysql",
        host: "127.0.0.1",
        port: 3306,
        username: "root",
        password: "3rdMAY1998@",
        database: "storycreator",
        entities: [__dirname + "/*.{ts,js}"],
        synchronize: true,
        logging: false,
    });
};
exports.default = init;
