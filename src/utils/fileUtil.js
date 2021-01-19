// 也可以使用file-saver库操作
function getFileExt(text) {
  // 获取最后一个.的位置
  const index = text.lastIndexOf('.')
  // 获取后缀
  return text.substr(index + 1)
}
export default {
  // 通过base64创建图片
  createBase64Img(type, str) {
    return `data:image/${type};base64,${str}`
  },
  // 下载文件流
  downloadExcel(data, name, type) {
    const blob = new Blob(
      [data],
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }
    )
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob) // 创建下载的链接
    downloadElement.href = href
    downloadElement.download = `${name}.${type}` // 下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  },
  // 下载文件流
  downloadFile(data, name) {
    const blob = new Blob(
      [data]
    )
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob) // 创建下载的链接
    downloadElement.href = href
    downloadElement.download = `${name}` // 下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  },
  // 创建上传的FormData
  createUploadFormData(target) {
    target = target || {}
    const formData = new FormData()
    // 向 formData 对象中添加文件
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        formData.append(key, target[key])
      }
    }
    return formData
  },
  // 获取文件后缀名
  getFileExt,
  // 判断是不是图片类型
  isImage(text) {
    const ext = getFileExt(text)
    return ['png', 'gif', 'jpg', 'bmp'].indexOf(ext) !== -1
  }
}
