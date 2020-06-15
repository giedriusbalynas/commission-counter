const jsonData = require('./testData');
const {roundUp, getWeekTimestamp, accumulatedWeeklyUserCashOut} = require('../util.js');

test('[roundUp] should round decimal numbers to ceiling', () => {
    const roundCeil = roundUp(1.011, 2);
    expect(roundCeil).toBe(1.02);
});

test('[getWeekTimestamp] should return the timestamp of the week for passed date', () => {
    const weekTimestamp = getWeekTimestamp('2016-01-06');
    expect(weekTimestamp).toBe(1451865600000);

    const newDate = new Date();
    const weekTimestamp2 = getWeekTimestamp(newDate);
    console.log("getWeekTimestamp:", weekTimestamp2, "newDateTimestamp", + newDate);
    expect(weekTimestamp2).toBe(+ newDate);
});

test('[getWeekTimestamp] should return true if day is in the same week', () => {
    const weekTimestamp = getWeekTimestamp('2016-01-10'); // this day is sunday;
    expect(weekTimestamp === 1451865600000).toBeTruthy();
});

test('[accumulatedWeeklyUserCashOut] should return object', () => {
    const weeklyUserCashOut = typeof accumulatedWeeklyUserCashOut(jsonData);
    expect(weeklyUserCashOut).toBe("object");
});

test('[accumulatedWeeklyUserCashOut] should return specific object for specific data', () => {
    const weeklyUserCashOut = accumulatedWeeklyUserCashOut(jsonData);
    expect(weeklyUserCashOut).toEqual(
        {
            '1451865600000': {'1': 31200, '2': 300, '3': 1000},
            '1455494400000': {'1': 300}
        }
    );
});