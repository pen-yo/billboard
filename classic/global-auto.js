var path = "data/0003-2022-fortune-500-king.json"; // 数据源
var obj = getObjFromJSON(path); // 数据对象
var isSortInAdvance = obj.sia; // 数据核心预处理设置
var pairs; // 数据对象核心
var bit = 0; // 当前位
var biggest = 0; // 当前最大值
var sid; // 脚本终止码

window.onload = function () {
    e("#title").innerText = obj.title;
    e("#unit").innerHTML = (obj.unit == null ? "" : "单位：" + obj.unit) + "&nbsp;&nbsp;&nbsp;数据来源：" + obj.according;
    if (isSortInAdvance)
        pairs = sort(Array.from(obj.pairs));
    else
        pairs = Array.from(obj.pairs);
};

document.onkeydown = function (event) {
    /* 紧迫度越高，则动画持续时间越短。 */
    var 紧迫度 = 1.5;
    stylify(e("#billboard"), "--紧迫度: " + 紧迫度 + ";");
    switch (event.code) {
        case "KeyA":
            clearInterval(sid);
            sid = setInterval("autoPlay()", 0);
            break;
        case "KeyN":
            clearInterval(sid);
            autoPlay();
            break;
        case "Space":
            clearInterval(sid);
            sid = setInterval("autoPlay()", 1200 / 紧迫度);
            break;
    }
}