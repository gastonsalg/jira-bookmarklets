javascript:void(function($){var Namespace = function(a) {
    "use strict";
    return {
        create: function(b) {
            var c = a, d = b.split("."), e = d.length, f = 0, g;
            for (;f < e; f++) {
                g = d[f];
                c = c[g] = c[g] || {};
            }
        },
        is: function(b, c) {
            var d = a, e = false, f = 0, g, h, i;
            if (typeof b === "object") {
                d = b;
            } else {
                c = b;
            }
            h = c.split(".");
            g = h.length;
            for (;f < g; f++) {
                i = h[f];
                if (!d[i]) {
                    e = false;
                    return false;
                }
                d = d[i];
                e = true;
            }
            return e;
        }
    };
}(this);

String.prototype.truncate = function(a) {
    "use strict";
    var b = this.length, c = "…", d = c.length, e = this;
    if (b > a) {
        e = this.substr(0, a - d) + c;
    }
    return e;
};

String.prototype.trimWhitespace = function() {
    "use strict";
    return this.replace(/\s+/g, " ").split(/\n/).join(" ");
};

String.prototype.toArray = function(a) {
    "use strict";
    a = new RegExp(a || ",");
    return this.split(a);
};

Namespace.create("xing.core.helpers");

xing.core.helpers.isArray = function(a) {
    "use strict";
    return Object.prototype.toString.call(a) === "[object Array]";
};

xing.core.helpers.isObject = function(a) {
    "use strict";
    return Object.prototype.toString.call(a) === "[object Object]";
};

Namespace.create("xing.core");

xing.core.I18n = function() {
    "use strict";
    this.en = {
        messages: {
            ticketCached: {
                title: "Ticket print",
                body: "Ticket is stored! Please navigate to another if you want " + "print one ticket more."
            }
        },
        modal: {
            collaboratorPrompt: "Please enter your collaborators!\n" + 'Note: Separate the names with a comma e.g. "Jeffrey, Walter"',
            heading: "Print preview",
            select: "Select another:",
            action: {
                addCollaborator: "Collaborators",
                remove: "Remove ticket form the list",
                print: "Print",
                cancel: "Cancel"
            },
            ticketCount: "You are printing tickets",
            pageCount: " on pages"
        },
        ticket: {
            collaborator: {
                title: "Pairing partner",
                action: '<button class="aui-button gm-change-collaborators gm-print-hidden">Collaborators</button>'
            },
            component: {
                title: "Component"
            },
            closed: {
                title: "End date",
                body: "Day | Time"
            },
            created: {
                title: "Created"
            },
            description: {
                title: "Description"
            },
            dueDate: {
                title: "Due date"
            },
            reporter: {
                title: "Reporter"
            },
            storyPoints: {
                title: "Story Points"
            },
            target: {
                title: "Target"
            },
            type: {
                title: "Type"
            },
            start: {
                title: "Start Progress",
                body: "Day | Time"
            }
        }
    };
    this.local = function(a) {
        return this[a || "en"];
    };
};

Namespace.create("xing.core");

xing.core.Markup = function() {
    "use strict";
    var a = this;
    a.ticketPanel = function(a) {
        return "" + '<div class="gm-ticket-action-panel gm-print-hidden">' + '<button type="button" class="aui-button js-gm-remove-ticket">' + '<i class="aui-icon aui-icon-small aui-iconfont-remove"></i>' + a + "</button>" + "</div>";
    };
    a.dialogHeader = function(a) {
        return "" + '<header class="jira-dialog-heading gm-print-hidden">' + "<h2>" + a + "</h2>" + "</header>";
    };
    a.dialogFooter = function(a, b, c) {
        return "" + '<footer class="buttons-container form-footer gm-print-hidden">' + '<div class="buttons">' + '<label for="gm-select-ticket">' + a + "</label>&nbsp;" + '<button id="gm-select-ticket" class="js-gm-pick-more aui-button" title="' + a + '">' + '<i class="aui-icon aui-icon-small aui-iconfont-add"></i>' + "</button>" + '<button class="js-gm-print-action aui-button aui-button-primary">' + b + "</button>" + '<a class="js-gm-cancel-action aui-button aui-button-link" href="#">' + c + "</a>" + "</div>" + "</footer>";
    };
    a.pageCounter = function(a, b, c, d) {
        return "" + '<div class="gm-page-counter gm-print-hidden">' + a + ' <span class="aui-badge">' + b + "</span>" + c + ' <span class="aui-badge">' + d + "</span>" + "</div>";
    };
    a.ticketPreview = function(a, b) {
        return "" + '<div class="form-body">' + '<ul class="gm-output-list">' + '<li class="gm-output-item is-current">' + b + "</li>" + a + "</ul>" + "</div>";
    };
};

Namespace.create("xing.core");

xing.core.Observer = function() {
    "use strict";
    var a = this;
    a._observers = [];
    a.subscribe = function(b) {
        a._observers.push(b);
    };
    a.unsubscribe = function(b) {
        var c = a.observer.indexOf(b);
        if (c >= 0) {
            a._observers.splice(c);
        }
    };
    a.update = function() {
        a._observers.forEach(function(a) {
            a.update();
        });
    };
};

Namespace.create("xing.core");

xing.core.Presenter = function() {
    "use strict";
    var a = this;
    a.dashalizer = function(a) {
        return a.toLowerCase().replace(/ /g, "-");
    };
    a.getString = function(a) {
        return (a || "").trimWhitespace();
    };
    a.getDate = function(a) {
        var b = "", c, d, e, f;
        if (a) {
            c = new Date(a);
            d = c.getMonth() + 1;
            d = d > 9 ? d : "0" + d;
            e = c.getFullYear();
            f = c.getDate();
            b = e + "-" + d + "-" + f;
        }
        return b;
    };
    a.getStorageItem = function(a) {
        var b = localStorage.getItem(a) || "";
        return b.toArray();
    };
    a.getElementText = function(a) {
        return a[0] ? a.text().trimWhitespace() : "";
    };
};

Namespace.create("xing.core.table");

xing.core.table.Builder = function() {
    "use strict";
    var a = this;
    a._text = function(a) {
        return "text" in a ? a.text : "";
    };
    a._addCssClass = function(a, b) {
        b = " " + (b || "");
        var c = a["options"] || {}, d = "cssClass" in c ? c.cssClass : "", e = "", f;
        jQuery.extend(c, {
            cssClass: d + b
        });
        if (c.cssClass === " ") {
            delete c.cssClass;
        }
        for (f in c) {
            var g = f === "cssClass" ? "class" : f, h = c[f] || "";
            g = g.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            e += " " + g + '="' + h + '"';
        }
        return e;
    };
    a.row = function(b) {
        var c = "";
        b.forEach(function(b) {
            c += a.cell(b);
        });
        return "<tr>" + c + "</tr>";
    };
    a.cell = function(b) {
        var c = b.cell, d = "", e = b.head ? "th" : "td";
        d += a._cellTitle(c);
        d += a._cellBody(c);
        return "" + "<" + e + a._addCssClass(c) + ">" + '<div class="gm-inner">' + d + "</div>" + "</" + e + ">";
    };
    a._cellBody = function(b) {
        var c = "";
        if ("body" in b) {
            var d = b.body;
            c = "<div" + a._addCssClass(d, "gm-bd") + ">" + a._text(d) + "</div>";
        }
        return c;
    };
    a._cellTitle = function(b) {
        var c = "";
        if (b.title) {
            var d = b.title;
            c = "<div" + a._addCssClass(d, "gm-hd") + ">" + a._text(d) + "</div>";
        }
        return c;
    };
    a.render = function(b, c) {
        var d = "", e = c && c.layoutName ? " gm-" + c.layoutName + "-layout" : "";
        b.forEach(function(b) {
            d += a.row(b);
        });
        return '<table class="gm-table' + e + '">' + d + "</table>";
    };
};

Namespace.create("xing.core.table");

xing.core.table.layout = {
    DEFAULT_LAYOUT: "default",
    SCRUM_LAYOUT: "scrum",
    _layouts: {
        "default": [ [ "number", "type", "component", "target" ], [ {
            title: {
                maxLength: 350
            }
        } ], [ "collobarators" ], [ "created", "dueDate", "reporter", "start", "closed" ] ],
        scrum: [ [ "number", "type", "component", "storyPoints" ], [ {
            title: {
                maxLength: 87
            }
        } ], [ "description" ] ]
    },
    get: function(a) {
        "use strict";
        var b = this._layouts[a];
        return b;
    }
};

xing.core.table.Map = function(a, b, c) {
    "use strict";
    var d = this, e = xing.core.table.layout;
    c = c || e.DEFAULT_LAYOUT;
    d._mapSwitch = function(c, e) {
        var f;
        if (typeof e === "string") {
            f = a[e]({
                data: c,
                local: b.ticket
            });
        } else if (xing.core.helpers.isObject(e)) {
            var g = Object.keys(e)[0];
            if (e[g].maxLength) {
                c[g] = c[g].truncate(e[g].maxLength);
            }
            f = a[g]({
                data: c,
                local: b.ticket
            });
        } else {
            f = d.build(c, e);
        }
        return f;
    };
    d.build = function(a, b) {
        b = b || e.get(c);
        var f = [], g = 0, h = b.length;
        for (;g < h; g++) {
            f[g] = d._mapSwitch(a, b[g]);
        }
        return f;
    };
};

Namespace.create("xing.core");

xing.core.TicketCache = function() {
    "use strict";
    var a = this, b = location.hostname, c = b ? "." : "local.";
    a.STORAGE_KEY = b + c + "ticket";
    a.DEFAULT_COLLABORATOR_KEY = b + c + "default_collaborators";
    a.default = {
        collaborators: localStorage.getItem(a.DEFAULT_COLLABORATOR_KEY) || ""
    };
    a.data = {};
    a.latest = {};
    a.update = function() {
        a.data = jQuery.extend(a.data, a.latest);
    };
    a.get = function(b) {
        var c = localStorage.getItem(a.STORAGE_KEY), d = c && c[0] ? JSON.parse(c) : [];
        if (b !== undefined && d[b]) {
            d = [ d[b] ];
        }
        return d;
    };
    a.add = function(b) {
        if (!b) {
            return;
        }
        var c = a.get(), d = c.concat([ b ]);
        localStorage.setItem(a.STORAGE_KEY, JSON.stringify(d));
    };
    a.remove = function(b) {
        if (b !== undefined) {
            var c = a.get();
            if (c[0]) {
                c.splice(b, 1);
                localStorage.setItem(a.STORAGE_KEY, JSON.stringify(c));
            }
        } else {
            localStorage.removeItem(a.STORAGE_KEY);
        }
        return a.get();
    };
    a.getCollaborators = function(b) {
        var c = a.get(b)[0];
        return c && c.collaborators || a.default.collaborators;
    };
    a.updateCollaborators = function(b, c) {
        var d = a.get(), e = d[b];
        c = c || "";
        if (e) {
            d[b] = a._updateProperty(e, "collaborators", c);
            localStorage.setItem(a.STORAGE_KEY, JSON.stringify(d));
        } else {
            a.default.collaborators = c;
            localStorage.setItem(a.DEFAULT_COLLABORATOR_KEY, c);
            a._updateProperty(a.latest, "collaborators", c);
        }
        a.update();
    };
    a._updateProperty = function(a, b, c) {
        if (a[b] !== undefined) {
            a[b] = c;
        }
        return a;
    };
};

Namespace.create("xing.jira");

xing.jira.Application = function(a, b) {
    "use strict";
    var c = this, d = xing.core, e, f, g, h, i;
    c.initialze = function(a, b) {
        c.layoutName = b && b.layoutName || "";
        e = new d.Observer();
        f = new d.TicketCache();
        i = new d.table.Builder();
        h = new d.Markup();
        g = new d.I18n().local();
        c.tableMap = new d.table.Map(new xing.jira.TableMapCell(), g, c.layoutName);
        c.addStyle(a);
        c.collectDataFromDom();
    };
    c._getContainer = function(a) {
        return a.hasClass("gm-container") && a || a.parents(".gm-container");
    };
    c._clickOutsidePopupHandler = function(a) {
        var b = jQuery(a.target), d = c._getContainer(b);
        if (!d[0]) {
            c._hidePopup();
        }
    };
    c._hidePopup = function() {
        jQuery("#gm-popup").remove();
        jQuery(document).off("click", c._clickOutsidePopupHandler);
    };
    c._updateHTML = function(a) {
        jQuery("#gm-popup").remove();
        var b = c.tableMap.build(f.latest), d = {
            layoutName: c.layoutName
        }, e = i.render(b, d), j = "", k = a.length + 1, l = Math.ceil(k / 2);
        a.forEach(function(a) {
            var e = a.number, f = b.number;
            if (e !== f) {
                j += "" + '<li class="gm-output-item">' + i.render(c.tableMap.build(a), d) + h.ticketPanel(g.modal.action.remove) + "</li>";
            }
        });
        jQuery("body").append(jQuery('<div id="gm-popup">' + '<section class="gm-container jira-dialog box-shadow">' + h.dialogHeader(g.modal.heading) + '<div class="jira-dialog-content">' + h.pageCounter(g.modal.ticketCount, k, g.modal.pageCount, l) + h.ticketPreview(j, e) + "</div>" + h.dialogFooter(g.modal.select, g.modal.action.print, g.modal.action.cancel) + "</section>" + '<div class="aui-blanket gm-print-hidden"></div>' + "</div>"));
    };
    c.addStyle = function(a) {
        if (jQuery("#gm-style")[0] || !a) {
            return;
        }
        var b = jQuery('<style id="gm-style" type="text/css"></style>');
        jQuery(document.head).append(b.html(a));
    };
    c.cacheTicketHandler = function() {
        c.update();
        var a = f.latest;
        f.add(a);
        c._hidePopup();
        c._showSuccessMessage();
    };
    c._showSuccessMessage = function() {
        jQuery(".aui-message").remove();
        if (window.AJS) {
            AJS.messages.success(".aui-page-header-inner", {
                title: g.messages.ticketCached.title,
                body: g.messages.ticketCached.body
            });
        }
        setTimeout(function() {
            jQuery(".aui-message").remove();
        }, 5e3);
    };
    c.showPopup = function() {
        if (jQuery("#gm-popup")[0]) {
            return;
        }
        e.subscribe(this);
        e.subscribe(f);
        c.update(f.get());
        jQuery("body").on("click", ".js-gm-print-action", function(a) {
            a.preventDefault();
            window.print();
            f.remove();
            c._hidePopup();
        }).on("click", ".js-gm-pick-more", function(a) {
            a.preventDefault();
            c.cacheTicketHandler();
        }).on("click", ".js-gm-cancel-action", function(a) {
            a.preventDefault();
            c._hidePopup();
        }).on("click", ".js-gm-remove-ticket", function(a) {
            a.preventDefault();
            var b = jQuery(a.target).parents("li"), d = b.index(b);
            f.remove(d);
            jQuery("#gm-popup .form-body table").eq(d).remove();
            c.update(f.get());
        }).on("click", ".gm-change-collaborators", function() {
            var a = jQuery(".gm-output-list button").index(this) - 1, b, d;
            if (jQuery(this).parents(".is-current")) {
                b = f.getCollaborators();
            } else {
                b = f.getCollaborators(a);
            }
            d = window.prompt(g.modal.collaboratorPrompt, b || "");
            if (d !== null) {
                f.updateCollaborators(a, d.trimWhitespace());
                c.update();
            }
        });
    };
    c.update = function() {
        c._updateHTML(f.get());
    };
    c.collectDataFromDom = function() {
        var a = jQuery("#greenhopper-agile-issue-web-panel dd a"), b = new d.Presenter(), c = b.getString(jQuery("#type-val img").attr("alt"));
        f.latest = {
            number: b.getString(jQuery("#key-val").text()),
            description: b.getString(jQuery("#description-val").html()),
            storyPoints: b.getString(jQuery("#customfield_12470-val").text()),
            dueDate: b.getDate(jQuery("#due-date time").attr("datetime")),
            collaborators: f.getCollaborators(),
            type: c,
            typeSelector: b.dashalizer(c),
            reporter: b.getString($("#reporter-val span").text()),
            created: b.getDate($("#summary-val").text()),
            component: b.getString($("#components-field").text()),
            target: b.getElementText(a)
        };
        e.update();
    };
    c.initialze(a, b);
};

Namespace.create("xing.jira.helpers");

xing.jira.helpers.Label = function() {
    "use strict";
    var a = this;
    a.NAMESPACE = "aui-lozenge";
    a.DEFAULT_LABEL_SELECTORS = "aui-lozenge aui-lozenge-subtle";
    a.DEFAULT_TYPES = {
        bug: "error",
        improvement: "success",
        "new-feature": "complete",
        task: "moved"
    };
    a.AGILE_TYPES = {
        "user-story": "success",
        "technical-story": "success",
        "highlevel-testcase": "current",
        "portability-testcase": "current"
    };
    a.getSelector = function(b) {
        var c;
        if (b === false) {
            return "";
        }
        c = a._filter(b, a.DEFAULT_TYPES);
        c += a._filter(b, a.AGILE_TYPES);
        return a.DEFAULT_LABEL_SELECTORS + (c ? " " + c : "");
    };
    a._filter = function(b, c) {
        var d = "";
        Object.keys(c).forEach(function(e) {
            if (b === e) {
                d = a.NAMESPACE + "-" + c[e];
            }
        });
        return d;
    };
};

Namespace.create("xing.jira");

xing.jira.TableMapCell = function() {
    "use strict";
    var a = this, b = 5;
    a.labelHelper = new xing.jira.helpers.Label();
    a.PREFIX = "gm-jira-";
    a._titleBody = function(b, c) {
        return {
            cell: {
                options: {
                    cssClass: a.PREFIX + c
                },
                title: {
                    text: b.local[c].title
                },
                body: {
                    text: b.data[c]
                }
            }
        };
    };
    a.number = function(b) {
        return {
            head: true,
            cell: {
                options: {
                    colspan: 2,
                    cssClass: a.PREFIX + "number"
                },
                body: {
                    text: b.data.number,
                    options: {
                        title: b.data.number
                    }
                }
            }
        };
    };
    a.type = function(b) {
        return {
            cell: {
                options: {
                    cssClass: a.PREFIX + "type"
                },
                title: {
                    text: b.local.type.title
                },
                body: {
                    options: {
                        cssClass: a.labelHelper.getSelector(b.data.typeSelector)
                    },
                    text: b.data.type
                }
            }
        };
    };
    a.description = function(c) {
        return {
            head: true,
            cell: {
                options: {
                    colspan: b,
                    cssClass: a.PREFIX + "description"
                },
                body: {
                    text: c.data.description
                }
            }
        };
    };
    a.component = function(b) {
        return a._titleBody(b, "component");
    };
    a.target = function(b) {
        return a._titleBody(b, "target");
    };
    a.title = function(c) {
        return {
            head: true,
            cell: {
                options: {
                    colspan: b,
                    cssClass: a.PREFIX + "title"
                },
                body: {
                    text: c.data.title
                }
            }
        };
    };
    a.collobarators = function(c) {
        return {
            cell: {
                options: {
                    colspan: b,
                    cssClass: a.PREFIX + "pairing"
                },
                title: {
                    text: c.local.collaborator.title
                },
                body: {
                    text: c.data.collaborators.split(/,/).join(" ") + c.local.collaborator.action
                }
            }
        };
    };
    a.created = function(b) {
        var c = "created";
        return {
            cell: {
                options: {
                    cssClass: a.PREFIX + c
                },
                title: {
                    text: b.local[c].title
                },
                body: {
                    options: {
                        cssClass: a.labelHelper.getSelector()
                    },
                    text: b.data[c]
                }
            }
        };
    };
    a.dueDate = function(b) {
        return {
            cell: {
                title: {
                    text: b.local.dueDate.title
                },
                body: {
                    options: {
                        cssClass: a.labelHelper.getSelector(b.data.dueDate ? "bug" : false)
                    },
                    text: b.data.dueDate
                }
            }
        };
    };
    a.reporter = function(b) {
        return a._titleBody(b, "reporter");
    };
    a.storyPoints = function(b) {
        return {
            cell: {
                options: {
                    cssClass: a.PREFIX + "story"
                },
                title: {
                    text: b.local.storyPoints.title
                },
                body: {
                    text: b.data.storyPoints
                }
            }
        };
    };
    a.start = function(a) {
        return {
            cell: {
                options: {
                    cssClass: "gm-date-content"
                },
                title: {
                    text: a.local.start.title
                },
                body: {
                    text: a.local.start.body
                }
            }
        };
    };
    a.closed = function(a) {
        return {
            cell: {
                options: {
                    cssClass: "gm-date-content"
                },
                title: {
                    text: a.local.closed.title
                },
                body: {
                    text: a.local.closed.body
                }
            }
        };
    };
};var xingJiraApp = new xing.jira.Application("");xingJiraApp.versionTimestamp="2014-10-09 5:49:12 PM";xingJiraApp.version="2.2.2";xingJiraApp.cacheTicketHandler();})(window.jQuery);