const fs = require('fs');

const converter = () => {
    fs.readFile('input.json', 'utf8', (err, contents) => {
        const data = JSON.parse(contents);
        const totalWeeklyAmount = {};

        const getWeekTimestamp = (date) => {
            let dt = new Date(date);
            let currentWeekDay = dt.getDay();
            let lessDays = currentWeekDay === 0 ? 6 : currentWeekDay - 1;
            return +new Date(new Date(dt).setDate(dt.getDate() - lessDays));
        };

        data.map(content => {
            let weekTimestamp = getWeekTimestamp(content.date);
            const amount = content.operation.amount;
            const userId = content.user_id;
            const type = content.type;

            if (type === 'cash_out') {
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

        console.log(totalWeeklyAmount);

        // data.map(content => {
        //     const userId = content.user_id;
        //     const amount = content.operation.amount;
        //     const type = content.type;
        //     const userType = content.user_type;
        //     const date = content.date;
        //     let newAmount = 0;
        //     let dayOfWeek = new Date(date).getDay();
        //
        //
        //     // console.log("first day: ", firstDayTimestamp);
        //     // console.log("last day: ", lastDayTimestamp);
        //     // console.log("current day: ", currDateTimestamp);
        //     // console.log("Difference: ", diff);
        //
        //
        //     if (type === 'cash_in') {
        //         newAmount = amount * 0.03 / 100;
        //         if (newAmount > 5) {
        //             newAmount = 5;
        //         }
        //         return newAmount;
        //     } else {
        //         if (userType === 'natural') {
        //             // if () {
        //             //
        //             // }
        //         }
        //     }
        //
        // });
    });
};

converter();