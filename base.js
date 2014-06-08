// JavaScript Document
//***********js语言操作*******************
//字符串去回车去空格      
String.prototype.strFormat = function () {
    var reg = /\r\n|\s/g;
    return this.replace(reg, '');
};


//**********DOM操作*****************
//返回通俗的Node类型
function getNodeType(obj) {
    var myNodeType = {
        '1': 'element对象,nodeValue=null,nodeName=标签名（大写）',
        '2': '属性对象,nodeValue=属性值,nodeName=属性名称（大写）',
        '3': '文本节点,nodeValue=文本,nodeName=#text',
        '4': 'XML CDATA区域,nodeValue=区域内容,nodeName=#cdata-section',
        '5': 'XML实体引用',
        '6': 'XML实体',
        '7': 'XML处理指令',
        '8': '注释节点,nodeValue=注释的内容,nodeName=#comment',
        '9': 'document文档类型,nodeValue=null,nodeName=#document',
        '10': 'docType类型,nodeValue=null,nodeName=doctype内容',
        '11': '文档片段,nodeValue=null,nodeName=#document-fragment',
        '12': 'XML中非 XML 数据的格式'
    };
    return myNodeType[obj.nodeType];
}
//node类型快速取得
window.NODETYPE = {
   'ELEMENT':1,
   'ATTRIBUTE':2,
   'TEXT':3,
   'XML_CDATA':4,
   'XML_ENTITY_R':5,
   'XML_ENTITY':6,
   'XML_PRO_INS':7,
   'COMMENT':8,
   'DOCUMENT':9,
   'DOCTYPE':10,
   'DOC_FRAGMENT':11,
   'NXML_DATA':12
};
//获取元素中element节点集合
function getElementNodes(obj) {
    var arr = [];
    var son = obj.childNodes;
    var len = son.length;
    for (var i = 0; i < len; i++) {
        if (son[i].nodeType == '1') {
            arr.push(son[i]);
        }
    }
    return arr;
}
//返回元素的样式值
function getStyle(obj, styleName) {
    if (obj.currentStyle) {
        getStyle = function (obj, styleName) {
            return obj.currentStyle[styleName];
        }
        return obj.currentStyle[styleName];
    }
    else {
        getStyle = function (obj, styleName) {
            return getComputedStyle(obj, null)[styleName];
        }
        return getComputedStyle(obj, null)[styleName];
    }
}
//设置节点样式
function setStyle(obj, jsonStyle) {
    for (var item in jsonStyle) {
        obj.style[item] = jsonStyle[item];
    }
}
//返回DOM元素在页面中的绝对位置
function getPosition(obj) {
    var pos = { x: 0, y: 0 };
    while (obj.parentNode && obj.tagName != 'HTML') {
        if (!obj.currentStyle && obj.parentNode.tagName != 'HTML') {
            pos.x += parseInt(getComputedStyle(obj.parentNode, null)['borderLeftWidth']);
            pos.y += parseInt(getComputedStyle(obj.parentNode, null)['borderTopWidth']);
        }
        pos.x += obj.offsetLeft;
        pos.y += obj.offsetTop;
        obj = obj.parentNode;
    }
    return pos;
}
/*创建script标签*/
function createScript(url,code) {
    var oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    if (url) {
        oScript.src = url;
    }
    else if (code) {
        oScript.text = code;
    }
    return oScript;
}

//************DOM事件*****************
//事件绑定对象
function addEvent(obj, type, handle) {
    if (obj.addEventListener) {
        obj[type + handle] = handle;
        obj.addEventListener(type, obj[type + handle], false);
        addEvent = function (obj, type, handle) {
            obj[type + handle] = handle;
            obj.addEventListener(type, obj[type + handle], false);
        }
    }
    else {
        obj[type + handle] = function () { handle.call(obj); };
        obj.attachEvent('on' + type, obj[type + handle]);
        addEvent = function (obj, type, handle) {
            obj[type + handle] = function () { handle.call(obj); };
            obj.attachEvent('on' + type, obj[type + handle]);
        }
    }
}
//取消事件绑定
function removeEvent(obj, type, handle) {
    var hand = obj[type + handle];
    if (obj.removeEventListener) {
        obj.removeEventListener(type, hand, false);
        removeEvent = function (obj, type, handle) {
            var hand = obj[type + handle];
            obj.removeEventListener(type, hand, false);
        };
    }
    else {
        obj.detachEvent('on' + type, hand);
        removeEvent = function (obj, type, handle) {
            var hand = obj[type + handle];
            obj.detachEvent('on' + type, hand);
        }
    }
}
//禁止事件冒泡
function preventBubble(obj) {
    if (obj.stopProgation) {
        preventBubble = function (e) { e.stopProgation() };
        obj.stopProgation();
    }
    else {
        preventBubble = function (e) { e.cancelBubble = true; }
        obj.cancelBubble = true;
    }
}
//获得事件对象的target
function getTarget(Event) {
    if (Event.srcElement) {
        getTarget = function (e) { return e.srcElement; }
        return Event.srcElement;
    }
    else {
        getTarget = function (e) { return e.target; }
        return Event.target;
    }
}
//创建事件委托对象
function createDelegateObj(root, type, handle, target) {
    this.root = root;
    this.type = type;
    this.handle = handle;
    this.target = target;
    this.tarHandle = [];
    this.baHandle = [];
}
createDelegateObj.prototype = {
    bindAllOf: function () {
        var _this = this;

        this.baHandle.push(this.handle);
        this.root['on' + this.type] = function (e) {
            var e = e || event;
            for (var i = 0; i < _this.baHandle.length; i++) {
                _this.baHandle[i].call(getTarget(e));
            }
        };
    },
    bindKindOf: function () {
        if (this.target) {
            var obj = { tar: this.target, handle: this.handle }
            this.tarHandle.push(obj);
            var _this = this;
            this.root['on' + this.type] = function (e) {
                var e = e || event;
                for (var i = _this.tarHandle.length - 1; i >= 0; i--) {
                    if (getTarget(e) == _this.tarHandle[i].tar) {
                        _this.tarHandle[i].handle.call(getTarget(e));
                    }
                }
            };

        }

    }

};
/*=======================数据操作===============================*/
//*********Ajax********************
//创建xhr对象
function createXHR() {
    if (window.XMLHttpRequest) {
        createXHR = function () { return new XMLHttpRequest(); };
        return new XMLHttpRequest();
    }
    else {
        createXHR = function () { new ActiveXObject('Microsoft.XMLHTTP'); };
        return new ActiveXObject('Microsoft.XMLHTTP');
    }
}
//xhr对象判断
function XHRStatusJudge(xhr, funcSucc, funcFail) {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            if (funcSucc) {
                funcSucc(xhr.responseText);
            }
            return xhr.responseText;
        }
        else {
            if (funcFail) {
                funcFail(xhr.status);
            }
            else {
                alert('错误状态：' + xhr.status);
            }
        }
    }
}
//*********操作cookie*********************
//设置cookie
function setCookie(key, value, expries) {
    if (expries) {
        var da = new Date();
        da.setDate(da.getDate() + expries);
        document.cookie = key + '=' + value + ';expries=' + da.toGMTString();
    }
    else {
        document.cookie = key + '=' + value + ';';
    }
}
//获取cookie
function getCookie(key) {
    var str = document.cookie.strFormat();
    var arr = str.split(';');
    var len = arr.length;
    var obj = {};
    for (var i = 0; i < len; i++) {
        var ar = arr[i].split('=');
        obj[ar[0]] = ar[1];
    }
    return (key == null) ? obj : obj[key];
}