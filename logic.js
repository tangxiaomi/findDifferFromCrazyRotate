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
    // 计时器
    timer = setInterval(function () {
        z -= 0.01;
        z = z.toFixed(2);
        sec.innerHTML = z;
        if (z <= 0) {
            clearInterval(timer);
            if (n < 5) {
                alert("GAME OVER!"+ "     " + "Grade: Poor eyesight");
                restart.innerHTML = "Fighting!<br>Restart"
            } else if (n >= 20) {
                alert("GAME OVER!" + "    " + "Grade: Super God");
                restart.innerHTML = "Unbelievable😊!<br>Restart"
            } else if (n >= 8) {
                alert("GAME OVER!" + "    " + "Grade: Eye of fire");
                restart.innerHTML = "You are wonderful👍!<br>Restart"
            } else {
                alert("GAME OVER!" + "    " + "Grade: A little bad eyesight");
                restart.innerHTML = "Keep it up🙂!<br>Restart"
            }
            back.style.display = "block";
        }
    }, 10)
    // 点击按钮消失,第一个li消失
    btn.remove();
    li_1.remove();
    turnOff.remove();
    app();
  //添加新的元素
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
            newImg.src = "img/cherry.png";
            newLi.style.backgroundColor = "rgb(" + rand(50, 255) + "," + rand(50, 255) + "," + rand(50, 255) +
                ")";
        }
        var x = rand(0, level * level - 1);
        var imgs1 = document.querySelectorAll("img");
        imgs1[x].src = "img/banana.png";
        var li = document.querySelectorAll("#value");

        //当你的正确率达到7个的时候，将会出现闪烁障碍
        var select;
        if (n > 6) {
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
                        back.style.display = "block";
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


// 创建随机数
function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}