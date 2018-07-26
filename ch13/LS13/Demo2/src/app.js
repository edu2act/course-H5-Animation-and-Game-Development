var BASE_URL = 'http://www.cocoagame.net/service/mynotes/WebService.php';

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        var labelGet = new cc.MenuItemFont("Get 请求测试",this.getCallBack,this);
        labelGet.setFontSize(18);
        var labelPost = new cc.MenuItemFont("Post 请求测试",this.postCallBack,this);
        labelPost.setFontSize(18);

        var menu = new cc.Menu(labelGet,labelPost);
        menu.alignItemsVertically();
        menu.x = size.width*0.2;
        menu.y = size.height*0.75;
        this.addChild(menu);

        return true;
    },
    getCallBack:function(){
        cc.log("getCallBack");
        /*
        var xhr = cc.loader.getXMLHttpRequest();
        var data = "email={0}&type={1}&action={2}";

        data = data.replace("{0}","你的邮箱");
        data = data.replace("{1}","Json");
        data = data.replace("{2}","query");

        xhr.open("GET",BASE_URL+"?"+data);
        xhr.onreadystatechange = function () {
            cc.log(xhr.readyState);
            if(xhr.readyState == 4 && xhr.state ==200){
                var response = xhr.responseText;
                cc.log(response);
            }
        }
        xhr.send();
*/
        var that = this;
        var xhr = cc.loader.getXMLHttpRequest();
        var statusGetLabel = new cc.LabelTTF("Status:", "Thonburi", 18);
        this.addChild(statusGetLabel, 1);
        statusGetLabel.x = cc.winSize.width / 2;
        statusGetLabel.y = cc.winSize.height - 100;
        statusGetLabel.setString("Status: Send Get Request to httpbin.org");
        //set arguments with <URL>?xxx=xxx&yyy=yyy
        xhr.open("GET", "http://httpbin.org/get?show_env=1", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText.substring(0, 100) + "...";
                var responseLabel = new cc.LabelTTF("GET Response (100 chars): \n" + response, "Thonburi", 16);
                cc.log("GET Response: \n" + xhr.responseText);
                that.addChild(responseLabel, 1);
                responseLabel.anchorX = 0;
                responseLabel.anchorY = 1;
                responseLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;
                responseLabel.x = 10;
                responseLabel.y = cc.winSize.height / 2;
                statusGetLabel.setString("Status: Got GET response! " + httpStatus);
            }
        };
        xhr.send();
    },
    postCallBack:function(){
        cc.log("postCallBack");
        var that = this;
        var xhr = cc.loader.getXMLHttpRequest();
        var statusPostLabel = new cc.LabelTTF("Status:", "Thonburi", 18);
        this.addChild(statusPostLabel, 1);
        statusPostLabel.x = cc.winSize.width / 2;
        statusPostLabel.y = cc.winSize.height - 140;
        statusPostLabel.setString("Status: Send Post Request to httpbin.org with plain text");
        xhr.open("POST", "http://httpbin.org/post");
        //set Content-type "text/plain;charset=UTF-8" to post plain text
        xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText.substring(0, 100) + "...";
                var responseLabel = new cc.LabelTTF("POST Response (100 chars):  \n" + response, "Thonburi", 16);
                cc.log("POST Response: \n" + xhr.responseText);
                that.addChild(responseLabel, 1);
                responseLabel.anchorX = 0;
                responseLabel.anchorY = 1;
                responseLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;
                responseLabel.x = cc.winSize.width / 10 * 3;
                responseLabel.y = cc.winSize.height / 2;
                statusPostLabel.setString("Status: Got POST response! " + httpStatus);
            }
        };
        xhr.send("plain text message");

        //可以是提交的表单 如下
        //var data = "email={0}&type={1}&action={2}";
        //data = data.replace("{0}","你的邮箱");
        //data = data.replace("{1}","Json");
        //data = data.replace("{2}","query");
        //xhr.send(data);

    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

