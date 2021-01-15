"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = require("../controllers");
function bookRoutes(app) {
    app.post("/createBook", controllers_1.BookController.createBook);
    app.get("/bookList", controllers_1.BookController.getBooks);
}
exports.default = bookRoutes;
