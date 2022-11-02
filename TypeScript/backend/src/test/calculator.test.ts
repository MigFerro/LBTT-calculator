import { LBTT, RateBand, LBTTCalculator_2021 } from "../logic/calculator_logic";

test('calculates LBTT with 1 rate band', () => {
  let lbtt = new LBTT(0, new RateBand(50000, 0.05));
  expect(lbtt.calculateTax(150000, false)).toBe((150000-50000)*0.05);
});

test('calculates LBTT with 2 rate bands', () => {
  let lbtt = new LBTT(0, new RateBand(50000, 0.05), new RateBand(20000, 0.01));
  expect(lbtt.calculateTax(150000, false)).toBe((150000-50000)*0.05 + (150000-120000)*0.01);
});

test('calculates LBTT for price in between bands', () => {
  let lbtt = new LBTT(0, new RateBand(50000, 0.05), new RateBand(20000, 0.01));
  expect(lbtt.calculateTax(30000, false)).toBe((30000-20000)*0.01);
});

test('calculates LBTT for price below all bands', () => {
  let lbtt = new LBTT(0, new RateBand(50000, 0.05), new RateBand(20000, 0.01));
  expect(lbtt.calculateTax(1000, false)).toBe(0);
});

test('calculates LBTT for 2021 with price below £145,000.00', () => {
  let lbtt = LBTTCalculator_2021;
  expect(lbtt.calculateTax(145000, false)).toBe(0);
});


test('calculates LBTT for 2021 with price on first band', () => {
  let lbtt = LBTTCalculator_2021;
  expect(lbtt.calculateTax(175000, false)).toBe(600);
});

test('calculates LBTT for 2021 with price on second band', () => {
  let lbtt = LBTTCalculator_2021;
  expect(lbtt.calculateTax(300000, false)).toBe(4600);
});

test('calculates LBTT for 2021 with price on third band', () => {
  let lbtt = LBTTCalculator_2021;
  expect(lbtt.calculateTax(500000, false)).toBe(23350);
});


test('calculates LBTT for 2021 with price above all bands', () => {
  let lbtt = LBTTCalculator_2021;
  expect(lbtt.calculateTax(1000000, false)).toBe(78350);
});

test('calculates LBTT for 2021 with price bellow first purchase relief', () => {
  let lbtt = LBTTCalculator_2021;
  expect(lbtt.calculateTax(150000, true)).toBe(0);
});

test('calculates LBTT for 2021 with price in first band and first purchase relief', () => {
  let lbtt = LBTTCalculator_2021;
  expect(lbtt.calculateTax(200000, true)).toBe(500);
});

test('calculates LBTT for 2021 with price in second band and first purchase relief', () => {
  let lbtt = LBTTCalculator_2021;
  expect(lbtt.calculateTax(300000, true)).toBe(4000);
});