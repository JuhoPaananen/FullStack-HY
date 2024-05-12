import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
            title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            data-testid="title-input"
          />
        </div>
        <div>
            author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            data-testid="author-input"
          />
        </div>
        <div>
            url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            data-testid="url-input"
          />
        </div>
        <button type="submit" data-testid="submit-blog-button">create</button>
      </form>
    </div>
  )}

export default BlogForm