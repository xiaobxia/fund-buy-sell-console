function getChildrenKeys(children, key, keys) {
  keys = keys || []
  for (let i = 0; i < children.length; i++) {
    const item = children[i]
    // 得要是没有禁用的
    if (!item.disabled) {
      keys.push(item[key])
    }
    // keys.push(item[key])
    if (item.children && item.children.length > 0) {
      getChildrenKeys(item.children, key, keys)
    }
  }
  return keys
}

export default {
  getChildrenKeys
}
