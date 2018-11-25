const createGlobals = (editorInstance) => {
  window.runDebug = () => {
    sessionStorage.setItem('debug', JSON.stringify(editorInstance.state))

    window.run()
  }

  window.runWithoutDebug = () => {
    sessionStorage.removeItem('debug')

    window.run()
  }

  window.run = () => {
    sessionStorage.setItem('debugSave', JSON.stringify(editorInstance.state))

    location.replace('/')
  }

  if (sessionStorage.getItem('debugSave')) {
    editorInstance.state = JSON.parse(sessionStorage.getItem('debugSave'))
  }
}

export default createGlobals
