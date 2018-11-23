console.log('hello world!')

let state = {
  level: 'test'
}

window.runDebug = () => {
  sessionStorage.setItem('debug', JSON.stringify(state))

  window.run()
}

window.runWithoutDebug = () => {
  sessionStorage.removeItem('debug')

  window.run()
}

window.run = () => {
  sessionStorage.setItem('debugSave', JSON.stringify(state))

  location.replace('/')
}

window.addEventListener('load', () => {
  if (sessionStorage.getItem('debugSave')) {
    state = JSON.parse(sessionStorage.getItem('debugSave'))
  }
})
