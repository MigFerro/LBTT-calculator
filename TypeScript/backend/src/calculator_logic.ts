export class RateBand {

    threshold: number;
    rate: number;

    constructor(threshold: number, rate: number){
        this.threshold = threshold;
        this.rate = rate;
    }
}

export class LBTT {

    private rateBands: RateBand[];
    private firstBuyerRelief: number;

    constructor (firstBuyerRelief: number, ...bands: RateBand[]) {
        this.firstBuyerRelief = firstBuyerRelief;
        this.rateBands = bands;
        this.sortRates();
    }

    sortRates() {
        this.rateBands.sort((bandA, bandB) => bandB.threshold - bandA.threshold)
    }

    priceAboveBand(price: number, i: number) {
        return price > this.rateBands[i].threshold
    }

    getExcessForBand(price: number, i: number) {
        return price - this.rateBands[i].threshold
    }

    getTaxForBand (price: number, i: number, remainder: number) {
        let excess = this.getExcessForBand(price, i)
        return (excess - remainder) * this.rateBands[i].rate;
    }

    getFirstBuyerRates() {
        let {...rateBands} = this.rateBands;
        rateBands[0].threshold = this.firstBuyerRelief;

        return rateBands;
    }

    calculateTax(price: number, isFirstBuyer: boolean) {

        let tax = 0;
        let remainder = 0;
        for (let i = 0; i < this.rateBands.length; i++) {
            if (this.priceAboveBand(price, i)) {
                tax += this.getTaxForBand(price, i, remainder);
                remainder = this.getExcessForBand(price, i);
            }
        }

        let lastBand = this.rateBands[this.rateBands.length-1];

        if (isFirstBuyer && price > lastBand.threshold) {
            if (price < this.firstBuyerRelief) {
                tax = 0
            } else {
                tax -= (this.firstBuyerRelief - lastBand.threshold) * lastBand.rate
            }
        }

        return tax;
    }
}


export const LBTTCalculator_2021 = new LBTT (
    175000,
    new RateBand(145000, 0.02),
    new RateBand(250000, 0.05),
    new RateBand(325000, 0.1),
    new RateBand(750000, 0.12)
)

export const calculate = (price: number, is_first_buyer: boolean) => {
    
    let tax = LBTTCalculator_2021.calculateTax(price, is_first_buyer)
    return tax;
}