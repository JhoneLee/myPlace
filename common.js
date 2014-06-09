// 应用层
//*******************DOM操作***********************
//******************匀速定时运动对象********************
function Move(obj, move, time, callback) {
    this.obj = obj;
    time ? this.time = time : this.time = 1000;
    this.timer = null;
    this.callback = callback;
    this.base = {};
    var _this = this;
    if (move) {
        this.MoveTo(move);
    }
}
Move.prototype = {
    MoveTo:
                function (moveJson) {
                    clearInterval(this.timer);
                    for (var item in moveJson) {
                        if (item == 'opacity') {
                            var target = parseFloat(moveJson[item]);
                            var begin = parseFloat(getStyle(this.obj, item));
                            var speed = (target - begin) / Math.round(this.time / 30);
                        }
                        else {
                            var target = parseInt(moveJson[item]);
                            var begin = parseInt(getStyle(this.obj, item));
                            var speed = (target - begin) / Math.round(this.time / 30);
                        }
                        this.base[item] = { ibase: begin, ispeed: speed, itimes: Math.round(this.time / 30) };
                    }
                    var flag = true;
                    var _this = this;
                    this.timer = setInterval(function () {
                        for (var item in moveJson) {
                            if (item == 'opacity') {
                                if (_this.base[item].itimes) {
                                    _this.base[item].ibase += _this.base[item].ispeed;
                                    _this.obj.style[item] = _this.base[item].ibase;
                                    _this.obj.style['filter'] = 'alpha(opacity=' + (_this.base[item].ibase * 100) + ')';
                                    flag = false;
                                    _this.base[item].itimes--;
                                }
                                else {
                                    flag = true;
                                }
                            }
                            else {
                                if (_this.base[item].itimes) {
                                    _this.base[item].ibase += _this.base[item].ispeed;
                                    if (_this.base[item].itimes == 1) {
                                        _this.obj.style[item] = Math.round(_this.base[item].ibase) + 'px';
                                    }
                                    else {
                                        _this.obj.style[item] = _this.base[item].ibase + 'px';
                                    }
                                    flag = false;
                                    _this.base[item].itimes--;
                                }
                                else {
                                    flag = true;
                                }
                            }
                            if (flag) {
                                clearInterval(_this.timer);
                                if (_this.callback) {
                                    _this.callback();
                                    callback = null;
                                }
                            }
                        }
                    }, 30);
                }
            };

