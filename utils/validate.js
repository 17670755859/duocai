/**
 * Created by zhanghuai on 19/10/1.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 校验手机号码
 */
export function validPhone(str) {
	let reg = /^1[3456789]\d{9}$/
	return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 校验座机号码
 */
export function validMobile(str) {
	let reg =  /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/
	return reg.test(str)
}

/**
 * @param {string} str
 * @return {Boolean}
 * 校验中文汉字
 */
export function validZh(str) {
	let reg = /^[\u0391-\uFFE5]+$/
	return reg.test(str)
}

/**
 * @param {string} str
 * @return {Boolean}
 * 校验英文字母
 */
export function validLetter(str) {
	let reg = /^[a-zA-Z]+$/
	return reg.test(str)
}

/**
 * @param {number} str
 * @return {Boolean}
 * 校验整数类型
 */
export function validInteger(str) {
	let reg = /^[-+]?\d*$/
	return reg.test(str)
}

/**
 * @param {number} str
 * @return {Boolean}
 * 校验大小写或数字类型
 */
export function validString(str) {
	let reg = /^[a-zA-Z0-9_]+$/
	return reg.test(str)
}

/**
 * @param {number} str
 * @return {Boolean}
 * 校验邮箱格式
 */
export function validEmail(str) {
	let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	return reg.test(str)
}

/**
 * @param {number} str
 * @return {Boolean}
 * 校验邮编 （只能为6位）
 */
export function validZIP(str) {
	let reg = /^\d{6}$/
	return reg.test(str)
}

/**
 * @param {number} str
 * @return {Boolean}
 * 校验身份证号码
 */
export function validIdCard(str) {
	let reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
	return reg.test(str)
}

/**
 * @param {number} str
 * @return {Boolean}
 * 校验Url
 */
export function validUrl(str) {
	let reg = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
	return reg.test(str)
}