//const shops = ,"https://www.acer.com/ac/en/US/content/home","https://agbstech.com/","https://www.dell.com/en-us/gaming/alienware","https://www.bmaxit.com/en/","https://www.boxx.com/","https://www.casper.com.tr/","https://www.clevo.com.tw/index-en.asp","https://www.cyberpowerpc.com/","https://www.digitalstorm.com/","https://www.durabook.com/us/","https://us.dynabook.com/","https://www.eluktronics.com/","https://frame.work/","https://www.fujitsu.com/global/products/computing/pc/notebooks/","https://www.gatewayusa.com/","https://geo-computers.com/","https://us.starlabs.systems/pages/starbook","https://eurocom.com/ec/main()ec","https://www.falcon-nw.com/","https://www.getac.com/us/products/laptops/","https://www.gigabyte.com/us/Laptop","https://www.hihonor.com/global/laptops/","https://www.consumer.huawei.com/en/laptops/","https://www.hyundaitechnology.com/collections/notebooks","https://www.illegear.com/shop/10-illegear-laptops","https://www.lavamobiles.com/laptops","https://www.lg.com/us/laptops","https://www.global.machenike.com/","http://www.maguay.ro/","https://www.nokia.com/shop/laptops/","https://www.medion.com/us/products/laptops.php","https://www.metabox.com.au/","https://www.us.msi.com/","https://www.obsidian-pc.com/","https://www.optimacomputerbd.com/","https://www.originpc.com/gaming/laptops/","https://www.opowered.com/laptops/","https://www.na.panasonic.com/us/computers-tablets-handhelds/computers","https://www.packardbell.com/pb/en/IL/content/notebook","https://www.puri.sm/","https://www.razer.com/pc","https://www.sagernotebook.com/Best-Gaming-Laptop/","https://www.samsung.com/us/computing/","http://www.en.jumper.com.cn/en/index.aspx","https://www.system76.com/laptops","https://www.velocitymicro.com/gaming-laptops.php","https://www.tuxedocomputers.com/en/Linux-Hardware/Linux-Notebooks.tuxedo","https://www.zeuslap.com/","http://www.xolo.in/laptops/chrome-book","https://www.waltonbd.com/laptop"]
const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const newspapers = [
    {
        name: 'puri',
        address: 'https://www.puri.sm/',
        base: 'https://www.puri.sm/'
    },
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('p:contains("laptop")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })

        })
})

app.get('/', (req, res) => {
    res.json('Welcome to my Cyber News API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base


    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("cyber")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))