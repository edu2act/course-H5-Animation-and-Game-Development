var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Test_json:"res/test.json",
    Test_plist:"res/test.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}