//import { buildRatesTable } from "./bands"

const BASE_URL = 'http://localhost:8080'

const getTaxFromBackend = async () => {

    let price = (<HTMLInputElement>document.getElementById('price')).value

    var radios = document.getElementsByName('is_first_buyer');
    let radio_value;
    for (let i = 0, length = radios.length; i < length; i++) {
        let radio = <HTMLInputElement>document.getElementsByName("is_first_buyer")[i];
        if (radio.checked) {
            radio_value = radio.value;
            console.log('radio value: ', radio_value)
            break;
        }  
    }

    const response = await fetch(BASE_URL + '/api/calculate?price='+price+'&fb='+radio_value)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
        console.log("response ok")
        let tax = -1
        tax = data?.tax_value
        if (tax != -1) {
            console.log('tax ok', tax)
            alert(tax)
        } else {
            console.log(tax)
            console.log('data: ', data)
            console.log('tax not ok')
        }
    } else {
        console.log(response)
        console.log('response not ok')
    }
    return true
}

const getTaxBands = async (selector: JQuery) => {
    const response = await fetch(BASE_URL + '/api/bands');
    const bands = await response.json();
    console.log(bands);

    buildRatesTable(selector, bands)
    
}

type rateBand = {
    "threshold": string,
    "rate": string
}

const buildRatesTable = (selector: JQuery, rateBands: rateBand[]) => {
    $(selector).empty();
    for (let i = rateBands.length - 1; i >= 0; i--) {
        let row = $('<tr/>');

        if (i == 0) {
            row.append($('<td/>').html("above " + "£" + rateBands[i].threshold));
        } else {
            row.append($('<td/>').html("£" + rateBands[i-1].threshold + " - " + "£" + rateBands[i].threshold));
        }

        row.append($('<td/>').html(100*+rateBands[i].rate + " %"));

        $(selector).append(row);

    }
}