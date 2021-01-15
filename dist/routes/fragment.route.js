"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = require("../controllers");
function fragmentRoutes(app) {
    app.post("/createFragment", controllers_1.Fragmentcontroller.createFragment);
    app.get("/fragment", controllers_1.Fragmentcontroller.getAllFragmentsInSection);
    app.post("/likeFragment", controllers_1.Fragmentcontroller.addLike);
}
exports.default = fragmentRoutes;
