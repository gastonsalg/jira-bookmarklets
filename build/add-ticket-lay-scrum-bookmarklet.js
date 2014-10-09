javascript:void(function($){var Namespace = function(global) {
    "use strict";
    return {
        create: function(namespace) {
            var parent = global, parts = namespace.split("."), len = parts.length, i = 0, part;
            for (;i < len; i++) {
                part = parts[i];
                parent = parent[part] = parent[part] || {};
            }
        },
        is: function(namespaceOrParent, namespace) {
            var parent = global, result = false, i = 0, len, parts, part;
            if (typeof namespaceOrParent === "object") {
                parent = namespaceOrParent;
            } else {
                namespace = namespaceOrParent;
            }
            parts = namespace.split(".");
            len = parts.length;
            for (;i < len; i++) {
                part = parts[i];
                if (!parent[part]) {
                    result = false;
                    return false;
                }
                parent = parent[part];
                result = true;
            }
            return result;
        }
    };
}(this);

String.prototype.truncate = function(maxlength) {
    "use strict";
    var length = this.length, suffix = "…", suffixLength = suffix.length, result = this;
    if (length > maxlength) {
        result = this.substr(0, maxlength - suffixLength) + suffix;
    }
    return result;
};

String.prototype.trimWhitespace = function() {
    "use strict";
    return this.replace(/\s+/g, " ").split(/\n/).join(" ");
};

String.prototype.toArray = function(seperator) {
    "use strict";
    seperator = new RegExp(seperator || ",");
    return this.split(seperator);
};

Namespace.create("xing.core.helpers");

xing.core.helpers.isArray = function(obj) {
    "use strict";
    return Object.prototype.toString.call(obj) === "[object Array]";
};

xing.core.helpers.isObject = function(obj) {
    "use strict";
    return Object.prototype.toString.call(obj) === "[object Object]";
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
    this.local = function(lang) {
        return this[lang || "en"];
    };
};

Namespace.create("xing.core");

xing.core.Markup = function() {
    "use strict";
    var scope = this;
    scope.ticketPanel = function(label) {
        return "" + '<div class="gm-ticket-action-panel gm-print-hidden">' + '<button type="button" class="aui-button js-gm-remove-ticket">' + '<i class="aui-icon aui-icon-small aui-iconfont-remove"></i>' + label + "</button>" + "</div>";
    };
    scope.dialogHeader = function(label) {
        return "" + '<header class="jira-dialog-heading gm-print-hidden">' + "<h2>" + label + "</h2>" + "</header>";
    };
    scope.dialogFooter = function(selectLabel, printLabel, cancelLabel) {
        return "" + '<footer class="buttons-container form-footer gm-print-hidden">' + '<div class="buttons">' + '<label for="gm-select-ticket">' + selectLabel + "</label>&nbsp;" + '<button id="gm-select-ticket" class="js-gm-pick-more aui-button" title="' + selectLabel + '">' + '<i class="aui-icon aui-icon-small aui-iconfont-add"></i>' + "</button>" + '<button class="js-gm-print-action aui-button aui-button-primary">' + printLabel + "</button>" + '<a class="js-gm-cancel-action aui-button aui-button-link" href="#">' + cancelLabel + "</a>" + "</div>" + "</footer>";
    };
    scope.pageCounter = function(ticketText, ticketCount, pageText, pageCount) {
        return "" + '<div class="gm-page-counter gm-print-hidden">' + ticketText + ' <span class="aui-badge">' + ticketCount + "</span>" + pageText + ' <span class="aui-badge">' + pageCount + "</span>" + "</div>";
    };
    scope.ticketPreview = function(cachedTicketsMarkup, currentTicketMarkup) {
        return "" + '<div class="form-body">' + '<ul class="gm-output-list">' + '<li class="gm-output-item is-current">' + currentTicketMarkup + "</li>" + cachedTicketsMarkup + "</ul>" + "</div>";
    };
};

Namespace.create("xing.core");

xing.core.Observer = function() {
    "use strict";
    var scope = this;
    scope._observers = [];
    scope.subscribe = function(subscriber) {
        scope._observers.push(subscriber);
    };
    scope.unsubscribe = function(subscriber) {
        var index = scope.observer.indexOf(subscriber);
        if (index >= 0) {
            scope._observers.splice(index);
        }
    };
    scope.update = function() {
        scope._observers.forEach(function(observer) {
            observer.update();
        });
    };
};

Namespace.create("xing.core");

xing.core.Presenter = function() {
    "use strict";
    var scope = this;
    scope.dashalizer = function(string) {
        return string.toLowerCase().replace(/ /g, "-");
    };
    scope.getString = function(string) {
        return (string || "").trimWhitespace();
    };
    scope.getDate = function(timestamp) {
        var formattedDate = "", date, m, Y, d;
        if (timestamp) {
            date = new Date(timestamp);
            m = date.getMonth() + 1;
            m = m > 9 ? m : "0" + m;
            Y = date.getFullYear();
            d = date.getDate();
            formattedDate = Y + "-" + m + "-" + d;
        }
        return formattedDate;
    };
    scope.getStorageItem = function(key) {
        var item = localStorage.getItem(key) || "";
        return item.toArray();
    };
    scope.getElementText = function($el) {
        return $el[0] ? $el.text().trimWhitespace() : "";
    };
};

Namespace.create("xing.core.table");

xing.core.table.Builder = function() {
    "use strict";
    var scope = this;
    scope._text = function(tag) {
        return "text" in tag ? tag.text : "";
    };
    scope._addCssClass = function(tag, additionalClass) {
        additionalClass = " " + (additionalClass || "");
        var options = tag["options"] || {}, cssClass = "cssClass" in options ? options.cssClass : "", attrs = "", option;
        jQuery.extend(options, {
            cssClass: cssClass + additionalClass
        });
        if (options.cssClass === " ") {
            delete options.cssClass;
        }
        for (option in options) {
            var attr = option === "cssClass" ? "class" : option, value = options[option] || "";
            attr = attr.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            attrs += " " + attr + '="' + value + '"';
        }
        return attrs;
    };
    scope.row = function(rowData) {
        var result = "";
        rowData.forEach(function(cellData) {
            result += scope.cell(cellData);
        });
        return "<tr>" + result + "</tr>";
    };
    scope.cell = function(cellData) {
        var cell = cellData.cell, result = "", tag = cellData.head ? "th" : "td";
        result += scope._cellTitle(cell);
        result += scope._cellBody(cell);
        return "" + "<" + tag + scope._addCssClass(cell) + ">" + '<div class="gm-inner">' + result + "</div>" + "</" + tag + ">";
    };
    scope._cellBody = function(cell) {
        var result = "";
        if ("body" in cell) {
            var body = cell.body;
            result = "<div" + scope._addCssClass(body, "gm-bd") + ">" + scope._text(body) + "</div>";
        }
        return result;
    };
    scope._cellTitle = function(cell) {
        var result = "";
        if (cell.title) {
            var title = cell.title;
            result = "<div" + scope._addCssClass(title, "gm-hd") + ">" + scope._text(title) + "</div>";
        }
        return result;
    };
    scope.render = function(tableData, options) {
        var result = "", cssClass = options && options.layoutName ? " gm-" + options.layoutName + "-layout" : "";
        tableData.forEach(function(rowData) {
            result += scope.row(rowData);
        });
        return '<table class="gm-table' + cssClass + '">' + result + "</table>";
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
    get: function(layoutName) {
        "use strict";
        var result = this._layouts[layoutName];
        return result;
    }
};

xing.core.table.Map = function(tableCell, local, layoutName) {
    "use strict";
    var scope = this, layout = xing.core.table.layout;
    layoutName = layoutName || layout.DEFAULT_LAYOUT;
    scope._mapSwitch = function(data, mapItem) {
        var result;
        if (typeof mapItem === "string") {
            result = tableCell[mapItem]({
                data: data,
                local: local.ticket
            });
        } else if (xing.core.helpers.isObject(mapItem)) {
            var mapItemName = Object.keys(mapItem)[0];
            if (mapItem[mapItemName].maxLength) {
                data[mapItemName] = data[mapItemName].truncate(mapItem[mapItemName].maxLength);
            }
            result = tableCell[mapItemName]({
                data: data,
                local: local.ticket
            });
        } else {
            result = scope.build(data, mapItem);
        }
        return result;
    };
    scope.build = function(data, map) {
        map = map || layout.get(layoutName);
        var cellMap = [], index = 0, length = map.length;
        for (;index < length; index++) {
            cellMap[index] = scope._mapSwitch(data, map[index]);
        }
        return cellMap;
    };
};

Namespace.create("xing.core");

xing.core.TicketCache = function() {
    "use strict";
    var scope = this, hostname = location.hostname, separator = hostname ? "." : "local.";
    scope.STORAGE_KEY = hostname + separator + "ticket";
    scope.DEFAULT_COLLABORATOR_KEY = hostname + separator + "default_collaborators";
    scope.default = {
        collaborators: localStorage.getItem(scope.DEFAULT_COLLABORATOR_KEY) || ""
    };
    scope.data = {};
    scope.latest = {};
    scope.update = function() {
        scope.data = jQuery.extend(scope.data, scope.latest);
    };
    scope.get = function(index) {
        var cachedTickets = localStorage.getItem(scope.STORAGE_KEY), result = cachedTickets && cachedTickets[0] ? JSON.parse(cachedTickets) : [];
        if (index !== undefined && result[index]) {
            result = [ result[index] ];
        }
        return result;
    };
    scope.add = function(map) {
        if (!map) {
            return;
        }
        var cachedTickets = scope.get(), tickets = cachedTickets.concat([ map ]);
        localStorage.setItem(scope.STORAGE_KEY, JSON.stringify(tickets));
    };
    scope.remove = function(index) {
        if (index !== undefined) {
            var cachedTickets = scope.get();
            if (cachedTickets[0]) {
                cachedTickets.splice(index, 1);
                localStorage.setItem(scope.STORAGE_KEY, JSON.stringify(cachedTickets));
            }
        } else {
            localStorage.removeItem(scope.STORAGE_KEY);
        }
        return scope.get();
    };
    scope.getCollaborators = function(index) {
        var ticket = scope.get(index)[0];
        return ticket && ticket.collaborators || scope.default.collaborators;
    };
    scope.updateCollaborators = function(index, names) {
        var tickets = scope.get(), ticket = tickets[index];
        names = names || "";
        if (ticket) {
            tickets[index] = scope._updateProperty(ticket, "collaborators", names);
            localStorage.setItem(scope.STORAGE_KEY, JSON.stringify(tickets));
        } else {
            scope.default.collaborators = names;
            localStorage.setItem(scope.DEFAULT_COLLABORATOR_KEY, names);
            scope._updateProperty(scope.latest, "collaborators", names);
        }
        scope.update();
    };
    scope._updateProperty = function(ticket, key, value) {
        if (ticket[key] !== undefined) {
            ticket[key] = value;
        }
        return ticket;
    };
};

Namespace.create("xing.jira");

xing.jira.Application = function(cssResources, options) {
    "use strict";
    var scope = this, nsXC = xing.core, observer, ticketCache, local, markup, tableBuilder;
    scope.initialze = function(cssResources, options) {
        scope.layoutName = options && options.layoutName || "";
        observer = new nsXC.Observer();
        ticketCache = new nsXC.TicketCache();
        tableBuilder = new nsXC.table.Builder();
        markup = new nsXC.Markup();
        local = new nsXC.I18n().local();
        scope.tableMap = new nsXC.table.Map(new xing.jira.TableMapCell(), local, scope.layoutName);
        scope.addStyle(cssResources);
        scope.collectDataFromDom();
    };
    scope._getContainer = function($el) {
        return $el.hasClass("gm-container") && $el || $el.parents(".gm-container");
    };
    scope._clickOutsidePopupHandler = function(event) {
        var $target = $(event.target), $container = scope._getContainer($target);
        if (!$container[0]) {
            scope._hidePopup();
        }
    };
    scope._hidePopup = function() {
        $("#gm-popup").remove();
        $(document).off("click", scope._clickOutsidePopupHandler);
    };
    scope._updateHTML = function(cachedTicketMaps) {
        $("#gm-popup").remove();
        var map = scope.tableMap.build(ticketCache.latest), builderRenderOptions = {
            layoutName: scope.layoutName
        }, currentTicketMarkup = tableBuilder.render(map, builderRenderOptions), cachedTicketsMarkup = "", numberOfTickets = cachedTicketMaps.length + 1, numberOfPages = Math.ceil(numberOfTickets / 2);
        cachedTicketMaps.forEach(function(cachedTicketMap) {
            var number = cachedTicketMap.number, currentNumber = map.number;
            if (number !== currentNumber) {
                cachedTicketsMarkup += "" + '<li class="gm-output-item">' + tableBuilder.render(scope.tableMap.build(cachedTicketMap), builderRenderOptions) + markup.ticketPanel(local.modal.action.remove) + "</li>";
            }
        });
        $("body").append($('<div id="gm-popup">' + '<section class="gm-container jira-dialog box-shadow">' + markup.dialogHeader(local.modal.heading) + '<div class="jira-dialog-content">' + markup.pageCounter(local.modal.ticketCount, numberOfTickets, local.modal.pageCount, numberOfPages) + markup.ticketPreview(cachedTicketsMarkup, currentTicketMarkup) + "</div>" + markup.dialogFooter(local.modal.select, local.modal.action.print, local.modal.action.cancel) + "</section>" + '<div class="aui-blanket gm-print-hidden"></div>' + "</div>"));
    };
    scope.addStyle = function(resources) {
        if ($("#gm-style")[0] || !resources) {
            return;
        }
        var $style = $('<style id="gm-style" type="text/css"></style>');
        $(document.head).append($style.html(resources));
    };
    scope.cacheTicketHandler = function() {
        scope.update();
        var map = ticketCache.latest;
        ticketCache.add(map);
        scope._hidePopup();
        scope._showSuccessMessage();
    };
    scope._showSuccessMessage = function() {
        $(".aui-message").remove();
        if (window.AJS) {
            AJS.messages.success(".aui-page-header-inner", {
                title: local.messages.ticketCached.title,
                body: local.messages.ticketCached.body
            });
        }
        setTimeout(function() {
            $(".aui-message").remove();
        }, 5e3);
    };
    scope.showPopup = function() {
        if ($("#gm-popup")[0]) {
            return;
        }
        observer.subscribe(this);
        observer.subscribe(ticketCache);
        scope.update(ticketCache.get());
        $("body").on("click", ".js-gm-print-action", function(event) {
            event.preventDefault();
            window.print();
            ticketCache.remove();
            scope._hidePopup();
        }).on("click", ".js-gm-pick-more", function(event) {
            event.preventDefault();
            scope.cacheTicketHandler();
        }).on("click", ".js-gm-cancel-action", function(event) {
            event.preventDefault();
            scope._hidePopup();
        }).on("click", ".js-gm-remove-ticket", function(event) {
            event.preventDefault();
            var $target = $(event.target).parents("li"), index = $target.index($target);
            ticketCache.remove(index);
            $("#gm-popup .form-body table").eq(index).remove();
            scope.update(ticketCache.get());
        }).on("click", ".gm-change-collaborators", function() {
            var index = $(".gm-output-list button").index(this) - 1, names, confirmedNames;
            if ($(this).parents(".is-current")) {
                names = ticketCache.getCollaborators();
            } else {
                names = ticketCache.getCollaborators(index);
            }
            confirmedNames = window.prompt(local.modal.collaboratorPrompt, names || "");
            if (confirmedNames !== null) {
                ticketCache.updateCollaborators(index, confirmedNames.trimWhitespace());
                scope.update();
            }
        });
    };
    scope.update = function() {
        scope._updateHTML(ticketCache.get());
    };
    scope.collectDataFromDom = function() {
        var $target = $("#greenhopper-agile-issue-web-panel dd a"), presenter = new nsXC.Presenter(), type = presenter.getString($("#type-val img").attr("alt"));
        ticketCache.latest = {
            number: presenter.getString($("#key-val").text()),
            description: presenter.getString($("#description-val").html()),
            storyPoints: presenter.getString($("#customfield_12470-val").text()),
            dueDate: presenter.getDate($("#due-date time").attr("datetime")),
            collaborators: ticketCache.getCollaborators(),
            type: type,
            typeSelector: presenter.dashalizer(type),
            reporter: presenter.getString($("#reporter-val span").text()),
            created: presenter.getDate($("#summary-val").text()),
            component: presenter.getString($("#components-field").text()),
            target: presenter.getElementText($target)
        };
        observer.update();
    };
    scope.initialze(cssResources, options);
};

Namespace.create("xing.jira.helpers");

xing.jira.helpers.Label = function() {
    "use strict";
    var scope = this;
    scope.NAMESPACE = "aui-lozenge";
    scope.DEFAULT_LABEL_SELECTORS = "aui-lozenge aui-lozenge-subtle";
    scope.DEFAULT_TYPES = {
        bug: "error",
        improvement: "success",
        "new-feature": "complete",
        task: "moved"
    };
    scope.AGILE_TYPES = {
        "user-story": "success",
        "technical-story": "success",
        "highlevel-testcase": "current",
        "portability-testcase": "current"
    };
    scope.getSelector = function(type) {
        var result;
        if (type === false) {
            return "";
        }
        result = scope._filter(type, scope.DEFAULT_TYPES);
        result += scope._filter(type, scope.AGILE_TYPES);
        return scope.DEFAULT_LABEL_SELECTORS + (result ? " " + result : "");
    };
    scope._filter = function(type, typeMap) {
        var result = "";
        Object.keys(typeMap).forEach(function(key) {
            if (type === key) {
                result = scope.NAMESPACE + "-" + typeMap[key];
            }
        });
        return result;
    };
};

Namespace.create("xing.jira");

xing.jira.TableMapCell = function() {
    "use strict";
    var scope = this, MAX_COLS = 5;
    scope.labelHelper = new xing.jira.helpers.Label();
    scope.PREFIX = "gm-jira-";
    scope._titleBody = function(options, item) {
        return {
            cell: {
                options: {
                    cssClass: scope.PREFIX + item
                },
                title: {
                    text: options.local[item].title
                },
                body: {
                    text: options.data[item]
                }
            }
        };
    };
    scope.number = function(options) {
        return {
            head: true,
            cell: {
                options: {
                    colspan: 2,
                    cssClass: scope.PREFIX + "number"
                },
                body: {
                    text: options.data.number,
                    options: {
                        title: options.data.number
                    }
                }
            }
        };
    };
    scope.type = function(options) {
        return {
            cell: {
                options: {
                    cssClass: scope.PREFIX + "type"
                },
                title: {
                    text: options.local.type.title
                },
                body: {
                    options: {
                        cssClass: scope.labelHelper.getSelector(options.data.typeSelector)
                    },
                    text: options.data.type
                }
            }
        };
    };
    scope.description = function(options) {
        return {
            head: true,
            cell: {
                options: {
                    colspan: MAX_COLS,
                    cssClass: scope.PREFIX + "description"
                },
                body: {
                    text: options.data.description
                }
            }
        };
    };
    scope.component = function(options) {
        return scope._titleBody(options, "component");
    };
    scope.target = function(options) {
        return scope._titleBody(options, "target");
    };
    scope.title = function(options) {
        return {
            head: true,
            cell: {
                options: {
                    colspan: MAX_COLS,
                    cssClass: scope.PREFIX + "title"
                },
                body: {
                    text: options.data.title
                }
            }
        };
    };
    scope.collobarators = function(options) {
        return {
            cell: {
                options: {
                    colspan: MAX_COLS,
                    cssClass: scope.PREFIX + "pairing"
                },
                title: {
                    text: options.local.collaborator.title
                },
                body: {
                    text: options.data.collaborators.split(/,/).join(" ") + options.local.collaborator.action
                }
            }
        };
    };
    scope.created = function(options) {
        var item = "created";
        return {
            cell: {
                options: {
                    cssClass: scope.PREFIX + item
                },
                title: {
                    text: options.local[item].title
                },
                body: {
                    options: {
                        cssClass: scope.labelHelper.getSelector()
                    },
                    text: options.data[item]
                }
            }
        };
    };
    scope.dueDate = function(options) {
        return {
            cell: {
                title: {
                    text: options.local.dueDate.title
                },
                body: {
                    options: {
                        cssClass: scope.labelHelper.getSelector(options.data.dueDate ? "bug" : false)
                    },
                    text: options.data.dueDate
                }
            }
        };
    };
    scope.reporter = function(options) {
        return scope._titleBody(options, "reporter");
    };
    scope.storyPoints = function(options) {
        return {
            cell: {
                options: {
                    cssClass: scope.PREFIX + "story"
                },
                title: {
                    text: options.local.storyPoints.title
                },
                body: {
                    text: options.data.storyPoints
                }
            }
        };
    };
    scope.start = function(options) {
        return {
            cell: {
                options: {
                    cssClass: "gm-date-content"
                },
                title: {
                    text: options.local.start.title
                },
                body: {
                    text: options.local.start.body
                }
            }
        };
    };
    scope.closed = function(options) {
        return {
            cell: {
                options: {
                    cssClass: "gm-date-content"
                },
                title: {
                    text: options.local.closed.title
                },
                body: {
                    text: options.local.closed.body
                }
            }
        };
    };
};var xingJiraApp = new xing.jira.Application("", { layoutName: xing.core.table.layout.SCRUM_LAYOUT });xingJiraApp.versionTimestamp="2014-10-09 6:21:06 PM";xingJiraApp.version="2.2.2";xingJiraApp.cacheTicketHandler();})(jQuery);