import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import './index.css'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, duration = 5000) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, duration)
  }

  const handleLogin = async (username, password) => {
    try {
        const user = await loginService.login({
            username, password,
        });
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
        setUser(user);
        showNotification('Logged in successfully');
    } catch (exception) {
        showNotification('Wrong credentials');
    }
  };

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

  const addBlog = async (blogData) => {
    try {
      const returnedBlog = await blogService.create(blogData);
      showNotification(`A new blog ${blogData.title} by ${blogData.author} added`);
      setBlogs(blogs.concat(returnedBlog));
    } catch (error) {
      showNotification('Failed to add blog');
      console.error(error);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Blogs</h2>
        <Togglable buttonLabel='Login'>
          <LoginForm handleSubmit={handleLogin} />
        </Togglable>
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

      <Togglable buttonLabel='New blog'>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}

export default App