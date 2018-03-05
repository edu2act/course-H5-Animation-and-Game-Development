var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",

    //  图片集标签资源
    LabelAtlas_png: "res/label/tuffy_bold_italic-charmap.png",
    LabelAtlas_plist: "res/label/tuffy_bold_italic-charmap.plist",

    LabelAtlas2_png: "res/label/Atlas.png",

    //  位图标签资源
    LabelBitmap_png: "res/label/bitmapFontChinese.png",
    LabelBitmap_fnt: "res/label/bitmapFontChinese.fnt",

    LabelBitmap2_png: "res/label/bitmapFontTest3.png",
    LabelBitmap2_fnt: "res/label/bitmapFontTest3.fnt"

};

var g_resources = [
    {
        type: "font",
        name: "ComicAndy",
        srcs: ["res/label/ComicAndy.ttf"]
    }
];

for (var i in res) {
    g_resources.push(res[i]);
}