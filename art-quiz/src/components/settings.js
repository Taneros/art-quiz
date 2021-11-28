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
    const audioLevelSettings = document.getElementById('audio-level')

    const settings = this.getLocalStorage('settings') || {
      reset: false,
      audio: false,
      audio_level: 0.5,
      time: false,
    }

    settingsNavLink.addEventListener('click', () => {
      // console.log('settings audio', settings.audio)
      audioSettings.checked = settings.audio
      audioLevelSettings.value = settings.audio_level * 5
      activateQuizModal.show()
    })

    audioLevelSettings.addEventListener('change', (e) => {
      // console.log('audioLevelSettings', e.target.value)
      settings.audio_level = Number(e.target.value) / 5
    })

    //TODO
    /**
     *
     *
     *
     * */

    saveSettings.addEventListener('click', () => {
      
      if (resetSettings.checked === true) {
        console.log(resetSettings.checked)
        localStorage.clear()
        settings.reset = false
        settings.audio = false
        settings.time = false
        settings.audio_level = 0.5
        location.href = location.href.split('#')[0]
      }
      else {
        settings.audio = audioSettings.checked ? true : false
        settings.audio_level = Number(audioLevelSettings.value) / 5
      }
      this.setLocalStorage('settings', settings)
    })

    // console.log('settings', settings)
    return settings
  },
}
