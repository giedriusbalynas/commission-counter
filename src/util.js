exports.roundUp = (num, precision) => {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision
};

const getWeekTimestamp = exports.getWeekTimestamp = date => {
    const dt = new Date(date);
    const currentWeekDay = dt.getDay();
    const lessDays = currentWeekDay === 0 ? 6 : currentWeekDay - 1; // (monday to sunday)
    return + new Date(new Date(dt).setDate(dt.getDate() - lessDays));
};

exports.accumulatedWeeklyUserCashOut = data => {
    const totalWeeklyAmount = {};
    data.map(content => {
        const weekTimestamp = getWeekTimestamp(content.date);
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