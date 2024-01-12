const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => 
        blog.likes > max.likes 
            ? blog 
            : max, 
        blogs[0])
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const uniqueAuthors = [...new Set(authors)]
    const authorBlogs = uniqueAuthors.map(author => {
        return { author: author, blogs: authors.filter(a => a === author).length }
    })
    
    return authorBlogs.reduce((max, author) => 
        author.blogs > max.blogs 
            ? author 
            : max, 
        authorBlogs[0])
}   
    
const mostLikes = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const uniqueAuthors = [...new Set(authors)]
    const authorLikes = uniqueAuthors.map(author => {
        return { author: author, likes: blogs.filter(blog => blog.author === author).reduce((sum, blog) => sum + blog.likes, 0) }
    })
    
    return authorLikes.reduce((max, author) => 
        author.likes > max.likes 
            ? author 
            : max, 
        authorLikes[0])
}


module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
