const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs have id field', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Test blog",
        author: "Test author",
        url: "http://www.test.com",
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain(
        'Test blog'
    )
})

test('new blog without likes gets 0 likes', async () => {
    const newBlog = {
        title: "Test blog",
        author: "Test author",
        url: "http://www.test.com"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    expect(likes[likes.length - 1]).toBe(0)
})

test('new blog without title returns 400', async () => {
    const newBlog = {
        author: "Test author",
        url: "http://www.test.com",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
})

test('new blog without url returns 400', async () => {
    const newBlog = {
        title: "Test blog",
        author: "Test author",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
})

test('blog can be deleted', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body.length).toBe(initialBlogs.length - 1)
})

test('blog can be updated', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    const newBlog = {
        title: "Test blog",
        author: "Test author",
        url: "http://www.test.com",
        likes: 1
    }

    await api
        .put(`/api/blogs/${id}`)
        .send(newBlog)
        .expect(200)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body[0].likes).toBe(1)
})

afterAll(async () => {
    await mongoose.connection.close()
})
