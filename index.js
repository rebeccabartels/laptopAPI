const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const newspapers = []
const articles = []
app.get('/', ( req, res ) => {
    res.json('Welcome to my API')
})
app.get('/news', (req, res) => {
    axios.get('https://www.theguardian.com/au/technology')
    .then((response) => {
        const html = response.data
        $ = cheerio.load(html)
        $('a:contains("crypto")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url
            })        
    })
    res.json(articles)
}).catch(err => console.log(err))

})
app.listen(PORT, () => console.log('server running on PORT ${PORT}'))


/*
newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("crypto")', html).each(function () {
            const title =$(this).text()
            const url = $(this).attr('href')

            articles.push({
                title,
                url: newspaper.base +url,
                source: newspaper.name

            })
        })




    })
})
*/
/*
app.get('/news', (req, res) =>{
    res.json(articles)
})

app.get('/news/:newspaperID', (req, res) => {
    const newspaperId = req.params.newspaperId
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaper(Id)[0].address)
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base

    axios.get(newspaperAddress)
    .then(response => {
        const html =response.dataconst 
        $ = cheerio.load(html)
        const specificArticles =[]
        
        $('a:contains("crypto")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')
            specificArticles.push({
                title,
                url:newspaperBase +url,
                source: newspaperId
            })
        })
            res.json(specificArticles)
        }).catch(err => console.log(err))

})
*/
