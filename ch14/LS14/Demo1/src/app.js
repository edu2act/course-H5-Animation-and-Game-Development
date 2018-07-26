
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        //实验一 TMXTileMap
        var tileMap = new cc.TMXTiledMap(res.Tmx_tmx);
        this.addChild(tileMap);

        var mapSize = tileMap.getMapSize();//瓦片个数
        var tileSize = tileMap.getTileSize();//单个瓦片的像素值
        //cc.log("mapSize:"+mapSize.width+"___"+mapSize.height);
        //cc.log("tileSize:"+tileSize.width+"___"+tileSize.height);

        var tileMapProperties = tileMap.getProperties();
        for(var i in tileMapProperties){
            //cc.log(i +":"+ tileMapProperties[i]);
        }
        //cc.log("tileMap的type属性："+tileMap.getProperty("type"));

        var tile1Properties = tileMap.getPropertiesForGID(1);//GID与瓦片id差1，GID ＝ id＋1
        for(var i in tile1Properties){
            //cc.log("GID1的属性"+i +":"+ tile1Properties[i]);
        }

        //实验二 TMXLayer
        var bgLayer = tileMap.getLayer("LayerBG");
        //cc.log("LayerSize:"+bgLayer.getLayerSize().width+"_"+bgLayer.getLayerSize().height);//瓦片的个数
        //cc.log("MapTileSize:"+bgLayer.getMapTileSize().width+"_"+bgLayer.getMapTileSize().height);//单个瓦片的像素数

        var tiles = bgLayer.getTiles();//Tile数组
        var tileAt = bgLayer.getTileAt(cc.p(1,1));//tileMap坐标系下得到对应的精灵
        tileAt.setColor(cc.color.BLUE);
        var tileGIDAt = bgLayer.getTileGIDAt(cc.p(6,5));//这里指的是TileMap坐标系
        //cc.log("tileGID = "+tileGIDAt);

        var positionAt = bgLayer.getPositionAt(1,1);//瓦片坐标系－》像素的坐标系转换，x轴一样，y轴反向并差一片，重要
        //cc.log("positionAt:"+positionAt.x+"_"+(positionAt.y+tileSize.width));

        //cc.log(bgLayer.getProperty("type"));
        //cc.log(bgLayer.getProperties().type);

        for(var i = 1;i<2;i++){
            for(var j = 1;j<2;j++){
                var sprite = bgLayer.getTileAt(cc.p(i,tileMap.getMapSize().height-j-1));
                sprite.setColor(cc.color.RED);
            }
        }


        //实验三 TMXObjectGroup
        var object = tileMap.getObjectGroup("objects");
        //cc.log(object.getProperties()["type"]);
        //cc.log(object.getProperties().type);
        //cc.log(object.propertyNamed("type"));

        var groups = tileMap.getObjectGroups();//不推荐使用
        var object2 = groups[0];
        //cc.log(object2.getProperties()["type"]);

        var sp = new cc.Sprite(res.CloseNormal_png);
        var player = object.getObject("player");
        cc.log(player.type+"__"+player.x+"__"+(player.y+tileSize.width));
        cc.log(player.type+"__"+player.width+"__"+player.height);

        //sp.x =Math.floor(player.x/32);
        //sp.y =Math.floor(player.y/32);

        sp.setAnchorPoint(cc.p(0,1));
        sp.x =player.x;
        sp.y =player.y+tileSize.width;

        this.addChild(sp);

        var properties = tileMap.getPropertiesForGID(1);//GID从1开始
        cc.log(properties.type);//可用于碰撞检测
        //for(var i in properties){
        //    cc.log(i+"__"+properties[i]);
        //}

        //实验四 碰撞检测
        function moveAndCollid(pos){
            var newPosition = cc.pAdd(sp.getPosition(),pos);
            var tileX = Math.floor(newPosition.x/32);
            var tileY = Math.floor((size.height - newPosition.y)/32);
            cc.log("tileX:"+tileX);
            cc.log("tileY:"+tileY);
            var tileGID = bgLayer.getTileGIDAt(cc.p(tileX,tileY));
            cc.log("tileGID:"+tileGID);
            var properties = tileMap.getPropertiesForGID(tileGID);
            if(properties == null){
                sp.setPosition(newPosition);
                return;
            }else if (properties.type == "block"){
                return;
            }else if (properties.type == "eat"){
                sp.setPosition(newPosition);
                cc.log("吃了一个西瓜");
                //bgLayer.getTileAt(cc.p(tileX,tileY)).setVisible(false);
            }else{
                sp.setPosition(newPosition);
            }
        }

        var listener = cc.EventListener.create({
            event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(key,event){
                switch(key){
                    case cc.KEY.up:
                        moveAndCollid(cc.p(0,32));
                        break;
                    case cc.KEY.down:
                        moveAndCollid(cc.p(0,-32));
                        break;
                    case cc.KEY.left:
                        moveAndCollid(cc.p(-32,0));
                        break;
                    case cc.KEY.right:
                        moveAndCollid(cc.p(32,0));
                        break;
                    default:

                }
            },
            onKeyReleased:function(key,event){
                //cc.log("yyy"+Math.floor(sp.x/32)+"__"+Math.floor(sp.y/32));
                //cc.log("zzz"+Math.floor(sp.x/32)+"__"+(tileMap.getMapSize().height-1-Math.floor(sp.y/32)));
                //cc.log("xxx"+(bgLayer.getTileGIDAt(Math.floor(sp.x/32),tileMap.getMapSize().height-1-Math.floor(sp.y/32))));
            }
        });
        cc.eventManager.addListener(listener,this);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

