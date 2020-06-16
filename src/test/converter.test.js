const {converter} = require('../converter.js');

const path = './src/test/testData.json';
const expectedResult = ["0.06", "0.90", "87.00", "3.00", "0.30", "0.30", "5.00", "0.00", "0.00"];


test('[converter] should return expected array of data', () => {
    const receivedResult = converter(path);
    expect(receivedResult).toEqual(expectedResult);
});

test('[converter] should return same output length as input length', () => {
    const receivedResult = converter(path).length;
    expect(receivedResult).toBe(expectedResult.length);
});

test('[converter] should return same output length as input length', () => {
    const receivedResult = converter(path);
    const result = Object.prototype.toString.call(receivedResult);
    expect(result).toBe('[object Array]');
});

