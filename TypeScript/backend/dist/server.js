"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const calculator_logic_1 = require("./logic/calculator_logic");
const express = require("express");
exports.app = express();
const cors = require('cors');
const port = 8080; // default port to listen
exports.app.use(cors());
exports.app.get("/api/calculate", (req, res) => {
    console.log("calculation requested");
    let tax = (0, calculator_logic_1.request_calculation)(req);
    console.log('tax in backend: ', tax);
    res.json({ tax_value: tax });
});
exports.app.get("/api/bands", (req, res) => {
    console.log('bands requested');
    let bands = calculator_logic_1.LBTTCalculator_2021.getBands();
    res.json(bands);
});
// start the Express server
exports.app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map