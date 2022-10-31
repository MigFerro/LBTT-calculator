"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getTaxFromBackend = () => __awaiter(void 0, void 0, void 0, function* () {
    let price = document.getElementById('price').value;
    var radios = document.getElementsByName('is_first_buyer');
    let radio_value;
    for (let i = 0, length = radios.length; i < length; i++) {
        let radio = document.getElementsByName("is_first_buyer")[i];
        if (radio.checked) {
            radio_value = radio.value;
            console.log('radio value: ', radio_value);
            break;
        }
    }
    const response = yield fetch('http://localhost:8080/api/calculate?price=' + price + '&fb=' + radio_value);
    const data = yield response.json();
    console.log(data);
    if (response.ok) {
        console.log("response ok");
        let tax = -1;
        tax = data === null || data === void 0 ? void 0 : data.tax_value;
        if (tax != -1) {
            console.log('tax ok', tax);
            alert(tax);
        }
        else {
            console.log(tax);
            console.log('data: ', data);
            console.log('tax not ok');
        }
    }
    else {
        console.log(response);
        console.log('response not ok');
    }
    return true;
});
//# sourceMappingURL=app.js.map