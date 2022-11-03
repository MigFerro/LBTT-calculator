import { __decorate } from "tslib";
import { Component } from '@angular/core';
const BASE_URL = 'http://localhost:8080';
let AppComponent = class AppComponent {
    constructor(service, formBuilder) {
        this.service = service;
        this.formBuilder = formBuilder;
        this.taxForm = this.formBuilder.group({
            price: 0,
            firstBuyer: 0
        });
    }
    getTax() {
        console.log("form values: ", this.taxForm.value);
        let { price, firstBuyer } = this.taxForm.value;
        if (typeof firstBuyer == "string") {
            firstBuyer = +firstBuyer;
        }
        let tax = -1;
        if (typeof price == "number" && typeof firstBuyer == "number") {
            this.service.requestTax(price, firstBuyer);
        }
        if (tax != -1) {
            alert(tax);
        }
        else {
            console.log("someching went wrong :(");
        }
        this.taxForm.reset();
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map