var w = Widget;
var u = Utility;
// Modal
// ＝＝＝＝＝＝＝＝＝
// 1.默认配置变量cfg
// top: 弹窗距离顶部的距离
// width: 弹窗长度
// height: 弹窗高度
// hasMask: 是否背景有遮罩
// content: 内容模板
// container: 弹窗append在的容器(web虽然不用考虑，不过wap用到了history.pushstate就需要了;不过这里由于在modal出现以后禁止了页面滚动，所以这里意义不大)
//
// 2.status: 弹框的状态
function Modal() {
    this.cfg = {
        width: 5.8,
        hasMask: false,
        hasClose: false,
        content: '',
        container: null,
        maskZoom: 998
    }
}

Modal.status = false; // Modal的静态变量，显示窗口的状态

Modal.prototype = u.extend({}, new w(), {
    preventDefault: function(e){
        e.preventDefault();
    },
    renderUI: function(){
        var hide;
        if (this.cfg.hasClose)
            hide = '';
        else
            hide = 'hide';
        var tpl =
            '<div class="w-modal">' +
                '<i class="w-close ' + hide + '"></i>' +
                this.cfg.content +
            '</div>';
        this.boundingBox = u.str2node(tpl);
        if (this.cfg.hasMask) {
            this.mask = u.str2node('<div class="w-modal_mask"></div>');
            this.mask.style.cssText = "z-index:" + this.cfg.maskZoom;
            var body = document.getElementsByTagName('body')[0];
            u.addClass(body, 'w-removeScroll');
            u.addEvent(body, 'touchmove', this.preventDefault, false);
            // 如果弹窗中有scroll的元素，则在class中加: w-touchMove
            var touchMoves = this.boundingBox.getElementsByClassName('w-touchMove');
            if (!!touchMoves) {
                for(var i = 0, len = touchMoves.length; i < len; i++){
                    u.addEvent(touchMoves[i], 'touchmove', function(e){
                        e.stopPropagation();
                    }, false);
                }
            }
            // 将弹窗加到对应的父元素
            var container = document.getElementById(this.cfg.container) || body;
            container.appendChild(this.mask);
        }
    },
    eventHandler: function(e, cls, eName, that){
        var target = u.getTarget(e);
        if(u.hasClass(target, cls)){
            that.fire(eName);
            that.destroy();
        }
    },
    bindUI: function() {
        var that = this;
        // 就只有这里啦
        u.addEvent(this.boundingBox, 'click', function(e){
            that.eventHandler(e, 'w-confirm', 'confirm', that);
        });
        u.addEvent(this.boundingBox, 'click', function(e){
            that.eventHandler(e, 'w-close', 'close', that);
        });
        u.addEvent(this.boundingBox, 'click', function(e){
            that.eventHandler(e, 'w-cancel', 'cancel', that);
        });
        // 跳转链接也让组件消失
        // 为了wap-History.pushState这类Pjax考虑
        var aList = this.boundingBox.getElementsByTagName('a');
        for(var i = 0, len = aList.length; i < len; i++){
            u.addEvent(aList[i], 'click', function(){
                if ((!!this.href) && (this.href != '')) {
                    that.destroy();
                }
            })
        }
    },
    initUI: function() {
        this.boundingBox.style.cssText =
            'width: ' + this.cfg.width + 'rem;';
    },
    destructor: function() {
        this.mask && this.mask.parentNode.removeChild(this.mask);
        var body = document.getElementsByTagName('body')[0];
        u.removeClass(body, 'w-removeScroll');
        u.delEvent(body, 'touchmove', this.preventDefault, false);
        Modal.status = false;
    },
    show: function(cfg) {
        u.extend(this.cfg, cfg);
        this.render(this.cfg.container);
        Modal.status = true;
        return this;
    },
    isShowed: function(){
        return Modal.status;
    }
});