//生成可缩放的对象
function Resize(obj, scaleId, style, hiddenX, hiddenY, equalRatio, maxRange, minRange) {
    this.obj = obj;
    this.style = style;
    scaleId ? this.scaleId = scaleId : this.scaleId = 's1732423123198934';
    !maxRange ? this.maxRange = { x: Infinity, y: Infinity} : this.maxRange = maxRange;
    !minRange ? this.minRange = { x: 0, y: 0} : this.minRange = minRange;
    this.hiddenX = hiddenX;
    this.hiddenY = hiddenY;
    this.equalRatio = equalRatio;
    this.resizeResult = { x: parseInt(getStyle(this.obj, 'width')), y: parseInt(getStyle(this.obj, 'height')) };
    var _this = this;
    var hh = document.getElementsByTagName('html')[0];
    function init() {
        var oDiv = document.createElement('div'); oDiv.id = _this.scaleId;
        oDiv.style['position'] = 'absolute';
        oDiv.style['width'] = '10px';
        oDiv.style['height'] = '10px';
        oDiv.style['backgroundColor'] = 'gray';
        oDiv.style['zIndex'] = '2';
        _this.obj.appendChild(oDiv);
        var w1 = parseInt(getStyle(_this.obj, 'width'));
        var w2 = parseInt(getStyle(oDiv, 'width'));
        var h1 = parseInt(getStyle(_this.obj, 'height'));
        var h2 = parseInt(getStyle(oDiv, 'height'));
        oDiv.style['left'] = w1 - w2 + 'px';
        oDiv.style['top'] = h1 - h2 + 'px';
        var cursor = '';
        if (_this.style) {
            _this.setResizeStyle(_this.style);
        }
        if (_this.hiddenX) {
            cursor = 'n-resize';
        }
        else if (_this.hiddenY) {
            cursor = 'w-resize';
        }
        else {
            cursor = 'nw-resize';
        }
        oDiv.style['cursor'] = cursor;
        oDiv.onmousedown = function (e) {
            var oe = e || event;
            preventBubble(oe);
            var w1 = parseInt(getStyle(_this.obj, 'width'));
            var w2 = parseInt(getStyle(oDiv, 'width'));
            var h1 = parseInt(getStyle(_this.obj, 'height'));
            var h2 = parseInt(getStyle(oDiv, 'height'));
            var disY, disX, ratio, fl, ft;
            var pos = getPosition(_this.obj);
            _this.hiddenX ? disX = null : disX = w1 + pos.x - oe.clientX;
            _this.hiddenY ? disY = null : disY = -oe.clientY + h1 + pos.y;
            _this.equalRatio ? ratio = w1 / h1 : null;
            fl = _this.obj.offsetLeft;
            ft = _this.obj.offsetTop;
            if (_this.mouseDown) {
                _this.mouseDown();
            }
            var _this2 = this;
            document.onmousemove = function (e) {
                var oe = e || event;
                hh.style['cursor'] = cursor;
                var dx = oe.clientX - pos.x + disX;
                var dy = oe.clientY - pos.y + disY;


                if (dx + fl > _this.maxRange.x) {
                    dx = _this.maxRange.x - fl;
                    hh.style['cursor'] = 'n-resize'
                }
                if (dy + ft > _this.maxRange.y) {
                    dy = _this.maxRange.y - ft;
                    hh.style['cursor'] = 'w-resize'
                }
                if (dx >= _this.maxRange.x && dy >= _this.maxRange.y) {
                    hh.style['cursor'] = cursor;
                }
                if (dx < _this.minRange.x) {
                    dx = _this.minRange.x;
                }
                if (dy < _this.minRange.y) {
                    dy = _this.minRange.y;
                }
                if (_this.hiddenX) {
                    _this.obj.style['height'] = dy + 'px';
                    _this2.style['top'] = -h2 + dy + 'px';
                }
                else if (_this.hiddenY) {
                    _this.obj.style['width'] = dx + 'px';
                    _this2.style['left'] = -w2 + dx + 'px';
                }
                else if (_this.equalRatio) {
                    //var ss = _this.maxRange.x >= _this.maxRange.y ? _this.maxRange.y : _this.maxRange.x;
                    if (dx + fl > _this.maxRange.x) {
                        dx = _this.maxRange.x - fl;
                    }
                    if (dx / ratio + ft > _this.maxRange.y) {
                        dx = (_this.maxRange.y - ft) * ratio;
                    }
                    _this.obj.style['width'] = dx + 'px';
                    _this.obj.style['height'] = dx / ratio + 'px';
                    _this2.style['left'] = -w2 + dx + 'px';
                    _this2.style['top'] = -h2 + dx / ratio + 'px';

                }
                else {
                    _this.obj.style['width'] = dx + 'px';
                    _this.obj.style['height'] = dy + 'px';
                    _this2.style['left'] = -w2 + dx + 'px';
                    _this2.style['top'] = -h2 + dy + 'px';
                }
                if (_this.mouseMove) {
                    _this.mouseMove({ x: dx, y: dy });
                }

                return false;
            };
            document.onmouseup = function () {
                this.onmousemove = null;
                hh.style['cursor'] = '';
                _this.resizeResult = { x: parseInt(_this.obj.style['width']), y: parseInt(_this.obj.style['height']) };
                if (_this.mouseUp) {
                    _this.mouseUp();
                }
            };
            return false;
        };

    };
    init();


}
Resize.prototype = {
    setResizeStyle: function (style) {
        for (var item in style) {
            if (item == 'widht' || item == 'height' || item == 'backgroundColor' || item == 'background') {
                this.getElementById(this.scaleId).style[item] = style[item];
            }
        }
    },
    mouseDown: null,
    mouseMove: null,
    mouseUp: null
};

