var IIITK_ERP = angular.module('IIITK_ERP',
    ['ui.router','ngFileUpload','ui.bootstrap','bootstrapLightbox']
)
    .constant('uiDatetimePickerConfig', {
        dateFormat: 'yyyy-MM-dd HH:mm',
        defaultTime: '00:00:00',
        html5Types: {
            date: 'yyyy-MM-dd',
            'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
            'month': 'yyyy-MM'
        },
        initialPicker: 'date',
        reOpenDefault: false,
        enableDate: true,
        enableTime: true,
        buttonBar: {
            show: true,
            now: {
                show: false,
                text: 'Now'
            },
            today: {
                show: false,
                text: 'Today'
            },
            clear: {
                show: false,
                text: 'Clear'
            },
            date: {
                show: true,
                text: 'Date'
            },
            time: {
                show: true,
                text: 'Time'
            },
            close: {
                show: true,
                text: 'Done'
            }
        },
        closeOnDateSelection: true,
        closeOnTimeNow: true,
        appendToBody: false,
        altInputFormats: [],
        ngModelOptions: { },
        saveAs: false,
        readAs: false,
    }).run(function($rootScope){
        $rootScope.date = new Date();
    });
