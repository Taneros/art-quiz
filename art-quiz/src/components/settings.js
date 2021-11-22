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
    // console.log('settings', data, localStorage.getItem(data))
    if (localStorage.getItem(data)) {
      const storedData = JSON.parse(localStorage.getItem(data))
      return storedData
    }
    return false
  },
  settings() {
    const settingsNavLink = document.getElementById('settings-nav-link')
    const settingsModal = document.getElementById('settings')
    const activateQuizModal = new bootstrap.Modal(settingsModal)

    settingsNavLink.addEventListener('click', () => {
      activateQuizModal.show()
    })

    const settings = this.getLocalStorage('settings') || {
      reset: false,
      audio: false,
      time: false,
    }

    //TODO
    /**
     *
     * function to delete local storage
     *
     * get button add event listener and
     *
     *
     *
     *
     * */

    // delete settings
    const resetSettings = document.getElementById('settings-reset')
    const saveSettings = document.getElementById('settings-save')
    // const settings =

    saveSettings.addEventListener('click', () => {
      console.log(resetSettings.checked)
      if (resetSettings.checked === true) {
        localStorage.clear()
        settings.reset = false
      }
      this.setLocalStorage('settings', settings)
    })
  },
}