//可拖拽的对象
function Drag(obj, hiddenX, hiddenY, rangeLT, rangeRB, resizeObj) {
    this.dragObj = obj;
    this.hiddenX = hiddenX;
    this.hiddenY = hiddenY;
    this.resizeObj = resizeObj;
    this.dragPos = { x: 0, y: 0 };
    !rangeLT ? this.rangeLT = { x: 0, y: 0} : this.rangeLT = rangeLT;
    !rangeRB ? this.rangeRB = { x: Infinity, y: Infinity} : this.rangeRB = rangeRB;
    var _This = this;
    var hh = document.getElementsByTagName('html')[0];
    this.dragObj.style['cursor'] = 'move';
    this.dragObj.onmousedown = function (e) {
        var oe = e || event;
        preventBubble(oe);
        var disX = _This.hiddenX ? null : oe.clientX - this.offsetLeft;
        var disY = _This.hiddenY ? null : oe.clientY - this.offsetTop;
        var _this = this;
        if (_This.mouseDown) {
            _This.mouseDown({ x: disX, y: disY });
        }
        document.onmousemove = function (e) {
            var oe = e || event;
            if (disX) {
                var disXX = oe.clientX - disX;
                if (disXX < _This.rangeLT.x) {
                    disXX = _This.rangeLT.x;
                }
                if (disXX > _This.rangeRB.x - _this.offsetWidth) {
                    disXX = _This.rangeRB.x - _this.offsetWidth;
                }
                _this.style['left'] = disXX + 'px';
            }
            if (disY) {
                var disYY = oe.clientY - disY;
                if (disYY < _This.rangeLT.y) {
                    disYY = _This.rangeLT.y;
                }
                if (disYY > _This.rangeRB.y - _this.offsetHeight) {
                    disYY = _This.rangeRB.y - _this.offsetHeight;
                }
                _this.style['top'] = disYY + 'px';
            }
            if (_This.mouseMove) {
                var pos = { x: disXX, y: disYY };
                _This.mouseMove(pos);
            }

            return false;

        };

        document.onmouseup = function () {
            document.onmousemove = null;
            this.onmousedown = null;
            _This.dragPos = { x: parseInt(_this.style['left']), y: parseInt(_this.style['top']) };
            if (_This.mouseUp) {
                _This.mouseUp(_This.dragPos);
            }
        };
        return false;

    };
    Drag.prototype = {
        mouseDown: null,
        mouseMove: null,
        mouseUp: null
    };
}

//服务器上传图像前预览
function imageScan(obj, oScan, callback) {
    var stand = parseInt(getStyle(oScan, 'width'));
    if (obj.files && obj.files[0]) {
        var reader = new FileReader();
        reader.onload = function () {
            var img = new Image();
            img.src = this.result;
            if (img.width > stand || img.height > stand) {
                var obj = divResize(img.width, img.height, stand);
                img.width = obj.width;
                img.height = obj.height;
            }
            if (oScan.children.length > 0) {
                oScan.replaceChild(img, oScan.children[0]);
            }
            else {
                oScan.appendChild(img);
            }
            if (callback) {
                callback();
            }
        }
        reader.readAsDataURL(obj.files[0]);
    }
    else {
        var oDiv = document.createElement('div');
        var url = obj.value;
        oDiv.style['height'] = '1px';
        oDiv.style['width'] = '1px';
        oDiv.style['filter'] = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image,src='" + url + "'";
        if (oScan.children.length > 0) {
            oScan.replaceChild(oDiv, oScan.children[0]);
        }
        else {
            oScan.appendChild(oDiv);
        }

        if (oDiv.offsetWidth > stand || oDiv.offsetHeight > stand) {
            var obj = divResize(oDiv.offsetWidth, oDiv.offsetHeight, stand);

        }
        else {
            var obj = { width: oDiv.offsetWidth, height: oDiv.offsetHeight };
        }
        oDiv.style['filter'] = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src='" + url + "'"
        oDiv.style['width'] = obj.width + 'px';
        oDiv.style['height'] = obj.height + 'px';
        if (callback) {
            callback();
        }
    }
    function divResize(width, height, stand) {
        var obj = {};
        var rate = width / height;
        if (width != height) {
            if (width > stand && width > height) {
                obj.width = stand;
                obj.height = stand / rate;
            }
            else
                if (height > stand) {
                    obj.height = stand;
                    obj.width = height * rate;
                }
        }
        else {
            if (width > stand) {
                obj.width = obj.height = stand;
            }

        }
        return obj;
    }
}



