/**
 * Author :  neron
 * time   : 2016/2/17
 * description: ...
 */
/*! motion v0.0.0 | (c) 2014, 2015/03/19 | loader | motion Foundation, Inc. */
!function () {
    !function () {
        !function () {
            if (!window.Motion) {
                var a = {
                    version: "1.1", add: function (a, b) {
                        for (var c = window, d = arguments.callee, e = null, f = (/^([\w\.]+)(?:\:([\w\.]+))?\s*$/.test(a), RegExp.$1.split(".")), g = RegExp.$2.split("."), a = f.pop(), h = /[A-Z]/.test(a.substr(0, 1)), i = function () {
                            var a = arguments.callee.prototype.init;
                            "function" == typeof a && arguments.callee.caller != d && a && a.apply(this, arguments)
                        }, j = 0; j < f.length; j++) {
                            var k = f[j];
                            c = c[k] || (c[k] = {})
                        }
                        if ("" != g[0]) {
                            e = window;
                            for (var j = 0; j < g.length; j++)if (e = e[g[j]], !e) {
                                e = null;
                                break
                            }
                        }
                        h && "function" == typeof b ? (e && (i.prototype = new e, i.prototype.superClass = e), c[a] = i, i.prototype.constructor = i, b.call(c[a].prototype)) : c[a] = b
                    }
                };
                window.Motion = window.mo = a
            }
        }()
    }(), function () {
        Motion.add("mo.Base", function () {
            {
                var a = this;
                this.constructor
            }
            a.constructor = function () {
            }, a.on = function () {
                return box = Zepto(this), box.on.apply(box, arguments)
            }, a.off = function () {
                return box = Zepto(this), box.off.apply(box, arguments)
            }, a.trigger = function () {
                var a = Zepto(this);
                return a.triggerHandler.apply(a, arguments)
            }
        })
    }(), function () {
        Motion.add("mo.Loader:mo.Base", function () {
            var a = this, b = {
                empty: function () {
                }, imgLoader: function (a, b) {
                    var c = new Image, d = new Date;
                    c.onload = c.onerror = function () {
                        b(a, c, new Date - d), c.onload = null
                    }, c.src = a
                }, jsLoader: function () {
                    var a = document.getElementsByTagName("script")[0], b = a.parentNode, c = /ded|co/, d = "onload", e = "onreadystatechange", f = "readyState";
                    return function (g, h, i) {
                        i = i || "gb2312";
                        var j = document.createElement("script"), k = new Date;
                        j.charset = i, j[d] = j[e] = function () {
                            (!this[f] || c.test(this[f])) && (j[d] = j[e] = null, h && h(g, j, new Date - k), j = null)
                        }, j.async = !0, j.src = g, b.insertBefore(j, a)
                    }
                }(), cssLoader: function (a, b) {
                    var c = document.head || document.getElementsByTagName("head")[0], d = new Date;
                    node = document.createElement("link"), node.rel = "stylesheet", node.href = a, c.appendChild(node), b && b(a, node, new Date - d)
                }, audioLoader: function (a, b) {
                    var c = new Audio, d = new Date;
                    $(c).bind("canplaythrough", function () {
                        b(a, c, new Date - d)
                    }), c.src = a, c.load()
                }, getExt: function (a) {
                    return a.match(/\.([^\.]*)$/)[0].substr(1).match(/^[a-zA-Z0-9]+/)[0]
                }, getType: function (a) {
                    var c = b.getExt(a), d = {
                        img: ["png", "jpg", "gif"],
                        css: ["css"],
                        js: ["js"],
                        audio: ["mp3", "ogg", "wav"]
                    };
                    for (var e in d)if (d[e].indexOf(c) > -1)return e;
                    return !1
                }
            }, c = this.constructor;
            a.constructor = function (a, b) {
                a && this.init(a, b)
            }, c.config = {
                onLoading: b.empty,
                onComplete: b.empty,
                loadType: 0,
                minTime: 0,
                dataAttr: "preload"
            }, a.init = function (a, d) {
                var e = this;
                if ("function" == typeof d) {
                    var f = d;
                    d = {onComplete: f}
                }
                e.config = Zepto.extend(!0, {}, c.config, d);
                var d = e.config;
                a = [].concat(a);
                var g = {}, h = Array.prototype.slice.call(document.querySelectorAll("[data-" + d.dataAttr + "]"));
                Zepto(h).each(function (b, c) {
                    var e = Zepto(c), f = e.attr("data-" + d.dataAttr);
                    g[f] ? g[f].push(c) : (g[f] = [c], a.indexOf(f) < 0 && a.push(f))
                }), d.event && e.on(d.event);
                var i = a.length, j = 0, k = (new Date).getTime(), l = function (a) {
                    g[a] && Zepto.each(g[a], function (b, c) {
                        c.removeAttribute("data-" + d.dataAttr);
                        var e = c.tagName.toLowerCase();
                        switch (e) {
                            case"link":
                                c.href = a;
                                break;
                            case"img":
                            case"script":
                            case"video":
                                c.src = a;
                                break;
                            default:
                                c.style.backgroundImage = "url(" + a + ")"
                        }
                    })
                }, m = function (a, b, c, f) {
                    var g = function () {
                        if (d.onLoading(++j, i, a, b), e.trigger("loading", [j, i, a, b]), l(a), f([j, i, a, b]), j == i) {
                            var c = (new Date).getTime() - k;
                            d.onComplete(c), e.trigger("complete", [c])
                        }
                    }, h = d.minTime - c;
                    h > 0 ? setTimeout(g, h) : g()
                };
                if (a.length) {
                    var n = function (a, c, d) {
                        var e = b.getType(a), d = d || function () {
                            }, f = b[e + "Loader"];
                        void 0 === f ? c(a) : f(a, function () {
                            var a = Array.prototype.slice.call(arguments, 0);
                            a.push(d), c.apply(null, a)
                        })
                    };
                    if (1 == d.loadType) {
                        var o = 0;
                        !function () {
                            var b = arguments.callee;
                            n(a[o], function () {
                                m.apply(null, arguments)
                            }, function () {
                                o++, a[o] && b()
                            })
                        }()
                    } else Zepto.each(a, function (a, b) {
                        n(b, m)
                    })
                } else d.onComplete(0), e.trigger("complete", [0])
            }
        })
    }()
}();
/*  |xGv00|1169cae6445374439101ed1a03d21bd1 */