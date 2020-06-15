const {roundUp, getWeekTimestamp, accumulatedWeeklyUserCashOut} = require('./util.js');

test('[roundUp] should round decimal numbers to ceiling', () => {
    const roundCeil = roundUp(1.011, 2);
    expect(roundCeil).toBe(1.02);
});

test('[getWeekTimestamp] should return the timestamp of the week for passed date', () => {
    const weekTimestamp = getWeekTimestamp('2016-01-05');
    expect(weekTimestamp).toBe(1451865600000);

    const newDate = new Date();
    const weekTimestamp2 = getWeekTimestamp(newDate);
    expect(weekTimestamp2).toBe(+ newDate);
});

test('[getWeekTimestamp] should return true if day is in the same week', () => {
     const weekTimestamp = getWeekTimestamp('2016-01-10'); // this day is sunday;
     expect(weekTimestamp === 1451865600000).toBeTruthy();
});

// test('[accumulatedWeeklyUserCashOut] should ');

