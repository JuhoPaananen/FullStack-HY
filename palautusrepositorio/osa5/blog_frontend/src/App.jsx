import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import './index.css'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const showNotification = (message, duration = 5000) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, duration)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      showNotification('Logged out')
    } catch (exception) {
      showNotification('Logout failed')
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    const returnedBlog = await blogService.create(blogObject)
    showNotification(`A new blog ${newBlogTitle} by ${newBlogAuthor} added`)

    setBlogs(blogs.concat(returnedBlog))
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
            <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
            <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>  
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
            <input
          type="text"
          value={newBlogTitle}
          name="Title"
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        author
            <input
          type="text"
          value={newBlogAuthor}
          name="Author"
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        url
            <input
          type="text"
          value={newBlogUrl}
          name="Url"
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      
      <Notification message={errorMessage} />
      
      <div>
        {user.name} logged in  
        <button onClick={handleLogout}>logout</button>
      </div>

      <h2>create new</h2>
      {blogForm()}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}

export default App