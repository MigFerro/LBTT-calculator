import { request_calculation, LBTTCalculator_2021 } from "./logic/calculator_logic"

const express = require( "express" );
export const app = express();
const cors = require('cors');
const port = 8080; // default port to listen

app.use(cors());

app.get( "/api/calculate", ( req, res) => {
    console.log("calculation requested")
    let tax = request_calculation(req);
    console.log('tax in backend: ', tax)

    res.json({tax_value: tax});
} );


app.get( "/api/bands", ( req, res) => {
    console.log('bands requested')
    let bands = LBTTCalculator_2021.getBands();

    res.json(bands);
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );



