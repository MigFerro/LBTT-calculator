"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request_calculation = exports.calculate = exports.LBTTCalculator_2021 = exports.LBTT = exports.RateBand = void 0;
class RateBand {
    constructor(threshold, rate) {
        this.threshold = threshold;
        this.rate = rate;
    }
}
exports.RateBand = RateBand;
class LBTT {
    constructor(firstBuyerRelief, ...bands) {
        this.firstBuyerRelief = firstBuyerRelief;
        this.rateBands = bands;
        this.sortRates();
    }
    getBands() {
        return this.rateBands;
    }
    sortRates() {
        this.rateBands.sort((bandA, bandB) => bandB.threshold - bandA.threshold);
    }
    priceAboveBand(price, i) {
        return price > this.rateBands[i].threshold;
    }
    getExcessForBand(price, i) {
        return price - this.rateBands[i].threshold;
    }
    getTaxForBand(price, i, remainder) {
        let excess = this.getExcessForBand(price, i);
        return (excess - remainder) * this.rateBands[i].rate;
    }
    getFirstBuyerRates() {
        let rateBands = __rest(this.rateBands, []);
        rateBands[0].threshold = this.firstBuyerRelief;
        return rateBands;
    }
    calculateTax(price, isFirstBuyer) {
        let tax = 0;
        let remainder = 0;
        for (let i = 0; i < this.rateBands.length; i++) {
            if (this.priceAboveBand(price, i)) {
                tax += this.getTaxForBand(price, i, remainder);
                remainder = this.getExcessForBand(price, i);
            }
        }
        let lastBand = this.rateBands[this.rateBands.length - 1];
        if (isFirstBuyer && price > lastBand.threshold) {
            if (price < this.firstBuyerRelief) {
                tax = 0;
            }
            else {
                tax -= (this.firstBuyerRelief - lastBand.threshold) * lastBand.rate;
            }
        }
        return tax;
    }
}
exports.LBTT = LBTT;
exports.LBTTCalculator_2021 = new LBTT(175000, new RateBand(145000, 0.02), new RateBand(250000, 0.05), new RateBand(325000, 0.1), new RateBand(750000, 0.12));
const calculate = (price, is_first_buyer) => {
    let tax = exports.LBTTCalculator_2021.calculateTax(price, is_first_buyer);
    return tax;
};
exports.calculate = calculate;
const request_calculation = (req) => {
    let price = 0;
    let first_buyer = false;
    if (req.query.price) {
        price = +req.query.price;
    }
    if (req.query.fb === '1') {
        first_buyer = true;
    }
    let tax = (0, exports.calculate)(price, first_buyer);
    return tax;
};
exports.request_calculation = request_calculation;
//# sourceMappingURL=calculator_logic.js.map