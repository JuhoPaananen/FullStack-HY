const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)
const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const initialUsers = [
    {
        username: "testeri",
        name: "Unto Useri",
        password: "testpassword"
    },
    {
        username: "testaaja",
        name: "Testo Testaaja",
        password: "testpassword2"
    }
]

describe('when there is initially some users saved', () => {
    
    beforeEach(async () => {
        await User.deleteMany({})
    
        for (let user of initialUsers) {
            let passwordHash = await bcrypt.hash(user.password, 10)
            user.passwordHash = passwordHash
            let userObject = new User(user)
            await userObject.save()
        }
    })
    
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('all users are returned', async () => {
        const response = await api.get('/api/users')
    
        expect(response.body.length).toBe(initialUsers.length)
    })
    
    test('a specific user is within the returned users', async () => {
        const response = await api.get('/api/users')
    
        const usernames = response.body.map(r => r.username)
    
        expect(usernames).toContain(
            'testeri'
        )
    })

    test('a user can be added', async () => {
        const newUser = {
            username: "testi",
            name: "Testi Testinen",
            password: "testpassword3"
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(initialUsers.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('a user without username is not added', async () => {
        const newUser = {
            name: "Testi Testinen",
            password: "testpassword3"
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    
        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(initialUsers.length)
    })

    test('a user without password is not added', async () => {
        const newUser = {
            username: "testi",
            name: "Testi Testinen"
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    
        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(initialUsers.length)
    })

    test('a user with too short username is not added', async () => {
        const newUser = {
            username: "te",
            name: "Testi Testinen",
            password: "testpassword3"
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    
        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(initialUsers.length)
    })

    test('a user with same username as existing user is not added', async () => {
        const newUser = {
            username: "testeri",
            name: "Testi Testinen",
            password: "testpassword3"
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    
        const usersAtEnd = await usersInDb()
        expect(usersAtEnd.length).toBe(initialUsers.length)
    })
})
