var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",

    //Menu
    AboutBtnNormal_png:"res/menu/btn-about-normal.png",
    AboutBtnSelected_png:"res/menu/btn-about-selected.png",

    HightScoresBtnNormal_png:"res/menu/btn-highscores-normal.png",
    HighScoresBtnSelected_png:"res/menu/btn-highscores-selected.png",

    PlayBtnNormal_png:"res/menu/btn-play-normal.png",
    PlaytBtnSelected_png:"res/menu/btn-play-selected.png",

    MusicOnNormal_png:"res/menu/music-on-normal.png",
    MusicOnSelected_png:"res/menu/music-on-selected.png",
    MusicOffNormal_png:"res/menu/music-off-normal.png",
    MusicOffSelected_png:"res/menu/music-off-selected.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}