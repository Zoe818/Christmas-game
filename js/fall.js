let gameLogic = function() {
	return (function() {
		const phantom=50;		// 接礼物误差px
		const itemWidth=60;	// 礼物的宽度px
		const sideWidth=10;
		let dom;				// 容器DOM节点
		let recver;				// recevier DOM节点
		let appWidth;			// 屏幕宽度
		let appHeight;			// 屏幕高度
		let timer={};			// timer object
		let inter={};			// intervaler object
		let tmp = {

		};
		let have = {};

		/**
		 * 初始化gameController
		 * @params obj DOM节点
		 * @params recvObj 接收的DOM节点
		 */
		function init(obj, recvObj) {
			dom = obj;
			recver = recvObj;
			appWidth = obj.clientWidth;
			appHeight = obj.clientHeight;
			// console.log('appHeight'+appHeight);
		}

		/**
		 * Random 起始下落的左下角x坐标
		 */
		function randomX() {
			let ran = Math.random();
			let max = appWidth-itemWidth-sideWidth;
			return ran*max;
		}

		/**
		 * 生成item
		 * @params sec 下落到底部的时间ms
		 * @params type item类型，'gift'是礼物，'boom'是炸弹
		 * @return int 初始x坐标
		 */
		function genItem(sec, type) {
			let beginX = randomX();
			let item = document.createElement('img');
			item.setAttribute('class', 'item');
			item.src = type.img;
			item.setAttribute('style', `left: ${beginX}px;`);
			item.style.animation = `myfall ${sec}ms linear`;
			item.style.WebkitAnimation = `myfall ${sec}ms linear`;
            setTimeout( () => {
                if(have[item]!==undefined)deleNode(item);
            },sec);
            have[item]=true;
            dom.appendChild(item);

            // setAnima(item, sec);
			judgeRecv(item, type.score, beginX, sec);
		}

		/**
		 * @params item 礼物dom节点
		 * @params type 礼物or炸弹
		 * @params x 	x坐标
		 * @params sec	下落到底部的时间ms
		 */
		function judgeRecv(item, type, x, sec) {
			let timerId = setTimeout( () => {
				let recvX = recver.offsetLeft;
				if(x+phantom>=recvX && x<=recvX+phantom) {
					// console.log(type);
					dom.dispatchEvent(new CustomEvent('receive',{
						detail: {
							score: type
						}
					}));
					deleNode(item);
					delete(have[item]);
				}
				delete(timer[timerId]);
			}, sec*0.92);
			timer[timerId] = timerId;
		}

		/**
		 * 设置动画
		 * @params item	giftDom节点
		 * @params sec	到底部的时间
		 * @return intId intervalId
		 */
		function setAnima(item, sec) {
			// item.style.animation = `myfall ${sec}s;`;
			// item.style['-webkit-animation']=`myfall ${sec}s;`;
			// setTimeout( () => {
			// 	deleNode(item);
			// },sec);

			// let intervalSec = 30;
			// let addHeight = appHeight/sec*intervalSec;
            //
			// let intId = setInterval(() => {
			// 	let offTop = item.offsetTop;
			// 	if(offTop>=appHeight) {
			// 		// 降落完成
			// 		// TODO 删除DOM节点
			// 		clearInterval(intId);
			// 		delete(inter[intId]);
			// 		deleNode(item);
			// 	}
			// 	else{
			// 		// 降落继续
			// 		item.style.top = (offTop+addHeight)+'px';
			// 	}
			// }, intervalSec);
			// inter[intId] = intId;
			// return intId;
		}

		/**
		 * 删除dom节点
		 * @params item 要删除的节点
		 */
		function deleNode(item) {
			dom.removeChild(item);
		}

		return {
			/**
			 * 初始化gameController
			 * @params obj DOM节点
			 * @params recvObj 接收的DOM节点
			 */
			init: (obj, recv) => {
				init(obj, recv);
			},
			/**
			 * 生成item
			 * @params sec 下落到底部的时间ms
			 * @params type item类型，'gift'是礼物，'boom'是炸弹
			 * @return int 初始x坐标
			 */
			gen: (sec=1500, item='gift') => {
				genItem(sec,item);
			},

			/**
			 * 测试本js
			 */
			test: () => {
				let string = 'appWidth:'+appWidth;
				console.log(string);
			}
		}
	})()
}