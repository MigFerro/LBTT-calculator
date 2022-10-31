import { calculate } from "./calculator_logic"

const express = require( "express" );
const app = express();
const port = 8080; // default port to listen


// define a route handler for the default home page
app.get( "/api/calculate", ( req, res) => {
    let price = 0;
    let first_buyer = false;
    if (req.query.price){
        price = +req.query.price
    }
    if (req.query.fb === '1'){
        first_buyer = true;
    } 

    let tax = calculate(price, first_buyer);

    console.log('tax in backend: ', tax)

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.json({tax_value: tax});
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );


