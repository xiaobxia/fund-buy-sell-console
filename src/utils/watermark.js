// 水印工具
export default function watermark(element, config) {
  config = config || {}
  // 获取元素的坐标
  if (!element) return
  // 默认配置
  const _config = {
    text1: '水印文本1', // 文本1
    text2: '水印文本2', // 文本2
    start_x: 0, // x轴起始位置
    start_y: 0, // y轴起始位置
    width: 200, // 宽度
    height: 40, // 长度
    fontSize: 20, // 字体
    color: '#aaa', // 字色
    alpha: 0.4, // 透明度
    rotate: 15, // 倾斜度
    ...config
  }
  _config.space_x = _config.width / 2 // x轴间距
  _config.space_y = _config.height // y轴间距
  // 节点的总宽度
  const total_width = element.scrollWidth
  // 节点的总高度
  const total_height = element.scrollHeight
  const markSize = Math.sqrt(Math.pow(total_width, 2) + Math.pow(total_height, 2))
  // 创建文本碎片，用于包含所有的插入节点
  const mark = document.createDocumentFragment()
  // 水印节点的起始坐标
  let x = _config.start_x
  let y = _config.start_y
  let lastX = _config.start_x
  // 先循环y轴插入水印
  do {
    // 再循环x轴插入水印
    do {
      // 创建单个水印节点
      const item = document.createElement('div')
      item.className = 'watermark-item'
      // 设置节点的样式
      item.style.position = 'absolute'
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      item.style.width = `${_config.width}px`
      item.style.height = `${_config.height}px`
      item.style.fontSize = `${_config.fontSize}px`
      item.style.color = _config.color
      item.style.textAlign = 'center'
      // 创建text1水印节点
      const text1 = document.createElement('div')
      text1.appendChild(document.createTextNode(_config.text1))
      item.append(text1)
      // 创建text2水印节点
      const text2 = document.createElement('div')
      text2.appendChild(document.createTextNode(_config.text2))
      item.append(text2)
      // 添加水印节点到文本碎片
      mark.append(item)
      // x坐标递增
      x = x + _config.width + _config.space_x
      // 超出文本右侧坐标停止插入
    } while ((total_width + (_config.width + _config.space_x) * 1.5) > x)
    // 重置x初始坐标
    if (lastX === _config.start_x) {
      x = _config.start_x - (_config.width + _config.space_x) / 2
    } else {
      x = _config.start_x
    }
    lastX = x
    // y坐标递增
    y = y + _config.height + _config.space_y
    // 超出文本底部坐标停止插入
  } while ((total_height + (_config.height + _config.space_y) * 2) > y)
  // 插入文档碎片
  const markWrap = document.createElement('div')
  markWrap.style.position = 'absolute'
  markWrap.style.zIndex = 99999
  markWrap.style.left = `${(total_width - markSize) / 2}px`
  markWrap.style.top = `${(total_height - markSize) / 2}px`
  markWrap.style.width = `${markSize}px`
  markWrap.style.height = `${markSize}px`
  markWrap.style.opacity = _config.alpha
  markWrap.style.filter = `alpha(opacity=${_config.alpha * 100})`
  markWrap.style.webkitTransform = `rotate(-${_config.rotate}deg)`
  markWrap.style.MozTransform = `rotate(-${_config.rotate}deg)`
  markWrap.style.msTransform = `rotate(-${_config.rotate}deg)`
  markWrap.style.OTransform = `rotate(-${_config.rotate}deg)`
  markWrap.style.transform = `rotate(-${_config.rotate}deg)`
  markWrap.style.pointerEvents = 'none' // 让水印不遮挡页面的点击事件
  markWrap.append(mark)
  element.append(markWrap)
}
