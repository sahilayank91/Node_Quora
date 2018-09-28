ASK_BIN.filter('readableTimeFilter', function () {
    return function (timestamp) {
        if(timestamp) {
            if (moment(timestamp).isBefore()) {
                if (Math.abs(moment(timestamp) - moment()) >= 1) {
                    return moment(timestamp).calendar(null, {
                        // sameDay: '[Today]',
                        // nextDay: '[Tomorrow]',
                        // nextWeek: 'MMM D, YYYY [at] h:mm A',
                        // lastDay: '[Yesterday]',
                        // lastWeek: 'MMM D, YYYY [at] h:mm A',
                        sameElse: 'MMM D, YYYY [at] h:mm A'
                    });
                } else {
                    return moment(timestamp).fromNow();
                }
            } else {
                if (Math.abs(moment(timestamp) - moment()) >= 1) {
                    return moment(timestamp).calendar(null, {
                        // sameDay: '[Today]',
                        // nextDay: '[Tomorrow]',
                        // nextWeek: 'MMM D, YYYY [at] h:mm A',
                        // lastDay: '[Yesterday]',
                        // lastWeek: 'MMM D, YYYY [at] h:mm A',
                        sameElse: 'MMM D, YYYY [at] h:mm A'
                    });
                } else {
                    return moment(timestamp).toNow();
                }
            }
        } else {
            return "---";
        }
    };
});
