const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addBlog } = require('./helper')
const blog = require('../../blog_backend/models/blog')

describe('Blogs app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Juho Testaaja',
        username: 'jtestaaja',
        password: 'salainen'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Eternal Blogger',
        username: 'eternalblogger',
        password: 'salainen'
        }
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'jtestaaja', 'salainen')
        await page.waitForSelector('div:has-text("Juho Testaaja logged in")')
    })
  
    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'jtestaaja', 'wrongpassword')
        const errorMessage = await page.waitForSelector('text=Wrong credentials');
        expect(errorMessage).toBeTruthy();
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'jtestaaja', 'salainen')
        await addBlog(page, 'One blog to find them all', 'Frodo Baggins', 'www.howyoulearnfs.com')
    })

    test('a new blog can be created', async ({ page }) => {
        await addBlog(page, 'Title for testing', 'Jack Russell', 'www.howyoulearnfs.com')
        await expect(page.locator('text=Title for testing Jack Russell')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
        await page.click('text=view')
        await page.click('text=like')
        await page.waitForSelector('text=1 likes')
        await page.click('text=like')
        await page.waitForSelector('text=2 likes')
    })

    test('own blog can be removed', async ({ page }) => {
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm')
            expect(dialog.message()).toBe('Remove blog One blog to find them all by Frodo Baggins?')
            await dialog.accept()
        })
        const locator = await page.locator('text=One blog to find them all Frodo Baggins')
        await locator.click('text=view')
        await locator.click('text=Remove')
        expect(locator).toBeHidden
    })

    test('blog added by another user can not be removed', async ({ page }) => {
        await page.click('text=logout')
        loginWith(page, 'eternalblogger', 'salainen')
        const locator = await page.locator('text=One blog to find them all Frodo Baggins')
        await locator.click('text=view')
        const removeButton = await page.locator('text=remove')
        await expect(removeButton).toBeHidden()
    })

    test('blogs are ordered by likes', async ({ page }) => {
        await addBlog(page, 'Title for testing', 'Jack Russell', 'www.howyoulearnfs.com')
        await page.waitForSelector('text=Title for testing Jack Russell')

        const firstBlog = await page.locator('text=One blog to find them all Frodo Baggins')
        const secondBlog = await page.locator('text=Title for testing Jack Russell')

        expect(firstBlog).toBeTruthy()
        expect(secondBlog).toBeTruthy()

        await firstBlog.locator('text=view').click()
        await page.getByText('like').click()
        await page.waitForSelector('text=1 likes')
        await page.getByText('hide').click()

        const blogTitles = await page.locator('.blog-item').allTextContents()

        // console.log(blogTitles)

        expect(blogTitles[0]).toContain('One blog to find them all Frodo Baggins')

        await secondBlog.locator('text=view').click()
        await page.getByText('like').click()
        await page.waitForSelector('text=1 likes')
        await page.getByText('like').click()
        await page.waitForSelector('text=2 likes')
        await page.getByText('hide').click()

        const updatedBlogTitles = await page.locator('.blog-item').allTextContents()
        //console.log(updatedBlogTitles)

        expect(updatedBlogTitles[0]).toContain('Title for testing Jack Russell')
    })
  })
})