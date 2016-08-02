window.Utility = {
    str2node: function(str) {
        var node = document.createElement('div');
        node.innerHTML = str;
        return node.firstChild;
    },
    extend: function(out) {
        var out = out || {};
        for (var i = 1, len = arguments.length; i < len; i++) {
            if (!arguments[i])
                continue;
            for (var key in arguments[i]) {
                out[key] = arguments[i][key];
            }
        }
        return out;
    },
    getElementsByClassName: function(root, clsName){
        if (root.getElementsByClassName) {
            return root.getElementsByClassName(clsName);
        }else{
            var elems = root.getElementsByTagName('*');
            var result = [];
            for(var i = 0, elem; elem = elems[i]; i++){
                if (this.hasClass(elem, clsName)) {
                    result.push(elem);
                }
            }
        }
        return result;
    },
    addEvent:
            document.addEventListener?
            function(elem, type, listener, useCapture){
                elem.addEventListener(type, listener, useCapture);
            }:
            function(elem, type, listener, useCapture){
                elem.attachEvent('on' + type, listener);
            }
    ,
    delEvent:
            document.removeEventListener?
            function(elem, type, listener, useCapture){
                elem.removeEventListener(type, listener, useCapture);
            }:
            function(elem, type, listener, useCapture){
                elem.detachEvent('on' + type, listener);
            }
    ,
    getTarget: function(event){
        return event.target || window.event;
    },
    hasClass: function(elem, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    },
    addClass: function(elem, cls) {
        if (!this.hasClass(elem, cls)) {
            elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
        }
    },
    removeClass: function (elem, cls) {
        if (this.hasClass(elem, cls)) {
            var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },
    toggleClass: function(obj, cls) {
        this.hasClass(obj, cls) ? this.removeClass(obj, cls) : this.addClass(obj, cls);
    },

    // 如果有1个参数，则函数功能为获取；如果有2个参数，则函数功能为设置；否则，返回false
    scrollTop: function(elem, top){
        if (arguments.length == 1) {
            return elem.scrollTop;
        }else if(arguments.length == 2){
            elem.scrollTop = top;
        }else{
            return false;
        }
    }
}