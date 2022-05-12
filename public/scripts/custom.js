var abp = abp || {};
abp.appPath = '/';
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-7314325-29', 'auto');
//ga('send', 'pageview');

jQuery(document).ready(function () { window.setInterval(function () { jQuery("div.sbzon").addClass("hidden-print"); }, 5000); });

function get_browser_info() {
    var e, r = navigator.userAgent, i = r.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    return /trident/i.test(i[1]) ? (e = /\brv[ :]+(\d+)/g.exec(r) || [], { name: "IE", version: e[1] || "" }) : "Chrome" === i[1] && (e = r.match(/\bOPR\/(\d+)/), null != e) ? { name: "Opera", version: e[1] } : (i = i[2] ? [i[1], i[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = r.match(/version\/(\d+)/i)) && i.splice(1, 1, e[1]), { name: i[0], version: i[1] })
}

function is_mobile() {
    var e = ["android", "webos", "iphone", "ipad", "blackberry"];
    for (i in e) if (navigator.userAgent.match("/" + e[i] + "/i")) return !0;
    return !1
}

jQuery(document).ready(function () {
    if (is_mobile()) jQuery("#menu-print").hide();
    else {
        var e = get_browser_info();
        "Chrome" == e.name && screen.width == window.innerWidth && screen.height == window.innerHeight ? (jQuery("#menu-print").show(), jQuery("#invehref").attr("href", KioskPrintUrl)) : jQuery("#menu-print").hide()
    }
});


jQuery(document).ready(function () {

    jQuery('.nav-menu').click(function () {
        jQuery("#bs-example-navbar-collapse-1").removeClass("show");
    });

});
