import { Application } from "express";

function fragmentRoutes(app:Application) {
    app.post('/createFragment')
    app.get('/fragment')
}