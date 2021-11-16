// TODO
/**
 *
 * store settings
 *
 * last played card and category
 *
 * author_quiz {cat: , scrore: '' }
 *
 * picture_quiz {cat: , scrore: ''}
 *
 * store any passed settings in what parameter? and data to store
 */

// window.addEventListener('load', getLocalStorage)
// window.addEventListener('beforeunload', setLocalStorage)

export default {
  setLocalStorage(data_name, data) {
    localStorage.setItem(data_name, JSON.stringify(data))
  },

  getLocalStorage(data) {
    if (localStorage.getItem(data)) {
      const storedData = JSON.parse(localStorage.getItem(data))
      return storedData
    }
    return false
  },
}
