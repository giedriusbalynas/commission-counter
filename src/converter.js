const fs = require('fs');
const {roundUp, getWeekTimestamp, accumulatedWeeklyUserCashOut} = require("./util.js");

exports.converter = (path) => {
    let commissionArray;
    const fileContent = fs.readFileSync(path, 'utf8');
    const data = JSON.parse(fileContent);
    const totalWeeklyAmount = accumulatedWeeklyUserCashOut(data);

    commissionArray = data.map(content => {
        let commission;
        const weekTimestamp = getWeekTimestamp(content.date);
        const amount = content.operation.amount;

        if (content.type === 'cash_in') {
            commission = amount * 0.03 / 100;
            if (commission > 5) {
                commission = 5;
            }
        } else {
            if (content.user_type === 'natural') {
                if (totalWeeklyAmount[weekTimestamp][content.user_id] > 1000) {
                    if (amount > 1000) {
                        commission = (amount - 1000) * .3 / 100;
                    } else {
                        commission = (amount * .3 / 100);
                    }
                } else {
                    commission = 0;
                }
            } else {
                commission = amount * .3 / 100;
                if (commission < 0.5) {
                    commission = 0.5;
                }
            }
        }
        const result = roundUp(commission, 2).toFixed(2);
        console.log(result);
        return result;
    });
    return commissionArray
};