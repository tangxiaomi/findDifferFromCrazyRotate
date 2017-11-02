var obstacleInterval;
var timer;
var nodes = [];
var num = 0;
var z = 30.00;
var level = 1;
var n = 0;
var btn = document.querySelector("button");
var aBtn = document.querySelectorAll(".wrap a");
var ulSquare = document.querySelector(".ul-square");
var restart = document.querySelector(".restart");
var sec = document.getElementById("sec");
var uls = document.querySelector(".differSquare");
var li_1 = document.getElementsByClassName("list1")[0];
var score = document.getElementById("score");
var back = document.getElementById("back");
var crazyRotate = document.querySelector(".crazyRotate");
var revertRotate =document.querySelector(".revertRotate");
//护眼模式的逻辑
var turnOff = document.getElementById("turnOff");
var openLightFlag = false;
turnOff.onclick = function () {
    openLightFlag = !openLightFlag;
    if (openLightFlag === true) {
        document.body.style.background = "rgb(199,237,204)";
        turnOff.setAttribute("data-info", "关闭护眼模式");
    } else {
        document.body.style.background = "";
        turnOff.setAttribute("data-info", "打开护眼模式");
    }
}
//增加游戏的难度，让其不停的旋转
crazyRotate.onclick = function(){
    ulSquare.className += " rotate";
}
//恢复成一般难度
revertRotate.onclick = function(){
    ulSquare.className = "ul-square";
}
btn.onclick = function () {
    // 1.计时器
    timer = setInterval(function () {
        z -= 0.01;
        z = z.toFixed(2);
        sec.innerHTML = z;
        if (z <= 0) {
            clearInterval(timer);
            if (n < 3) {
                alert("GAME OVER!" + "  " + "等级:睁眼瞎");
            } else if (n >= 20) {
                alert("GAME OVER!" + "  " + "等级:超神");
            } else if (n >= 4) {
                alert("GAME OVER!" + "  " + "等级:火眼金睛");
            } else {
                alert("GAME OVER!" + "  " + "等级:高度近视");
            }
            back.style.display = "block";
        }
    }, 10)
    // 2.点击按钮消失,第一个li消失
    btn.remove();
    li_1.remove();
    turnOff.remove();
    // 3.添加4个li>img
    app();

    function app() {
        clearInterval(obstacleInterval);
        level += 1;
        for (var i = 0; i < level * level; i++) {
            var newLi = document.createElement("li");
            uls.appendChild(newLi);
            var newImg = document.createElement("img");
            newLi.appendChild(newImg);
            nodes.push(newLi);
            newLi.style.width = 100 / level + "%";
            newLi.id = "value"
            newLi.style.float = "left";
            newLi.style.zIndex = 9999;
            newImg.style.display = "block";
            newImg.style.width = 100 + "%";
            newImg.src = "img/1.png";
            newLi.style.backgroundColor = "rgb(" + rand(50, 255) + "," + rand(50, 255) + "," + rand(50, 255) +
                ")";
        }
        var x = rand(0, level * level - 1);
        var imgs1 = document.querySelectorAll("img");
        imgs1[x].src = "img/2.png";
        var li = document.querySelectorAll("#value");

        //当你的正确率达到6个的时候，将会出现障碍
        var select;
        if (n > 5) {
            score.style.color="black";
            obstacleInterval = setInterval(function () {
                if (select) select.style.backgroundColor = "rgb(" + rand(50, 255) + "," + rand(50,
                        255) + "," + rand(50, 255) +
                    ")";
                var i = parseInt(Math.random() * 1000) % li.length;
                select = li[i];
                select.style.backgroundColor = "red";
            }, 5)
        }else{
            score.style.color="red";
        }

        //如果你点的不是香蕉，将会让分数减少
        for (let i = 0; i < level * level; i++) {
            if (i != x) {
                li[i].onclick = function () {
                    n -= 1;
                    if (n < 0) {
                        n = 0;
                    }
                    score.innerHTML = n;
                    if (n <= 0) {
                        // clearInterval(timer);
                        back.style.display = "block";
                        // restart.innerHTML = "您的分数是0，请重新开始";
                    }
                }
            }
        }

        li[x].onclick = function () {
            for (var i = 0; i < level * level; i++) {
                li[i].remove(this);
            }
            n += 1;
            score.innerHTML = n;
            if (level > 10) {
                level = 10;
            }
            app();
        }
    }
}



// 随机函数
function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}