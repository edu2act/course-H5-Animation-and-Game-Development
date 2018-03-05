/**
 * Created by qile on 16/10/19.
 */
var MySprite = cc.Sprite.extend({
    listener:null,
    ctor:function(fileName, rect, rotated){
        this._super(fileName, rect, rotated);
        var size = cc.winSize;
        var listener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function (touch, event) {
                var location = touch.getLocation();
                var target = event.getCurrentTarget();
                if(cc.rectContainsPoint(target.getBoundingBox(),location)){
                    cc.log("点击到"+target.tag+"矩形！");
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                var delta = touch.getDelta();
                var target = event.getCurrentTarget();
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                if(99 === target.tag){
                    target.x = size.width*0.4;
                    target.y = size.height*0.5;
                }
                if(100 === target.tag){
                    target.x = size.width*0.6;
                    target.y = size.height*0.5;
                }
            }
        });
        cc.eventManager.addListener(listener,this);
        this.listener = listener;
    },
    onExit:function(){
        this._super();
        cc.log("onExit调用，移除监听器");
        cc.eventManager.removeListener(this.listener);
    }
});