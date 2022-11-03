import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
const BASE_URL = 'http://localhost:8080';
function isTaxObj(object) {
    return 'tax_value' in object;
}
let AppService = class AppService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.tax = 0;
        this.http = this.httpClient;
    }
    requestTax(price, first_buyer) {
        let taxDataSource = this.http.get(BASE_URL + '/api/calculate?price=' + price + '&fb=' + first_buyer);
        taxDataSource.subscribe({
            next: data => {
                if (isTaxObj(data)) {
                    console.log("data", data);
                    this.tax = data.tax_value;
                    console.log("tax", this.tax);
                    alert(this.tax);
                }
                else {
                    console.log("not tax obj");
                    console.log("data", data);
                }
            },
            error: err => {
                console.log("Error occured while getting tax. Error code: %s, URL: %s ", err.status, err.url),
                    () => console.log("Tax calculated!");
            }
        });
        console.log("tax", this.tax);
    }
};
AppService = __decorate([
    Injectable()
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map