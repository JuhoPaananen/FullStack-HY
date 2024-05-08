import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()

  render(<BlogForm addBlog={addBlog} />)

  const titleInput = screen.getByTestId('title-input')
  const authorInput = screen.getByTestId('author-input')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing a form...')
  await user.type(authorInput, 'test author')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: 'testing a form...',
    author: 'test author',
    url: ''
  })
})