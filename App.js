const fs = require('fs');

const converter = (path) => {
    fs.readFile(path, 'utf8', (err, contents) => {
        const data = JSON.parse(contents);
        const totalWeeklyAmount = accumulatedWeeklyUserCashOut(data);

        data.map(content => {
            const weekTimestamp = getWeekTimestamp(content.date);
            const amount = content.operation.amount;
            let commission;

            if (content.type === 'cash_in') {
                commission = amount * 0.03 / 100;
                if (commission > 5) {
                    commission = 5;
                }
            } else {
                if (content.user_type === 'natural') {
                     if (totalWeeklyAmount[weekTimestamp][content.user_id] > 1000 ) {
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
            console.log(roundUp(commission, 2));
        });
    });
};

const getWeekTimestamp = (date) => {
    let dt = new Date(date);
    let currentWeekDay = dt.getDay();
    let lessDays = currentWeekDay === 0 ? 6 : currentWeekDay - 1;
    return + new Date(new Date(dt).setDate(dt.getDate() - lessDays));
};

const accumulatedWeeklyUserCashOut = (data) => {
    const totalWeeklyAmount = {};
    data.map(content => {
        let weekTimestamp = getWeekTimestamp(content.date);
        const amount = content.operation.amount;
        const userId = content.user_id;

        if (content.type === 'cash_out') {
            if (weekTimestamp in totalWeeklyAmount) {
                if (userId in totalWeeklyAmount[weekTimestamp]) {
                    totalWeeklyAmount[weekTimestamp][userId] += amount;
                } else {
                    totalWeeklyAmount[weekTimestamp][userId] = amount;
                }
            } else {
                const userAmount = {};
                userAmount[userId] = amount;
                totalWeeklyAmount[weekTimestamp] = userAmount;
            }
        }
    });
    return totalWeeklyAmount
};

const roundUp = (num, precision) => {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision
};

converter(process.argv[2]);