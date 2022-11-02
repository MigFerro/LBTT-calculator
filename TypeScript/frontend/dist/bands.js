"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRatesTable = void 0;
const buildRatesTable = (selector, rateBands) => {
    for (let i = 0; i < rateBands.length; i++) {
        // let row = $('<tr/>');
        // row.append($('<td/>')).html(rateBands[i].threshold.toString)
        // row.append($('<td/>')).html(rateBands[i].rate.toString)
        // $(selector).append(row);
        (selector).append('<tr><td>line<td></tr>');
    }
};
exports.buildRatesTable = buildRatesTable;
//# sourceMappingURL=bands.js.map