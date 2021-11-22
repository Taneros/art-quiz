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
    const resetSettings = document.getElementById('settings-reset')
    const saveSettings = document.getElementById('settings-save')
    const audioSettings = document.getElementById('settings-audio')

    const settings = this.getLocalStorage('settings') || {
      reset: false,
      audio: false,
      time: false,
    }

    settingsNavLink.addEventListener('click', () => {
      console.log('settings audio', settings.audio)
      if (settings.audio) audioSettings.checked = true
      activateQuizModal.show()
    })

    //TODO
    /**
     *
     *
     *
     * */

    saveSettings.addEventListener('click', () => {
      console.log(resetSettings.checked)

      if (audioSettings.checked && !resetSettings.checked) {
        settings.audio = true
      } else if (!audioSettings.checked) settings.audio = false
      if (resetSettings.checked === true) {
        localStorage.clear()
        settings.reset = false
        settings.audio = false
        settings.time = false
      }
      this.setLocalStorage('settings', settings)
    })

    // console.log('settings', settings)
    return settings
  },
}
