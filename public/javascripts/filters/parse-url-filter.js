ASK_BIN.filter('hrefToJS', function ($sce, $sanitize) {
    return function (text) {

        if(!text) return text;
        // TODO remove script tags server side
        // TODO $sanitize removes script tags but javascript can be executed as onHover etc. fix

        var regex = /href="([\S]+)"/g;
        text = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        var newString = $sanitize(text).replace(regex, "href onClick=\"window.open('$1', '_system', 'location=yes')\"");
        return $sce.trustAsHtml(newString);
    }
});
