// 配置
let fileIp = 'http://218.75.42.5:10001'
// 根据环境修改设置
if (process.env.NODE_ENV === 'development') {
  // 开发环境
} else {
  // 线上环境获取当前地址
  const location = window.location
  fileIp = `${location.protocol}//${location.hostname}:10001`
}
export default {
  // 系统类型
  // 财政,工会,农经
  sysType: 'gh',
  // 项目名，对应着nginx配置
  projectName: 'contractWeb',
  userCenterName: 'ucenterGhWeb',
  fileIp: fileIp,
  openMenuAuth: false,
  // 民生银行登录地址
  msLoginUrl: `http://197.3.179.112:9000/SOAM/oauth/login?action=toOAuthLogin&client_id=714&redirect_uri=${encodeURI(`http://197.0.201.73:10000/ucenterGh/users-local-oauth/callbackLogin`)}`,
  msLogoutUrl: `http://197.3.179.112:9000/SOAM/oauth/logout?response_type=code&client_id=714&redirect_uri=${encodeURI('http://197.0.201.73:10000/ucenterGhWeb/#/redirectMS')}`
}
