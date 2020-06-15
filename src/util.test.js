const {roundUp} = require('./util.js');

test('should round decimal numbers to ceiling', () => {
    const round = roundUp(1.011, 2);
    expect(round).toBe(1.02);
});