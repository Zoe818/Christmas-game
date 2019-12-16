import fetch from './fetch'

/**
 * 分数上传
 * @param data
 * @returns {Promise<Response>}
 */

export const uploadScore = data => fetch('/score', 'POST', data);

/**
 * 排行榜数据获取
 * @param data
 * @returns {Promise<Response>}
 */

export const getRankList = data => fetch('/score', 'GET', data);

/**
 * 图片处理
 * @param data
 * @returns {Promise<Response>} 包含生成图片的base64
 */

export const genImage = data => fetch('/image', 'POST', data);

/**
 * 用户提交记录数据获取
 * @param data
 * @returns {Promise<Response>}
 */

export const getUserRecord = data => fetch('/imge', 'GET', data);