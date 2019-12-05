(function(){
    document.onkeydown = function(e){
        var e = e || window.event;
        if(e.keyCode == 37){
            //键盘向左键
            recvMove("left");
        }else if(e.keyCode == 39){
            //键盘向右键
            recvMove("right");
        }
    }
})();


var recv = document.getElementById("recv");

//控制方向移动
function recvMove(direction){
    if(direction == "left"){
        if(recv.offsetLeft > 0){
            recv.style.left = (recv.offsetLeft-20 < 0? 0 : recv.offsetLeft-20)+"px";
        }
    }
    if(direction == "right"){
        if(recv.offsetLeft < 280){
            recv.style.left = (recv.offsetLeft+20 > 280? 280 : recv.offsetLeft+20)+"px";
        }
    }
}

let drag = document.getElementById('recv');
var body=document.querySelector('body');
var startIndex,endIndex,touchIndex,tranX;
	let flag = false;
    let appWidth = body.clientWidth;

//触摸移动

    drag.ontouchmove=evt=>{
        let appWidth = body.clientWidth;
        let touch = evt.targetTouches[0];
            drag.style.left=`${touch.clientX}px`;
            //console.log(touch.clientX);
            if(touch.clientX>appWidth-100)
            {
                drag.style.left=`${appWidth-100}px`;
            }
            else if(touch.clientX<0)
            {
                drag.style.left=0;
            }
    }
    drag.ontouchend=evt=>{
        // console.log('up');
        flag=false;
    }