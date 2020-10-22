import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import toast from '../.'

const App = () => {
  return (
    <div>
      <button onClick={() => toast.success('', { position: 'bottomLeft' })}>
        Success
      </button>
      <button onClick={() => toast.error('', { position: 'topLeft' })}>
        Error
      </button>
      <button onClick={() => toast.info('', { position: 'topRight' })}>
        info
      </button>
      <button onClick={() => toast.warning('', { position: 'bottomRight' })}>
        warning
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
