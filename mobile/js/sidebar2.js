;
window.Eager = window.Eager || {};
Eager.siteId = "preview";
Eager.generation = "20160316062958-6282";
Eager.installs = Eager.installs || {};;
(function() {
    var prevEls = {};
    Eager.createElement = function(options, prevEl) {
        try {
            if (prevEl && prevEl.parentNode) {
                var replacedEl;
                if (prevEl.eagerElementId) {
                    replacedEl = prevEls[prevEl.eagerElementId];
                }
                if (replacedEl) {
                    prevEl.parentNode.replaceChild(replacedEl, prevEl);
                    delete prevEls[prevEl.eagerElementId];
                } else {
                    prevEl.parentNode.removeChild(prevEl);
                }
            }
            var element = document.createElement('eager-app');
            var container;
            try {
                container = document.querySelector(options.selector);
            } catch (e) {}
            if (!container) {
                return element;
            }
            if (!container.parentNode && (options.method == "after" || options.method == "before" || options.method == "replace")) {
                return element;
            }
            if (container == document.body) {
                if (options.method == "after")
                    options.method = "append";
                else if (options.method == "before")
                    options.method = "prepend";
            }
            switch (options.method) {
                case "prepend":
                    if (container.firstChild) {
                        container.insertBefore(element, container.firstChild);
                        break;
                    }
                case "append":
                    container.appendChild(element);
                    break;
                case "after":
                    if (container.nextSibling) {
                        container.parentNode.insertBefore(element, container.nextSibling);
                    } else {
                        container.parentNode.appendChild(element);
                    }
                    break;
                case "before":
                    container.parentNode.insertBefore(element, container);
                    break;
                case "replace":
                    try {
                        id = element.eagerElementId = Math.random().toString(36);
                        prevEls[id] = container;
                    } catch (e) {}
                    container.parentNode.replaceChild(element, container);
            }
            return element;
        } catch (e) {
            if (typeof console !== "undefined" && typeof console.error !== "undefined") {
                console.error("Error creating Eager element", e);
            }
        }
    }
})();;
(function() {
    Eager.matchPage = function(patterns) {
        if (!patterns || !patterns.length) {
            return true;
        }
        if (window.Eager && Eager.proxy && Eager.proxy.originalURL) {
            var url = Eager.proxy.originalURL.parsed;
            var loc = url.host + url.path;
        } else {
            var loc = document.location.host + document.location.pathname;
        }
        for (var i = 0; i < patterns.length; i++) {
            var re = new RegExp(patterns[i], 'i');
            if (re.test(loc)) {
                return true;
            }
        }
        return false;
    }
})();;
Eager.installs["preview"] = {
    appId: "HPllXXlbuYyF",
    scope: {}
};;
Eager.installs["preview"].options = {
    "backgroundColor": "#ffffff",
    "buttonColor": "#ffffff",
    "buttonText": "",
    "coverColor": "#000000",
    "items": [{
        "href": "",
        "itemType": "label",
        "labelText": "Menu",
        "linkText": ""
    }, {
        "href": "chat.html",
        "icon": "user",
        "itemType": "link",
        "labelText": "",
        "linkText": "Ask A Librarian",
        "targetBlank": true
    }, {
        "href": "http://catalog.library.ucla.edu/vwebv/login",
        "icon": "home2",
        "itemType": "link",
        "labelText": "",
        "linkText": "My account",
        "targetBlank": true
    }, {
        "href": "http://guides.library.ucla.edu",
        "icon": "file-empty",
        "itemType": "link",
        "labelText": "",
        "linkText": "Research Guides",
        "targetBlank": true
    }, {
        "href": "http://catalog.library.ucla.edu/",
        "icon": "search",
        "itemType": "link",
        "labelText": "",
        "linkText": "Search Library Catalog",
        "targetBlank": true
    }, {
        "href": "https://www.library.ucla.edu/",
        "icon": "new-tab",
        "itemType": "link",
        "labelText": "",
        "linkText": "Go To Full Site",
        "targetBlank": true
    }],
    "labelColor": "#888888",
    "linkColor": "#000000",
    "position": "right",
    "showCover": true
};;
if (Eager.matchPage(Eager.installs['preview'].URLPatterns)) {
    (function() {
        if (!document.addEventListener || !document.documentElement.setAttribute) {
            return;
        }
        var options = Eager.installs['preview'].options;
        var pointerEventsSupport;
        (function() {
            var el = document.createElement('x');
            el.style.cssText = 'pointer-events:auto';
            pointerEventsSupport = el.style.pointerEvents === 'auto';
        })();
        var navEl = document.createElement('eager-side-nav');
        var buttonEl = document.createElement('eager-side-nav-button');
        var setPosition = function() {
            navEl.setAttribute('eager-side-nav-position', options.position);
            buttonEl.setAttribute('eager-side-nav-position', options.position);
        };
        setPosition();
        var coverEl = document.createElement('eager-side-nav-cover');
        var style;
        var addStyles = function() {
            style = document.createElement('style');
            renderStyles();
            document.body.appendChild(style);
        };
        var renderStyles = function() {
            style.innerHTML = '' + 'eager-side-nav > a {' + 'color: ' + options.linkColor + ' !important' + '}' + 'eager-side-nav-label {' + 'color: ' + options.labelColor + ' !important' + '}' + 'eager-side-nav {' + 'background: ' + options.backgroundColor + ' !important' + '}' + 'eager-side-nav-button:after {' + 'content: "' + options.buttonText.replace(/"/g, '\\"') + '"' + '}' + 'eager-side-nav-button-bar {' + 'background: ' + options.buttonColor + ' !important' + '}' + 'eager-side-nav-button[eager-side-nav-opened="true"] eager-side-nav-button-bar {' + 'background: ' + options.linkColor + ' !important' + '}' +
                (options.showCover ? '' + 'eager-side-nav-cover {' + 'background: ' + options.coverColor + ' !important' + '}' : '') + '';
        };
        var addCover = function() {
            if (pointerEventsSupport) {
                document.body.appendChild(coverEl);
            }
        };
        var addNavItem = function(item) {
            var itemEl;
            if (item.itemType === 'link') {
                itemEl = document.createElement('a');
                itemEl.appendChild(document.createTextNode(item.linkText));
                itemEl.setAttribute('href', item.href || '');
                if (item.targetBlank === true) {
                    itemEl.setAttribute('target', '_blank');
                }
                if (item.icon && item.icon !== 'none') {
                    itemEl.setAttribute('eager-side-nav-icon', item.icon);
                }
            } else {
                itemEl = document.createElement('eager-side-nav-label');
                itemEl.appendChild(document.createTextNode(item.labelText));
            }
            navEl.appendChild(itemEl);
        };
        var addNavEl = function() {
            document.body.appendChild(navEl);
        };
        var addNavItems = function() {
            for (var i = 0; i < options.items.length; i++) {
                addNavItem(options.items[i]);
            }
        };
        var addButton = function() {
            buttonEl.innerHTML = '' + '<eager-side-nav-button-bar></eager-side-nav-button-bar>' + '<eager-side-nav-button-bar></eager-side-nav-button-bar>' + '<eager-side-nav-button-bar></eager-side-nav-button-bar>' + '';
            document.body.appendChild(buttonEl);
        };
        var setupEvents = function() {
            buttonEl.addEventListener('click', toggle);
            document.body.addEventListener('click', function(event) {
                if (!event || !event.target) {
                    return;
                }
                if (event.target === buttonEl || event.target === navEl || buttonEl.contains(event.target) || navEl.contains(event.target)) {
                    return;
                }
                close();
            });
            window.addEventListener('pushState', close);
            window.addEventListener('replaceState', close);
            window.addEventListener('hashchange', close);
            coverEl.addEventListener('touchstart', function() {}, false);
            buttonEl.addEventListener('touchstart', function() {}, false);
            navEl.addEventListener('touchstart', function() {}, false);
        };
        var toggle = function() {
            if (buttonEl.getAttribute('eager-side-nav-opened') === 'true') {
                close();
            } else {
                open();
            }
        };
        var open = function() {
            coverEl.setAttribute('eager-side-nav-opened', 'true');
            buttonEl.setAttribute('eager-side-nav-opened', 'true');
            navEl.setAttribute('eager-side-nav-opened', 'true');
        };
        var close = function() {
            coverEl.setAttribute('eager-side-nav-opened', 'false');
            buttonEl.setAttribute('eager-side-nav-opened', 'false');
            navEl.setAttribute('eager-side-nav-opened', 'false');
        };
        document.addEventListener('DOMContentLoaded', function() {
            addStyles();
            addCover();
            addNavEl();
            addNavItems();
            addButton();
            setupEvents();
        });
        Eager.installs['preview'].scope = {
            setOptions: function(opts) {
                options = opts;
                renderStyles();
                navEl.innerHTML = '';
                addNavItems();
                setPosition();
            }
        };
    })();
};
(function() {
    try {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'data:text/css;charset=utf-8;base64,+++ICo6bnRoLWNoaWxkKDEpIHsKICB0b3A6IDRweCAhaW1wb3J0YW50Cn0KCmVhZ2VyLXNpZGUtbmF2LWJ1dHRvbiA+=';
        document.getElementsByTagName('head')[0].appendChild(link);
    } catch (e) {}
})();;
window.Eager = window.Eager || {};
Eager.loadAsync = {
    "script": ["//bundler.eager.io/preview/siteId/preview/body.js?code=27pv5hqzw4p"],
    "style": []
};;
(function() {
    var load = Eager.reloadBody = function() {
        try {
            var head = document.getElementsByTagName('head')[0];
            for (var i = Eager.loadAsync.script.length; i--;) {
                var script = document.createElement('script');
                script.src = Eager.loadAsync.script[i];
                head.appendChild(script);
            }
            for (var i = Eager.loadAsync.style.length; i--;) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = Eager.loadAsync.style[i];
                head.appendChild(link);
            }
        } catch (e) {
            if (typeof console !== "undefined" && typeof console.error !== "undefined")
                console.error("Error loading Eager content", e);
        }
    };
    try {
        if (Eager.loadAsync) {
            if (document.readyState !== 'loading') {
                load();
            } else {
                if (document.addEventListener) {
                    document.addEventListener('DOMContentLoaded', load, false);
                } else {
                    document.attachEvent('onreadystatechange', function() {
                        if (document.readyState == 'complete') {
                            load();
                        }
                    });
                }
            }
        }
    } catch (e) {
        if (typeof console !== "undefined" && typeof console.error !== "undefined")
            console.error("Error binding Eager load event", e);
    }
})();;
(function() {
    window.parent.postMessage({
        type: "eager-preview:loaded",
        proxy: window.Eager && Eager.proxy,
        errors: window.Eager && Eager.errors
    }, "*")
    if (window.Eager && window.Eager.errors) {
        window.parent.postMessage({
            type: "eager-preview:error",
            errors: Eager.errors
        }, "*")
    }
    var cloneNode = function(el) {
        var newEl = document.createElement(el.tagName);
        for (var i = el.attributes.length; i--;) {
            var attr = el.attributes[i];
            if (attr.specified) {
                newEl.setAttribute(attr.name, attr.value);
            }
        }
        newEl.innerHTML = el.innerHTML;
        return newEl;
    }
    var lastUrl = null;
    var updateUrl = function() {
        var url = document.location.toString();
        if (url === lastUrl)
            return
        lastUrl = url;
        window.parent.postMessage({
            type: "eager-preview:change:location",
            url: url
        }, "*");
    }
    updateUrl();
    window.addEventListener('popstate', updateUrl);
    setInterval(updateUrl, 500);
    window.addEventListener('message', function(e) {
        if (!e.data) return;
        if (e.data.type === 'eager-preview:change:config') {
            window.location.reload();
        }
        if (e.data.type == 'eager-preview:reload') {
            window.location.reload();
        }
        if (e.data.type == 'eager-preview:inject') {
            var done = function() {
                window.parent.postMessage({
                    type: "eager-preview:injected",
                    content: e.data
                }, "*");
            }
            if (e.data.contentType == 'text/html') {
                var el = document.createElement('div');
                el.innerHTML = e.data.content;
                document.body.appendChild(el);
                var remaining = 0;
                var scripts = el.querySelectorAll('script');
                for (var i = 0; i < scripts.length; i++) {
                    if (scripts[i].getAttribute('src')) {
                        var node = cloneNode(scripts[i]);
                        remaining++;
                        node.onload = function() {
                            remaining--;
                            if (remaining == 0) {
                                done();
                            }
                        }
                        document.body.appendChild(node);
                    } else {
                        eval(scripts[i].innerHTML);
                    }
                }
                if (remaining == 0) {
                    done();
                }
            } else if (e.data.contentType == 'text/css') {
                if (e.data.src) {
                    var el = document.createElement('link');
                    el.onload = done;
                    el.setAttribute('rel', 'stylesheet');
                    el.setAttribute('href', e.data.src);
                } else {
                    var el = document.createElement('style');
                    el.innerHTML = e.data.content;
                    done();
                }
                document.head.appendChild(el);
            } else if (e.data.contentType == 'application/javascript') {
                if (e.data.src) {
                    var el = document.createElement('script');
                    el.setAttribute('src', e.data.src);
                    el.onload = done;
                    document.head.appendChild(el);
                } else {
                    eval(e.data.content);
                    done();
                }
            }
        }
    });
})();
window.Eager = window.Eager || {};
Eager.siteId = "preview";
Eager.config = {
    "injectApp": true,
    "initialInstall": true,
    "code": "27pv5hqzw4p"
};
! function e(t, n, o) {
    function i(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var l = "function" == typeof require && require;
                if (!s && l) return l(a, !0);
                if (r) return r(a, !0);
                throw new Error("Cannot find module '" + a + "'")
            }
            var u = n[a] = {
                exports: {}
            };
            t[a][0].call(u.exports, function(e) {
                var n = t[a][1][e];
                return i(n ? n : e)
            }, u, u.exports, e, t, n, o)
        }
        return n[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < o.length; a++) i(o[a]);
    return i
}({
    1: [function(e, t) {
        var n, o, i, r, a, s, l, u, c, d = {}.hasOwnProperty,
            m = function(e, t) {
                function n() {
                    this.constructor = e
                }
                for (var o in t) d.call(t, o) && (e[o] = t[o]);
                return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
            };
        r = e("./promise").Promise, o = e("./events").Evented, s = 1e6 * Math.random() | 0, u = e("debug")("bus:client(" + s + ")"), i = function(e) {
            function t() {
                this.ready = new r, document.body ? this.createIframe() : document.addEventListener("DOMContentLoaded", this.createIframe.bind(this))
            }
            return m(t, e), t.prototype.createIframe = function() {
                return this.frame = document.createElement("iframe"), this.frame.style.display = "none", this.addListener(this.frame), this.frame.src = "https://bus.eager.io#" + s, document.body.appendChild(this.frame)
            }, t.prototype.addListener = function(e) {
                return window.addEventListener("message", function(t) {
                    return function(n) {
                        var o, i;
                        if (o = n.data, i = n.source, i === e.contentWindow) switch (o.type) {
                            case "bus:ready":
                                return u("Ready"), t.ready.resolve();
                            case "bus:set":
                                return u("Received", o.key), t.trigger("set", o), t.trigger("set:" + o.key, o);
                            case "bus:clear":
                                return u("Cleared", o.key), t.trigger("clear", o), t.trigger("clear:" + o.key, o)
                        }
                    }
                }(this))
            }, t.prototype.send = function(e) {
                return this.ready.then(function(t) {
                    return function() {
                        return u("Sending", e), t.frame.contentWindow.postMessage(e, "*")
                    }
                }(this))
            }, t.prototype.client = function(e) {
                return new n(this, e)
            }, t
        }(o), n = function(e) {
            function t(e, t) {
                this.frame = e, this.siteId = t, this.frame.on("set", function(e) {
                    return function(n) {
                        var o, i;
                        return i = n.key.indexOf(":"), t = n.key.substring(0, i), o = n.key.substring(i + 1), t === e.siteId ? (n.key = o, e.trigger("set", n), e.trigger("set:" + o, n)) : void 0
                    }
                }(this)), this.frame.on("clear", function(e) {
                    return function(n) {
                        var o, i;
                        return i = n.key.indexOf(":"), t = n.key.substring(0, i), o = n.key.substring(i + 1), t === e.siteId ? (n.key = o, e.trigger("clear", n), e.trigger("clear:" + o, n)) : void 0
                    }
                }(this))
            }
            return m(t, e), t.prototype.set = function(e, t) {
                return e = "" + this.siteId + ":" + e, u("Setting", e, "to", t), this.frame.send({
                    type: "bus:set",
                    key: e,
                    value: t
                })
            }, t.prototype.clear = function(e) {
                return e = "" + this.siteId + ":" + e, u("Clearing", e), this.frame.send({
                    type: "bus:clear",
                    key: e
                })
            }, t.prototype.flash = function(e, t) {
                return e = "" + this.siteId + ":" + e, u("Flashing", e, "to", t), this.frame.send({
                    type: "bus:flash",
                    key: e,
                    value: t
                })
            }, t
        }(o), a = {}, c = null, l = function(e) {
            return a[e] || (c || (c = new i), a[e] = new n(c, e)), a[e]
        }, t.exports = {
            Client: n,
            Frame: i,
            createClient: l
        }
    }, {
        "./events": 2,
        "./promise": 3,
        debug: 4
    }],
    2: [function(e, t) {
        var n, o = [].slice;
        n = function() {
            function e() {}
            return e.prototype.on = function(e, t, n, o) {
                var i;
                return null == o && (o = !1), null == this.bindings && (this.bindings = {}), null == (i = this.bindings)[e] && (i[e] = []), this.bindings[e].push({
                    handler: t,
                    ctx: n,
                    once: o
                })
            }, e.prototype.once = function(e, t, n) {
                return this.on(e, t, n, !0)
            }, e.prototype.off = function(e, t) {
                var n, o, i;
                if (null != (null != (o = this.bindings) ? o[e] : void 0)) {
                    if (null == t) return delete this.bindings[e];
                    for (n = 0, i = []; n < this.bindings[e].length;) i.push(this.bindings[e][n].handler === t ? this.bindings[e].splice(n, 1) : n++);
                    return i
                }
            }, e.prototype.trigger = function() {
                var e, t, n, i, r, a, s, l, u;
                if (n = arguments[0], e = 2 <= arguments.length ? o.call(arguments, 1) : [], null != (s = this.bindings) ? s[n] : void 0) {
                    for (r = 0, u = []; r < this.bindings[n].length;) l = this.bindings[n][r], i = l.handler, t = l.ctx, a = l.once, i.apply(null != t ? t : this, e), u.push(a ? this.bindings[n].splice(r, 1) : r++);
                    return u
                }
            }, e
        }(), t.exports = {
            Evented: n
        }
    }, {}],
    3: [function(e, t) {
        var n;
        n = function() {
            function e() {
                this.ready = !1, this.waiting = []
            }
            return e.prototype.then = function(e) {
                return this.ready ? e() : this.waiting.push(e)
            }, e.prototype.resolve = function() {
                var e, t, n, o;
                if (this.ready = !0, null != this.waiting) {
                    for (o = this.waiting, t = 0, n = o.length; n > t; t++)(e = o[t])();
                    return this.waiting = []
                }
            }, e
        }(), t.exports = {
            Promise: n
        }
    }, {}],
    4: [function(e, t, n) {
        function o() {
            return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
        }

        function i() {
            var e = arguments,
                t = this.useColors;
            if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + n.humanize(this.diff), !t) return e;
            var o = "color: " + this.color;
            e = [e[0], o, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
            var i = 0,
                r = 0;
            return e[0].replace(/%[a-z%]/g, function(e) {
                "%%" !== e && (i++, "%c" === e && (r = i))
            }), e.splice(r, 0, o), e
        }

        function r() {
            return "object" == typeof console && "function" == typeof console.log && Function.prototype.apply.call(console.log, console, arguments)
        }

        function a(e) {
            try {
                null == e ? localStorage.removeItem("debug") : localStorage.debug = e
            } catch (t) {}
        }

        function s() {
            var e;
            try {
                e = localStorage.debug
            } catch (t) {}
            return e
        }
        n = t.exports = e("./debug"), n.log = r, n.formatArgs = i, n.save = a, n.load = s, n.useColors = o, n.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], n.formatters.j = function(e) {
            return JSON.stringify(e)
        }, n.enable(s())
    }, {
        "./debug": 5
    }],
    5: [function(e, t, n) {
        function o() {
            return n.colors[c++ % n.colors.length]
        }

        function i(e) {
            function t() {}

            function i() {
                var e = i,
                    t = +new Date,
                    r = t - (u || t);
                e.diff = r, e.prev = u, e.curr = t, u = t, null == e.useColors && (e.useColors = n.useColors()), null == e.color && e.useColors && (e.color = o());
                var a = Array.prototype.slice.call(arguments);
                a[0] = n.coerce(a[0]), "string" != typeof a[0] && (a = ["%o"].concat(a));
                var s = 0;
                a[0] = a[0].replace(/%([a-z%])/g, function(t, o) {
                    if ("%%" === t) return t;
                    s++;
                    var i = n.formatters[o];
                    if ("function" == typeof i) {
                        var r = a[s];
                        t = i.call(e, r), a.splice(s, 1), s--
                    }
                    return t
                }), "function" == typeof n.formatArgs && (a = n.formatArgs.apply(e, a));
                var l = i.log || n.log || console.log.bind(console);
                l.apply(e, a)
            }
            t.enabled = !1, i.enabled = !0;
            var r = n.enabled(e) ? i : t;
            return r.namespace = e, r
        }

        function r(e) {
            n.save(e);
            for (var t = (e || "").split(/[\s,]+/), o = t.length, i = 0; o > i; i++) t[i] && (e = t[i].replace(/\*/g, ".*?"), "-" === e[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")))
        }

        function a() {
            n.enable("")
        }

        function s(e) {
            var t, o;
            for (t = 0, o = n.skips.length; o > t; t++)
                if (n.skips[t].test(e)) return !1;
            for (t = 0, o = n.names.length; o > t; t++)
                if (n.names[t].test(e)) return !0;
            return !1
        }

        function l(e) {
            return e instanceof Error ? e.stack || e.message : e
        }
        n = t.exports = i, n.coerce = l, n.disable = a, n.enable = r, n.enabled = s, n.humanize = e("ms"), n.names = [], n.skips = [], n.formatters = {};
        var u, c = 0
    }, {
        ms: 6
    }],
    6: [function(e, t) {
        function n(e) {
            var t = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(e);
            if (t) {
                var n = parseFloat(t[1]),
                    o = (t[2] || "ms").toLowerCase();
                switch (o) {
                    case "years":
                    case "year":
                    case "y":
                        return n * c;
                    case "days":
                    case "day":
                    case "d":
                        return n * u;
                    case "hours":
                    case "hour":
                    case "h":
                        return n * l;
                    case "minutes":
                    case "minute":
                    case "m":
                        return n * s;
                    case "seconds":
                    case "second":
                    case "s":
                        return n * a;
                    case "ms":
                        return n
                }
            }
        }

        function o(e) {
            return e >= u ? Math.round(e / u) + "d" : e >= l ? Math.round(e / l) + "h" : e >= s ? Math.round(e / s) + "m" : e >= a ? Math.round(e / a) + "s" : e + "ms"
        }

        function i(e) {
            return r(e, u, "day") || r(e, l, "hour") || r(e, s, "minute") || r(e, a, "second") || e + " ms"
        }

        function r(e, t, n) {
            return t > e ? void 0 : 1.5 * t > e ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s"
        }
        var a = 1e3,
            s = 60 * a,
            l = 60 * s,
            u = 24 * l,
            c = 365.25 * u;
        t.exports = function(e, t) {
            return t = t || {}, "string" == typeof e ? n(e) : t.long ? i(e) : o(e)
        }
    }, {}],
    7: [function(e, t) {
        var n, o;
        n = e("ayepromise"), o = function(e) {
            var t, o, i;
            return t = n.defer(), i = "https://api.eager.io/apps/" + e, o = new XMLHttpRequest, o.open("GET", i, !0), o.addEventListener("load", function() {
                var e;
                try {
                    return t.resolve(JSON.parse(o.response))
                } catch (n) {
                    return e = n, t.reject(e)
                }
            }), o.addEventListener("error", t.reject), o.send(), t.promise
        }, t.exports = {
            loadApp: o
        }
    }, {
        ayepromise: 20
    }],
    8: [function(e) {
        var t, n, o, i, r, a, s, l, u, c, d, m, p, b, f, g;
        i = e("./views/previewInfo").PreviewInfoView, o = e("./views/placementInfo").PlacementInfoView, n = e("./placement/view").PlaceView, u = e("./api/app").loadApp, a = e("ayepromise"), t = e("../bower_components/bus/coffee/client"), c = void 0, d = void 0, p = null, m = null, r = null, s = t.createClient(Eager.siteId), f = function() {
            var e;
            return (null != (e = window.Eager.installs) ? e.preview : void 0) && null != r ? r.then(function(e) {
                return p = new i({
                    app: e
                }), p.render()
            }) : void 0
        }, b = function() {
            return d.on("start", function() {
                return r ? r.then(function(e) {
                    return m = new o({
                        app: e,
                        cancelHandler: function() {
                            return d.stop(), m.destroy()
                        }
                    }), m.render()
                }) : void console.error("Placement without app info")
            })
        }, l = function() {
            var e, t, o;
            d = new n, t = !0;
            try {
                window.self === window.top && (t = !1)
            } catch (i) {}
            return (null != (o = window.Eager.installs) ? o.preview : void 0) && ("local" === Eager.installs.preview.appId ? (e = a.defer(), e.resolve({
                id: "local",
                title: "Local App"
            }), r = e.promise) : r = u(Eager.installs.preview.appId)), t || f(), b(), d.on("success", function(e) {
                var t;
                return t = e.selector, s.flash("placement", {
                    selector: t
                }), d.stop(), null != m && m.destroy(), window.opener ? window.close() : void 0
            }), d.on("stop", function() {
                return s.clear("placing")
            }), s.on("set:placing", g), s.on("set:placement", function() {
                return d.stop(), null != m && m.destroy(), window.opener ? window.close() : void 0
            })
        }, g = function() {
            return d.render(), d.start()
        }, document.addEventListener("DOMContentLoaded", l)
    }, {
        "../bower_components/bus/coffee/client": 1,
        "./api/app": 7,
        "./placement/view": 12,
        "./views/placementInfo": 18,
        "./views/previewInfo": 19,
        ayepromise: 20
    }],
    9: [function(e, t) {
        var n, o, i, r, a, s, l, u, c;
        c = e("../utils/general"), r = c.extend, i = c.each, l = e("../utils/ui"), a = e("../utils/reset"), o = e("../utils/brand"), u = e("./valid"), s = e("./selector"), n = function() {
            function e(e) {
                this.mediator = e.mediator
            }
            return e.prototype.render = function() {
                return this.placeholder = l.createElement(), this.placeholder.setAttribute("data-eager-placement-potential-selector", !0), this.placeholder.setAttribute("style", l.inlineStyles(r({}, a.ELEMENT, {
                    position: "absolute",
                    "z-index": 1e9,
                    "background-color": o.pink,
                    background: o.pink,
                    color: "#fff",
                    padding: ".25em .4em",
                    "padding-top": ".25em",
                    "padding-right": ".4em",
                    "padding-bottom": ".25em",
                    "padding-left": ".4em",
                    "line-height": "1.4em",
                    "pointer-events": "none",
                    left: "0",
                    right: "auto",
                    bottom: "100%",
                    height: "23px",
                    "font-family": "Monaco, 'Bitstream Vera Sans Mono', 'Lucida Console', Terminal, monospace",
                    "font-size": "12px",
                    "max-width": "85%",
                    overflow: "hidden",
                    "overflow-x": "hidden",
                    "overflow-y": "hidden",
                    "white-space": "nowrap",
                    "text-overflow": "ellipsis"
                })))
            }, e.prototype.setElement = function(e) {
                return this.reset(), (e = u.findInParents(e)) ? (this.mediator.trigger("potential", {
                    element: e
                }), e.setAttribute("data-eager-placement-potential-container", !0), this.placeholder.innerHTML = s.ellipsize(s.generate(e)), e.appendChild(this.placeholder)) : void 0
            }, e.prototype.reset = function() {
                return i(document.querySelectorAll("[data-eager-placement-potential-container]"), function(e) {
                    return e.removeAttribute("data-eager-placement-potential-container")
                }), i(document.querySelectorAll("[data-eager-placement-potential-selector]"), function(e) {
                    return l.removeElement(e)
                })
            }, e.prototype.remove = function() {
                return l.removeElement(this.placeholder)
            }, e.prototype.show = function() {
                return this.setElement(this.placeholder.parentNode)
            }, e.prototype.hide = function() {
                return this.reset()
            }, e
        }(), t.exports = {
            PotentialView: n
        }
    }, {
        "../utils/brand": 13,
        "../utils/general": 15,
        "../utils/reset": 16,
        "../utils/ui": 17,
        "./selector": 10,
        "./valid": 11
    }],
    10: [function(e, t) {
        var n, o;
        o = function(e) {
            var t, n, o, i, r, a, s;
            if (e === document.documentElement && (e = document.body), e === document.body) return "body";
            if (t = e.getAttribute("id")) return "#" + t;
            for (i = "", n = e; n && n.parentNode && n !== document.documentElement;) a = n.tagName.toLowerCase(), n === document.body ? r = a : (null != (s = n.className) ? s.length : void 0) ? r = "." + n.className.trim().split(/\s+/).join(".") : (r = a, "body" !== a && (o = Array.prototype.slice.call(n.parentNode.children).indexOf(n), r += 0 === o ? ":first-child" : o === n.parentNode.children.length - 1 ? ":last-child" : ":nth-child(" + (o + 1) + ")")), i = "" === i ? r : "" + r + " > " + i, n = n.parentNode;
            return i
        }, n = function(e) {
            var t, n, o, i, r, a, s;
            if (e.length < 100) return e;
            if (r = e.split(" > "), r.length > 4)
                for (i = "", o = "", t = a = 0, s = Math.floor(r.length / 2);
                    (s >= 0 ? s > a : a > s) && (i += "" + (t > 0 ? " > " : "") + r[t], o = "" + r[r.length - (1 + t)] + (t > 0 ? " > " : "") + o, n = "" + i + " > ... > " + o, n.length < 100); t = s >= 0 ? ++a : --a) e = n;
            return e.length > 100 ? "" + e.substr(0, 100) + "..." : e
        }, t.exports = {
            generate: o,
            ellipsize: n
        }
    }, {}],
    11: [function(e, t) {
        var n, o, i, r, a, s;
        a = e("./selector"), r = e("../utils/reset"), s = e("../utils/ui"), n = e("../utils/general").extend, o = function(e) {
            return e ? i(e) ? e : o(e.parentNode) : null
        }, i = function(e) {
            var t, o, i, l, u, c, d, m;
            if (e.hasAttribute("data-eager-cancel-button")) return !1;
            if (e.hasAttribute("data-eager-placement")) return !1;
            if ("a" === e.tagName.toLowerCase()) return !1;
            if ("area" === (u = e.tagName.toLowerCase()) || "base" === u || "br" === u || "col" === u || "command" === u || "embed" === u || "hr" === u || "img" === u || "input" === u || "keygen" === u || "link" === u || "meta" === u || "param" === u || "source" === u || "track" === u || "wbr" === u || "video" === u || "iframe" === u) return !1;
            if (o = getComputedStyle(e), "hidden" === o.overflow && "auto" !== (c = e.style.minHeight) && "" !== c && "auto" !== (d = e.style.height) && "" !== d) return !1;
            if (parseInt(o.width, 10) < 200) return !1;
            if ("block" !== (m = o.display) && "flex" !== m) return !1;
            if (!a.generate(e)) return !1;
            for (l = !1, i = e; i.parentNode;) {
                if ("hidden" === getComputedStyle(i).overflow) {
                    l = !0;
                    break
                }
                i = i.parentNode
            }
            if (l) {
                if (t = s.createElement(), t.innerHTML = "&nbsp;", t.setAttribute("data-eager-placement-test", !0), t.setAttribute("style", s.inlineStyles(n({}, r.ELEMENT, {
                        height: "10px",
                        width: "100%",
                        clear: "both",
                        position: "relative",
                        "z-index": 5e3
                    }))), e.appendChild(t), e.clientHeight, t.offsetTop >= parseInt(getComputedStyle(e).height, 10)) return s.removeElement(t), !1;
                s.removeElement(t)
            }
            return !0
        }, t.exports = {
            isPlaceable: i,
            findInParents: o
        }
    }, {
        "../utils/general": 15,
        "../utils/reset": 16,
        "../utils/ui": 17,
        "./selector": 10
    }],
    12: [function(e, t) {
        var n, o, i, r, a, s, l, u, c, d = function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            },
            m = {}.hasOwnProperty,
            p = function(e, t) {
                function n() {
                    this.constructor = e
                }
                for (var o in t) m.call(t, o) && (e[o] = t[o]);
                return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
            };
        u = e("./selector"), s = e("./valid"), c = e("../utils/ui"), l = e("../utils/reset"), r = e("../utils/brand"), a = e("../utils/general").extend, n = e("../utils/events").Evented, i = e("./potential").PotentialView, o = function(e) {
            function t() {
                this.doPlacement = d(this.doPlacement, this), this.placing = !1, this.addStyle(), this.bindEvents(), this.mediator = new n
            }
            return p(t, e), t.prototype.render = function() {}, t.prototype.bindEvents = function() {
                var e, t;
                return e = void 0, t = void 0, window.addEventListener("mousemove", function(n) {
                    return function(o) {
                        return n.placing ? (e !== o.target && (clearTimeout(t), t = setTimeout(function() {
                            return n.showPotential(o.target)
                        }, 35)), e = o.target) : void 0
                    }
                }(this)), window.addEventListener("click", function(e) {
                    return function(t) {
                        return e.placing ? (t.stopPropagation(), t.preventDefault(), e.attemptPlacement(t.target)) : void 0
                    }
                }(this))
            }, t.prototype.addStyle = function() {
                return document.body.insertAdjacentHTML("beforeEnd", '<style data-eager="true">\n  *[data-eager-placement-potential-container] {\n    position: relative;\n    cursor: pointer !important;\n    -webkit-box-shadow: inset 0 0 0 3px ' + r.pink + ", inset 0 0 0 99999px rgba(" + r.pinkRGB + ", .07) !important;\n    -moz-box-shadow: inset 0 0 0 3px " + r.pink + ", inset 0 0 0 99999px rgba(" + r.pinkRGB + ", .07) !important;\n    box-shadow: inset 0 0 0 3px " + r.pink + ", inset 0 0 0 99999px rgba(" + r.pinkRGB + ", .07) !important\n  }\n\n  eager[data-eager-placement-potential-selector] {\n    display: none !important\n  }\n\n  *[data-eager-placement-potential-container] > eager[data-eager-placement-potential-selector] {\n    display: block !important\n  }\n</style>")
            }, t.prototype.showPotential = function(e) {
                return this.potential || (this.potential = new i({
                    mediator: this.mediator
                }), this.potential.render()), this.potential.setElement(e), this.potential.show()
            }, t.prototype.hidePotential = function() {
                var e;
                return null != (e = this.potential) ? e.hide() : void 0
            }, t.prototype.start = function() {
                return this.placing = !0, this.trigger("start")
            }, t.prototype.finish = function(e) {
                var t;
                return this.stop(), t = u.generate(e), this.trigger("success", {
                    element: e,
                    selector: t
                })
            }, t.prototype.stop = function() {
                return this.placing = !1, this.hidePotential(), this.trigger("stop")
            }, t.prototype.attemptPlacement = function(e) {
                return (e = s.findInParents(e)) ? (this.doPlacement(e), this.finish(e)) : void 0
            }, t.prototype.doPlacement = function(e) {
                return e === document.documentElement && (e = document.body), this.trigger("placement", {
                    element: e
                })
            }, t
        }(n), t.exports = {
            PlaceView: o
        }
    }, {
        "../utils/brand": 13,
        "../utils/events": 14,
        "../utils/general": 15,
        "../utils/reset": 16,
        "../utils/ui": 17,
        "./potential": 9,
        "./selector": 10,
        "./valid": 11
    }],
    13: [function(e, t) {
        t.exports = {
            pink: "#e90f92",
            pinkRGB: "233, 15, 146"
        }
    }, {}],
    14: [function(e, t) {
        var n, o = [].slice;
        n = function() {
            function e() {}
            return e.prototype.on = function(e, t, n, o) {
                var i;
                return null == o && (o = !1), null == this.bindings && (this.bindings = {}), null == (i = this.bindings)[e] && (i[e] = []), this.bindings[e].push({
                    handler: t,
                    ctx: n,
                    once: o
                })
            }, e.prototype.once = function(e, t, n) {
                return this.on(e, t, n, !0)
            }, e.prototype.off = function(e, t) {
                var n, o, i;
                if (null != (null != (o = this.bindings) ? o[e] : void 0)) {
                    if (null == t) return delete this.bindings[e];
                    for (n = 0, i = []; n < this.bindings[e].length;) i.push(this.bindings[e][n].handler === t ? this.bindings[e].splice(n, 1) : n++);
                    return i
                }
            }, e.prototype.trigger = function() {
                var e, t, n, i, r, a, s, l, u;
                if (n = arguments[0], e = 2 <= arguments.length ? o.call(arguments, 1) : [], null != (s = this.bindings) ? s[n] : void 0) {
                    for (r = 0, u = []; r < this.bindings[n].length;) l = this.bindings[n][r], i = l.handler, t = l.ctx, a = l.once, i.apply(null != t ? t : this, e), u.push(a ? this.bindings[n].splice(r, 1) : r++);
                    return u
                }
            }, e
        }(), t.exports = {
            Evented: n
        }
    }, {}],
    15: [function(e, t) {
        var n, o, i = [].slice;
        o = function() {
            var e, t, n, o, r, a, s;
            for (o = arguments[0], n = 2 <= arguments.length ? i.call(arguments, 1) : [], null == o && (o = {}), a = 0, s = n.length; s > a; a++)
                if (t = n[a])
                    for (e in t) r = t[e], t.hasOwnProperty(e) && (o[e] = r);
            return o
        }, n = function(e, t) {
            return Array.prototype.forEach.call(e, t)
        }, t.exports = {
            extend: o,
            each: n
        }
    }, {}],
    16: [function(e, t) {
        var n, o, i;
        i = e("./general").extend, n = {
            "z-index": "auto",
            zoom: 1
        }, o = i({}, n, {
            position: "fixed",
            "z-index": 1e9,
            top: 0,
            left: 0,
            width: 0,
            height: 0
        }), t.exports = {
            IFRAME: o,
            ELEMENT: n
        }
    }, {
        "./general": 15
    }],
    17: [function(e, t) {
        var n, o, i, r, a;
        a = e("./reset"), i = function(e) {
            var t, n, o;
            n = "";
            for (t in e) o = e[t], n += "" + t + ":" + o + "!important;";
            return n
        }, r = function(e) {
            var t;
            return null != (t = e.parentNode) ? t.removeChild(e) : void 0
        }, o = function() {
            var e;
            return e = document.createElement("iframe"), e.setAttribute("data-eager-element", !0), e.setAttribute("style", i(a.IFRAME)), e.setAttribute("allowTransparency", !0), e
        }, n = function() {
            var e;
            return e = document.createElement("eager"), e.setAttribute("data-eager-element", !0), e
        }, t.exports = {
            inlineStyles: i,
            removeElement: r,
            createIframe: o,
            createElement: n
        }
    }, {
        "./reset": 16
    }],
    18: [function(e, t) {
        var n, o, i, r, a;
        a = e("../utils/ui"), r = e("../utils/reset"), o = e("../utils/brand"), i = e("../utils/general").extend, n = function() {
            function e(e) {
                this.options = null != e ? e : {}
            }
            return e.prototype.render = function() {
                return this.el = a.createIframe(), document.body.appendChild(this.el), this.el.addEventListener("load", this.show.bind(this)), this.el.setAttribute("src", "//embedded.eager.io/pages/placement-info/?appName=" + decodeURIComponent(this.options.app.title)), window.addEventListener("message", function(e) {
                    return function(t) {
                        return "eager-placement-info:cancel:click" === t.data ? e.options.cancelHandler() : void 0
                    }
                }(this))
            }, e.prototype.hide = function() {
                var e;
                return null != (e = this.el) && e.setAttribute("style", a.inlineStyles(r.IFRAME)), this
            }, e.prototype.show = function() {
                return this.el || this.render(), this.el.setAttribute("style", a.inlineStyles(i({}, r.IFRAME, {
                    top: 0,
                    left: "auto",
                    right: "auto",
                    background: "pink",
                    margin: "auto",
                    "margin-left": "auto",
                    "margin-right": "auto",
                    height: "48px",
                    width: "100%",
                    opacity: ".97"
                }))), this
            }, e.prototype.destroy = function() {
                return null != this.el ? a.removeElement(this.el) : void 0
            }, e
        }(), t.exports = {
            PlacementInfoView: n
        }
    }, {
        "../utils/brand": 13,
        "../utils/general": 15,
        "../utils/reset": 16,
        "../utils/ui": 17
    }],
    19: [function(e, t) {
        var n, o, i, r, a;
        a = e("../utils/ui"), r = e("../utils/reset"), o = e("../utils/brand"), i = e("../utils/general").extend, n = function() {
            function e(e) {
                this.options = null != e ? e : {}
            }
            return e.prototype.render = function() {
                return this.el = a.createIframe(), document.body.appendChild(this.el), this.el.addEventListener("load", this.show.bind(this)), this.el.setAttribute("src", "//embedded.eager.io/pages/preview-info/?appName=" + decodeURIComponent(this.options.app.title))
            }, e.prototype.hide = function() {
                var e;
                return null != (e = this.el) && e.setAttribute("style", a.inlineStyles(r.IFRAME)), this
            }, e.prototype.show = function() {
                return this.el || this.render(), this.el.setAttribute("style", a.inlineStyles(i({}, r.IFRAME, {
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: "auto",
                    "margin-left": "auto",
                    "margin-right": "auto",
                    height: "48px",
                    width: "100%",
                    "pointer-events": "none",
                    opacity: ".97"
                }))), this
            }, e.prototype.destroy = function() {
                return null != this.el ? a.removeElement(this.el) : void 0
            }, e
        }(), t.exports = {
            PreviewInfoView: n
        }
    }, {
        "../utils/brand": 13,
        "../utils/general": 15,
        "../utils/reset": 16,
        "../utils/ui": 17
    }],
    20: [function(e, t, n) {
        ! function(e, o) {
            "object" == typeof n ? t.exports = o() : e.ayepromise = o()
        }(this, function() {
            "use strict";
            var e = {},
                t = function() {
                    var e = !1;
                    return function(t) {
                        return function() {
                            e || (e = !0, t.apply(null, arguments))
                        }
                    }
                },
                n = function(e) {
                    var t = e && e.then;
                    return "object" == typeof e && "function" == typeof t ? function() {
                        return t.apply(e, arguments)
                    } : void 0
                },
                o = function(t, n) {
                    var o = e.defer(),
                        i = function(e, t) {
                            setTimeout(function() {
                                var n;
                                try {
                                    n = e(t)
                                } catch (i) {
                                    return void o.reject(i)
                                }
                                n === o.promise ? o.reject(new TypeError("Cannot resolve promise with itself")) : o.resolve(n)
                            }, 1)
                        },
                        a = function(e) {
                            t && t.call ? i(t, e) : o.resolve(e)
                        },
                        s = function(e) {
                            n && n.call ? i(n, e) : o.reject(e)
                        };
                    return {
                        promise: o.promise,
                        handle: function(e, t) {
                            e === r ? a(t) : s(t)
                        }
                    }
                },
                i = 0,
                r = 1,
                a = 2;
            return e.defer = function() {
                var e, s = i,
                    l = [],
                    u = function(t, n) {
                        s = t, e = n, l.forEach(function(t) {
                            t.handle(s, e)
                        }), l = null
                    },
                    c = function(e) {
                        u(r, e)
                    },
                    d = function(e) {
                        u(a, e)
                    },
                    m = function(t, n) {
                        var r = o(t, n);
                        return s === i ? l.push(r) : r.handle(s, e), r.promise
                    },
                    p = function(e) {
                        var n = t();
                        try {
                            e(n(b), n(d))
                        } catch (o) {
                            n(d)(o)
                        }
                    },
                    b = function(e) {
                        var t;
                        try {
                            t = n(e)
                        } catch (o) {
                            return void d(o)
                        }
                        t ? p(t) : c(e)
                    },
                    f = t();
                return {
                    resolve: f(b),
                    reject: f(d),
                    promise: {
                        then: m,
                        fail: function(e) {
                            return m(null, e)
                        }
                    }
                }
            }, e
        })
    }, {}]
}, {}, [8]);