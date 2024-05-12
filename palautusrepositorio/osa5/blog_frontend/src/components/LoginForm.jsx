import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = (event) => {
    event.preventDefault()
    handleSubmit(username, password)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
            username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            data-testid="username-input"
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            data-testid="password-input"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm