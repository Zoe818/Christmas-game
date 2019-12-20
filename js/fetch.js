/*
  请求函数
 */

let baseUrl = 'https://hackday.itoken.team/api/christmas2019/'; // TODO
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
        credentials: 'include',
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

    try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson
    } catch (error) {
        throw new Error(error)
    }
}