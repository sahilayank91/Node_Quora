window.UTILITIES = {
    LOCAL_STORAGE: {
        set: function (key, value) {
            if (window.localStorage) {
                window.localStorage.setItem(key, value);
            }
        },
        get: function (key) {
            if (window.localStorage) {
                return window.localStorage.getItem(key);
            } else {
                return null;
            }
        },
        remove: function (key) {
            if (window.localStorage) {
                window.localStorage.removeItem(key);
            }
        }
    },
    NOTIFICATIONS: {
        show: function (notification) {
            var notification_class = notification.type === 'error'  ? 'gritter-error' : 'gritter-light';
            $.gritter.add({
                title: notification.title,
                text: notification.content ? notification.content : "Success!",
                class_name: notification_class,
                time: notification.time ? notification.time : 3000
            });
        },
        showForever: function (notification) {
            var notification_class = notification.type === 'error'  ? 'gritter-error' : 'gritter-light';
            $.gritter.add({
                title: notification.title,
                text: notification.content ? notification.content : "Success!",
                class_name: notification_class,
                sticky: true
            });
        },
        removeAll: function () {
            $.gritter.removeAll();
        }
    },


};
