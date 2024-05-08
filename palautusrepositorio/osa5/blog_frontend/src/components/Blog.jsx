import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onUpdate, onRemove }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

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

  const handleLikeClick = async () => {
    const updatedLikes = likes + 1
    setLikes(updatedLikes)

    try {
      const updatedBlog = await blogService.update(blog.id, { ...blog, likes: updatedLikes })
      onUpdate(updatedBlog)
    } catch (error) {
      setLikes(likes - 1)
    }
  }

  return (
    <div style={blogStyle}>
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
            {likes} likes
            <button style={buttonStyle} onClick={handleLikeClick}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          <button style={buttonStyle} onClick={onRemove}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog