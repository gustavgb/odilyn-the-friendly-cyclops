import Editor from 'editor/Editor'
import createGlobals from 'editor/globals'

const editor = window.editor = new Editor(document.getElementById('root'))

createGlobals(editor)
