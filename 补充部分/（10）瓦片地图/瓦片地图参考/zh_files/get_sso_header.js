var base_url = location.href;
var client_id = 215;
var sso_signup_url = 'https://passport.cocos.com/auth/signup'+'?client_id='+client_id+'&url='+base_url;
var sso_signin_url = 'https://passport.cocos.com/sso/signin'+'?client_id='+client_id+'&url='+base_url;
var sso_signout_url = 'https://passport.cocos.com/sso/signout?client_id=215'+'?client_id='+client_id+'&url='+base_url;
var content = '<link type="text/css" rel="stylesheet" href="https://cn.cocos.com/coco/css/cocos_head.css?t=20160303" />';
content += '<div class="headerbg" id="cocos_top">';
content += '<div class="wrap clearfix" style="height:30px;">';
content += '<h1 class="logo"><a href="http://www.cocos.com/"><span>Cocos</span>官网</a></h1>';content += '<div id="sso_user"><a href="'+sso_signup_url+'" class="fr">注册</a><span class="fr shu"></span><a href="'+sso_signin_url+'" class="fr">登录</a></div>';content += '</div></div>';document.write(content);