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
var recv = document.getElementById("recv"),
    score=document.getElementById("score");

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
var oBox=document.getElementById('box');

	let flag = false;
    let downX = 0;
    oBox.ontouchmove=evt=>{
        // console.log(evt.clientX);
    }

    drag.ontouchmove=evt=>{
        let touch = evt.targetTouches[0];
            drag.style.left=`${touch.clientX-downX}px`;
    }
    drag.ontouchend=evt=>{
        // console.log('up');
        flag=false;
    }



	oBox.onmousemove = evt => {
		// console.log(evt.clientX);
	}
	drag.onmousedown = evt => {
		downX = evt.layerX;
		flag=true;
	}
	drag.onmousemove = evt => {
		if(flag) {
			console.log(evt);
			drag.style.left = `${evt.clientX-downX}px`;
		}
	}
	drag.onmouseup = evt => {
		console.log('up');
		flag=false;
    }
    