//******************ajax***************************
//ajax GET请求
function ajaxGET(url, dataJson, funcSucc, funcFail, cacheMinutes) {
    var xhr = createXHR();
    xhr.onreadystatechange = function () {
        XHRStatusJudge(xhr, funcSucc, funcFail);
    };
    if (dataJson) {
        var reg = /\?/;
        var arr = [];
        for (var item in dataJson) {
            arr.push(item + '=' + dataJson[item]);
        }
        if (!reg.test(url)) {
            url = url + '?';
        }
        else {
            if (arr.length > 0)
                url += '&';
        }
        url += arr.join('&').toString();
    }
    xhr.open('GET', url, true);
    if (cacheMinutes) {
        var dd = new Date();
        dd.setMinutes(dd.getMinutes() + cacheMinutes);
        xhr.setRequestHeader('Expires', dd.toGMTString());
    }
    xhr.send(null);
}
//ajax POST请求
function ajaxPOST(url, dataString, funcSucc, funcFail, contentType) {
    var xhr = createXHR();
    xhr.onreadystatechange = function () {
        XHRStatusJudge(xhr, funcSucc, funcFail);
    };
    xhr.open('POST', url, true);
    if (contentType) {
        xhr.setRequestHeader('Content-Type', contentType);
    }
    if (dataString) {
        xhr.send(dataString);
    }
    else {
        xhr.send(null);
    }
}

//ajax长轮询对象
function Polling(url, method,timeout,data, succ, fail) {
    this.xhr = createXHR();
    this.method = method;
    this.succ = succ;
    this.fail = fail;
    this.url = url;
    this.data = data;
    this.timeout = timeout;
    this.abortFlag = false;
    if (this.data) {
        var reg = /\?/;
        this.data = jsonFormet(this.data);
        if (this.method == 'get' || this.method == 'GET') {
            reg.test(this.url) ? this.url += '&' + this.date : this.url += '?' + this.data;
        }
    }

}
Polling.prototype = {
    Abort: function () { this.abortFlag = true; this.xhr.abort(); },
    setContentType: function (value) {  },
    xhrReceiving: null,
    xhrLoaded: null,
    Start: function () {
        this.abortFlag = false;
        this.xhr.open(this.method, this.url, true);
        if (this.timeout) {
            this.xhr.timeout = this.timeout;
        }
        var _this = this;
        this.xhr.onreadystatechange = function () {
            if (_this.xhr.readyState == 4) {
                try {
                    if (_this.xhrLoaded) {
                        _this.xhrLoaded();
                    }
                    if (_this.xhr.status == 200) {
                        _this.succ(_this.xhr.responseText);
                    }
                    else {
                        if (!_this.abortFlag) {
                            if (_this.fail) {
                                _this.fail(_this.xhr.status);
                            }
                            else {
                                alert('错误状态' + _this.xhr.status);
                            }
                        }
                    }
                }
                catch (e) {
                    alert(e.message);
                }
                _this.xhr.open(_this.method, _this.url, true);
                if (_this.method == 'get' || _this.method == 'GET') {
                    _this.xhr.send(null)
                }
                else {
                    _this.xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                    _this.xhr.send(_this.data);
                }

            }
            if (_this.xhr.readyState == 3) {
                if (_this.xhrReceiving) {
                    _this.xhrReceiving(_this.xhr);
                }
            }

        };
        if (this.method == 'get' || this.method == 'GET') {
            this.xhr.send(null)
        }
        else {
            this.xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            this.xhr.send(this.data);
        }
    }
};