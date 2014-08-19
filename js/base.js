//定义域
var GLOBAL = {};
GLOBAL.namespace = function (str) {
    var arr = str.split('.'), o = GLOBAL;
    for (var i = (arr[0] == 'GLOBAL') ? 1 : 0; i < arr.length; i++) {
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
    }
};
//获取DOM样式--By programmer JhoneLee
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    }
    else
        return getComputedStyle(obj, null)[name];

}

//获取document的scrollTop--By promgrammer JhoneLee
function getScrollTop() {
    return document.body.scrollTop || document.documentElement.scrollTop;
}

//设置document的scrollTop--By programmer JhoneLee
function setScrollTop(number) {
    document.body.scrollTop = number;
    document.documentElement.scrollTop = number;
}
//为Array对象添加remove方法，可以根据下标删除元素--By programmer JhoneLee
Array.prototype.remove = function (index) {
    for (var i = 0; i < this.length; i++) {
        if (i == index) {
            if (index + 1 != this.length) {
                this[i] = this[i + 1];
                for (var j = i + 1; j < this.length; j++) {
                    if (j + 1 < this.length)
                        this[j] = this[j + 1]
                }
                this.length -= 1;
                break;
            }

        }
        else if (index == this.length - 1) {
            this.length -= 1;
            break;
        }
    }
};
//js让图片倾斜一定角度特效--By programmer JhoneLee
GLOBAL.namespace('Base.rotate');
GLOBAL.Base.rotate.ua= navigator.userAgent;
GLOBAL.Base.rotate.isIE = /msie/i.test(GLOBAL.Base.rotate.ua) && !window.opera;
GLOBAL.Base.rotate.sinDeg = 0;
GLOBAL.Base.rotate.cosDeg = 0;
function run(angle, DOMobj) {
    if (GLOBAL.Base.rotate.isIE) { // IE
        GLOBAL.Base.rotate.cosDeg = Math.cos(angle * Math.PI / 180);
        GLOBAL.Base.rotate.sinDeg = Math.sin(angle * Math.PI / 180);
        with (DOMobj.filters.item(0)) {
            M11 = M22 = GLOBAL.Base.rotate.cosDeg; M12 = -(M21 = GLOBAL.Base.rotate.sinDeg);
        }
        DOMobj.style.top = (DOMobj.clientHeight - DOMobj.offsetHeight) / 2 + 'px';
        DOMobj.style.left = (DOMobj.clientWidth - DOMobj.offsetWidth) / 2 + 'px';
    } else if (DOMobj.style.MozTransform !== undefined) {  // Mozilla
        DOMobj.style.MozTransform = 'rotate(' + angle + 'deg)';
    } else if (DOMobj.style.OTransform !== undefined) {   // Opera
        DOMobj.style.OTransform = 'rotate(' + angle + 'deg)';
    } else if (DOMobj.style.webkitTransform !== undefined) { // Chrome Safari

        DOMobj.style.webkitTransform = 'rotate(' + angle + 'deg)';
    } else {
        DOMobj.style.transform = "rotate(" + angle + "deg)";
    }
}

//获取浏览器信息
function UserAgent() {
    var Sys = {};
    var ua = GLOBAL.Base.rotate.ua.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
              (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
              (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
              (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
              (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    return Sys;
}

//Ajax获取字符串
function Ajax(Method,url,funcSucc,funcFalse) {
    if (XMLHttpRequest)
        var oAjax = new XMLHttpRequest();
    else {
        var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    oAjax.open(Method, url, true);
    oAjax.send();
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {
            if (oAjax.status == 200) {
                var str = oAjax.responseText;
                funcSucc(str);
            }
            else {
                funcFalse();
            }
        }
    };
    
}