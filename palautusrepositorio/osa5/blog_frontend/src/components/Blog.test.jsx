import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import * as blogServie from '../services/blogs'

vi.mock('../services/blogs', () => ({
  update: vi.fn(() => Promise.resolve({ ...blog, likes: blog.likes + 1 }))
}))

const blog = {
  title: 'Blog title for testing',
  author: 'Jack Nilson',
  url: 'http://www.blogfortesting.com',
  likes: 5,
  user: {
    name: 'John Doe'
  }
}

test('renders only title and author at first', () => {
  render(<Blog blog={blog} />)
  expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeDefined()
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(`${blog.likes} likes`)).toBeNull()
})

test('renders url and likes when view button is clicked', async () => {
  const mockOnUpdate = vi.fn()
  const mockOnRemove = vi.fn()

  render(<Blog blog={blog} onUpdate={mockOnUpdate} onRemove={mockOnRemove} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText(blog.url)).toBeDefined()
  expect(screen.getByText(`${blog.likes} likes`)).toBeDefined()
  expect(screen.getByText(blog.user.name)).toBeDefined()
})

test('Event handler is called twice when like button is clicked twice', async () => {
  const mockOnUpdate = vi.fn()
  const mockOnRemove = vi.fn()

  render(<Blog blog={blog} onUpdate={mockOnUpdate} onRemove={mockOnRemove} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  console.log(mockOnUpdate.mock.calls)
  console.log(blogServie.update.mock.calls)

  expect(blogServie.update).toHaveBeenCalledTimes(2)
})