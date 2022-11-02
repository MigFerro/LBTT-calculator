import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const BASE_URL = 'http://localhost:8080';

type taxObj = {"tax_value": number};

function isTaxObj(object: any): object is taxObj {
    return 'tax_value' in object
}

 @Injectable()
export class AppService {

    tax = 0;
    http: HttpClient;

    constructor(private httpClient: HttpClient) {
        this.http = this.httpClient;
    }

    requestTax(price: number, first_buyer: number) {
        let taxDataSource = this.http.get(BASE_URL + '/api/calculate?price='+price+'&fb='+first_buyer);
        taxDataSource.subscribe({
            next: data => {
                if (isTaxObj(data)) {
                    console.log(data)
                    this.tax = data.tax_value;
                }
                else {
                    console.log(data)
                }
            },
            error: err => {
                console.log("Error occured while getting tax. Error code: %s, URL: %s ",  err.status, err.url),
                () => console.log("Tax calculated!")
            }
        });
        return this.tax;

    }
}