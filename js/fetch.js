/*
  请求函数
 */

let baseUrl = 'https://hackday.itoken.team/api/christmas2019/';
// let baseUrl = 'http://123.207.188.192:8080/';
async function request(url = '', method = 'GET', data = {} ){
    // method大写
    method = String(method).toUpperCase();
    // 地址拼接
    if(url.substr(0,1)==='/') {
        url = baseUrl + url.substr(1);
    }else {
        url = baseUrl + url;
    }
    if(method === 'GET') {
        let flag = false;
        Object.keys(data).forEach( val => {
            if(!flag) {
                flag = true;
                url += '?';
            }else{
                url += '&';
            }
            url += val;
            url += '=';
            url += data[val];
        });
    }
    // 信息请求
    let requestConfig = {
        // credentials: 'include',
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        cache: "force-cache"
    };

    if (method === 'POST') {
        Object.defineProperty(requestConfig, 'body', {
            value: JSON.stringify(data)
        })
    }

    // console.log(url, requestConfig);

    try {
        const response = await window.fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson
    } catch (error) {
        throw new Error(error)
    }
}

function count(type) {
    // switch(type) {
    //     case 'enter': // 进入游戏
    //         break;
    //     case 'play': // 玩游戏
    //         break;
    //     case 'played': // 被游玩
    //         break;
    //     case 'screen': // 截图
    //         break;
    //     case 'save': // 保存头像
    //         break;
    //     case 'level1': // 第一关
    //         break;
    //     case 'level2': // 第二关
    //         break;
    //     case 'level3': // 第三关
    //         break;
    // }
    const key = 'j&@09D)';
    if(type==='avatar') {
        request('/data', 'GET', {
            data: type,
            check: md5(type + key)
        })
    }else {
        for (let i = 0; i < parseInt(type); i++) {
            request('/data', 'GET', {
                data: 'level' + type,
                check: md5('level' + type + key)
            })
        }
    }
}