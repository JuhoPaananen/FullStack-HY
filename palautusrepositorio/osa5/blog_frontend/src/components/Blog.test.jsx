import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import * as blogService from '../services/blogs'

describe('Blog component', () => {
  let blog, handleLikeMock

  beforeEach(() => {
    blog = {
      id: '123',
      title: 'Blog title for testing',
      author: 'Jack Nilson',
      url: 'http://www.blogfortesting.com',
      likes: 5,
      user: {
        name: 'John Doe'
      }
    }
    handleLikeMock = vi.fn()

    render(<Blog blog={blog} onLike={handleLikeMock} onRemove={vi.fn()} />)
  })

  it('renders only title and author at first', () => {
    expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeDefined()
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText(`${blog.likes} likes`)).toBeNull()
  })

  it('renders url and likes when view button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText(blog.url)).toBeDefined()
    expect(screen.getByText(`${blog.likes} likes`)).toBeDefined()
    expect(screen.getByText(blog.user.name)).toBeDefined()
  })

  it('calls onUpdate when the like button is clicked', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('view'))
    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLikeMock).toHaveBeenCalledTimes(2)
  })
})