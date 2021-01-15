"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = require("../controllers");
function sectionRoutes(app) {
    app.post("/createSection", controllers_1.SectionController.createSection);
    app.get("/section", controllers_1.SectionController.getAllSectionsInBook);
    app.post("/lockSection", controllers_1.SectionController.lockSection);
}
exports.default = sectionRoutes;
