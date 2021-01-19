class LocalStorage {
  formatKey(key) {
    return `newgrand-${key}`
  }
  setItem(key, value) {
    localStorage.setItem(this.formatKey(key), JSON.stringify(value))
  }
  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(this.formatKey(key)))
    } catch (err) {
      return localStorage.getItem(this.formatKey(key))
    }
  }
  removeItem(key) {
    return localStorage.removeItem(this.formatKey(key))
  }
  clear() {
    localStorage.clear()
  }
}

export default new LocalStorage()
