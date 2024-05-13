import { useState } from 'react'

const Blog = ({ blog, onLike, onRemove, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    marginLeft: 5
  }

  return (
    <div style={blogStyle} className="blog-item">
      <div>
        {blog.title} {blog.author}
        <button style={buttonStyle} onClick={toggleDetails}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes
            <button style={buttonStyle} onClick={onLike}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          {user.username === blog.user?.username &&
            <button style={buttonStyle} onClick={onRemove}>remove</button>
          }
        </div>
      )}
    </div>
  )
}

export default Blog