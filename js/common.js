//命名空间设置
var COM_GLOBAL = {};
COM_GLOBAL.namespace = function (str) {
    var arr = str.split('.'), ob = COM_GLOBAL;
    for (var i = (arr[0] == 'COM_GLOBAL') ? 1 : 0; i < arr.length; i++) {
        ob[arr[i]] = ob[arr[i]] || {};
        ob = ob[arr[i]];
    }
};

//Js匀速运动--By programmer JhoneLee

function paceMove(obj, speed, json, callback) {
    clearInterval(obj.Timer);
    obj.Timer = setInterval(function () {
        var flag = false;
        for (var item in json) {
            if (item == 'opacity') {
                if (document.all) {
                    if (parseInt(json[item] * 100) != parseInt(getStyle(obj, item))) {
                        if (parseInt(json[item] * 100) - parseInt(getStyle(obj, item)) < speed) {
                            obj.style['filter'] = 'alpha(opacity=' + parseInt(json[item] * 100) + ')';
                            flag = true;
                        }
                        else {
                            obj.style['filter'] = 'alpha(opacity=' + parseInt(getStyle(obj, item)) + speed * 100 + ')';
                        }
                    }
                }
                else {
                    if (parseFloat(json[item]) != parseFloat(getStyle(obj, item))) {
                        if (Math.abs(parseFloat(json[item]) - parseFloat(getStyle(obj, item))) < Math.abs(speed)) {
                            obj.style[item] = parseFloat(json[item]);
                            flag = true;
                        }
                        else {
                            obj.style[item] = parseFloat(getStyle(obj, item)) + speed;
                        }
                    }
                }
            }
            else {
                if (parseInt(json[item]) != parseInt(getStyle(obj, item))) {
                    if (Math.abs(parseInt(json[item]) - parseInt(getStyle(obj, item))) < Math.abs(speed)) {
                        obj.style[item] = parseInt(json[item]);
                        flag = true;
                    }
                    else {
                        obj.style[item] = parseInt(getStyle(obj, item)) + speed+'px';
                    }
                }
            }
            if (flag) {
                clearInterval(obj.Timer);
                if (callback) {
                    callback();
                }
            }
        }
    }, 30);

}

//自定义选项卡
function creatSelectCard(objBtn, objCard,class_name1,class_name2) {
    for (var i = 0; i < objBtn.length; i++) {
        objBtn[i].index = i;
        objBtn[i].onclick = function () {
            for (var j = 0; j < objCard.length; j++) {
                if (class_name2) {
                    objBtn[j].className=class_name2
                }
                else {
                    objBtn[j].className = '';
                }
                objCard[j].style.display = 'none';
            }
            this.className = class_name1;
            objCard[this.index].style.display = 'block';

        };
    }
}

//js 图片旋转特效
COM_GLOBAL.namespace('Common.rotate');
COM_GLOBAL.Common.rotate.begin = 0;
function toRotate(obj,degree,perRt) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        COM_GLOBAL.Common.rotate.begin += perRt;
        run(COM_GLOBAL.Common.rotate.begin, obj);
        if (COM_GLOBAL.Common.rotate.begin > degree - 1) {
            COM_GLOBAL.Common.rotate.begin = 0;
            clearInterval(obj.timer);

        }
    }, 30);
}
