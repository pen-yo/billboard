function autoPlay() {
    if (pairs[bit] == undefined)
        if (isSortInAdvance) {
            clearInterval(sid);
            return;
        } else {
            e("#data").innerText = "";
            isSortInAdvance = true;
            pairs = sort(Array.from(getObjFromJSON(path).pairs));
            bit = 0;
            sid = setInterval("autoPlay()", 0);
            return;
        }
    var p = pairs[bit++];
    if (p.value > biggest)
        biggest = p.value;
    var i = document.createElement("div");
    i.setAttribute("class", "item");
    stylify(i, "--themecolor: " + smartColor() + ";");
    i.innerHTML = `
            <div class="key-box">
                <div class="key">`+ p.key + `</div>
            </div>
            <div class="value">`+ p.value + `</div>
        `;
    Array.from(e(".item")).forEach(i => {
        i.setAttribute("class", "item");
        i.offsetWidth = i.offsetWidth;
        i.setAttribute("class", "item untop");
    });
    e("#data").insertBefore(i, e("#data").firstChild);
    Array.from(e(".item")).forEach(i => {
        stylify(i, "--width: " + (parseFloat(i.getElementsByClassName("value")[0].innerText, 10) / biggest) + ";");
    });
    if (p.hasOwnProperty("thumb"))
        stylify(e("#thumb"), "background-image: url(" + p.thumb + ");");
}

function e(eCode) {
    switch (eCode[0]) {
        case "#":
            return document.getElementById(eCode.slice(1));
        case ".":
            return document.getElementsByClassName(eCode.slice(1));
        default:
            return document.getElementsByTagName(eCode);
    }
}

function getObjFromJSON(filePath) {
    return $.parseJSON($.ajax({
        url: filePath,
        dataType: "json",
        async: false
    }).responseText);
}

function quickGeneratePairs(keys, values) {
    var keyArr = keys.split(",");
    var valueArr = values.split(",");
    if (keyArr.length != valueArr.length)
        return "Invalid input!";
    var pairs = "";
    for (var i = 0; i < keyArr.length; i++)
        pairs += `{"key": "` + keyArr[i] + `","value": ` + valueArr[i] + `},`;
    return pairs.substring(0, pairs.length - 1);
}

function r(upper) {
    return Math.random() * upper;
}

function smartColor() {
    const R = r(255), G = r(255), B = r(255);
    const LIM = 255 * (12 / 16);
    if (R > LIM && G > LIM && B > LIM)
        return smartColor();
    else
        return "rgb(" + R + ", " + G + ", " + B + ")";
}

function sort(arr) {
    for (var i = 0; i < arr.length - 1; i++)
        for (var j = 0; j < arr.length - 1 - i; j++)
            if (arr[j].value > arr[j + 1].value) {
                var t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
            }
    return arr;
}

function stylify(e, cssText) {
    if (e.style.cssText == undefined)
        e.style.cssText = "";
    e.style.cssText += cssText;
    return e;
}