javascript:(function(options){(function(a) {
    "use strict";
    a = a || {};
    a.kit = a.kit || 0;
    a.env = a.env || 0;
    a.path = a.path || "//cdn.rawgit.com/gastonsalg/jira-bookmarklets/";
    var b = document, c = b.createElement("script"), d = [ "master", "develop" ], e = [ "ticket-print", "add-ticket", "ticket-print-lay-scrum", "add-ticket-lay-scrum" ], f = d[a.env], g = e[a.kit], h = a.path + f + "/build/" + g + "-bookmarklet.js";
    c.setAttribute("src", h);
    b.head.appendChild(c);
})(options);}());