var classidls = {
};
var tinterval = 1000; //毫秒
var count = 0;

while (JSON.stringify(classidls) != '{}') {
    count = count + 1;
    for (var key in classidls) {
        Request(key, classidls[key])
    }
    if(count == 10) {
        if(confirm('已经尝试了10次，但仍然有课未选上，是否继续？')){
            count = 0;
        } else {
            break;
        }
    }
    sleep(tinterval);
    console.log('正在尝试再次选课');

}
console.log("选课结束");

function Request(classid, relationid) {
    var xkzyVal = $("#zy_" + classid).val();
    var rev = eval("(" + $.ajax({
        url: "xkOper.xk?method=handleTjxk",
        data: {
            jxbid: classid,
            glJxbid: relationid,
            xkzy: xkzyVal
        },
        async: false
    }).responseText + ")");
    if (rev.success) {
        console.log("选课成功");
        delete classidls[key];
    } else {
        console.log(rev.message);
    }
}

function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};