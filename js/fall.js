let gameLogic = function() {
	return (function() {
		const phantom=50;		// 接礼物误差px
		const itemWidth=50;	// 礼物的宽度px
		let dom;				// 容器DOM节点
		let recver;				// recevier DOM节点
		let appWidth;			// 屏幕宽度
		let appHeight;			// 屏幕高度
		let timer={};			// timer object
		let inter={};			// intervaler object

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
			console.log('appHeight'+appHeight);
		}

		/**
		 * Random 起始下落的左下角x坐标
		 * @param width 屏幕宽度
		 */
		function randomX() {
			let ran = Math.random();
			let max = appWidth-itemWidth;
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
			let item = document.createElement('div');
			item.setAttribute('class', 'item'); // TODO class name
			item.setAttribute('style', `left: ${beginX}px;background-image: url('${type.img}')`);
			dom.appendChild(item);
			setAnima(item, sec);
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
					console.log(type);
					dom.dispatchEvent(new CustomEvent('receive',{
						detail: {
							score: type
						}
					}));
				}
				delete(timer[item]);
			}, sec);
			timer[timerId] = timerId;
		}

		/**
		 * 设置动画
		 * @params item	giftDom节点
		 * @params sec	到底部的时间
		 * @return intId intervalId
		 */
		function setAnima(item, sec) {
			let intervalSec = 15;
			let addHeight = appHeight/sec*intervalSec;

			let intId = setInterval(() => {
				let offTop = item.offsetTop;
				if(offTop>=appHeight) {
					// 降落完成
					// TODO 删除DOM节点
					clearInterval(intId);
					delete(inter[intId]);

				}
				else{
					// 降落继续
					item.style.top = (offTop+addHeight)+'px';
				}
			}, intervalSec);
			inter[intId] = intId;
			return intId;
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
				return string;
			}
		}
	})()
}