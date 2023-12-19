import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'
import cookieParser from 'cookie-parser'


import express from 'express'

const app = express()
app.use(express.json())

app.use(express.static('public'))
app.use(cookieParser())

/*app.get('/', (req, res) => {
    res.send(`<h1>Welcome to my server </h1>`)
})*/

app.get('/api/bug', (req, res) => {

    
    bugService.query()
        .then(bugs => {
            res.send(bugs)
        })
        .catch(err => {
            loggerService.error('cannot get bugs', err)
            res.status(400, send('cannot get bugs'))
        })
})

app.post('/api/bug', (req, res) => {     //save?title=lala&severity=8
    const bug = {
        title: req.body.title,
        severity: +req.body.severity,
        description: req.body.description,
    }
    console.log(bug)
    bugService.save(bug)
        .then(bug => res.send(bug))
        .catch((err) => {
            loggerService.error('Cannot save car', err)
            res.status(400).send('Cannot save car')
        })
})

app.put('/api/bug', (req, res) => {     //save?title=lala&severity=8
   // console.log('hi')
    const bug = {
        title: req.body.title,
        severity: +req.body.severity,
        description: req.body.description,
        _id: req.body._id

    }
    console.log(bug)
    bugService.save(bug)
        .then(bug => res.send(bug))
        .catch((err) => {
            loggerService.error('Cannot save car', err)
            res.status(400).send('Cannot save car')
        })
})




app.get('/api/bug/:id', (req, res) => {
    const bugId = req.params.id
    const { visitCountMap = [] } = req.cookies
    console.log('visitCountMap', visitCountMap)
    if (visitCountMap.length >= 3) return res.status(401).send('waiufdhgsfeghdjs')
    if (!visitCountMap.includes(bugId)) visitCountMap.push(bugId)
    res.cookie('visitCountMap', visitCountMap, { maxAge: 1000 * 999 })
    console.log(bugId);

    bugService.getById(bugId)
        .then(bug => {
console.log(bug);
            res.send(bug)
        })
        .catch(err => res.status(400).send(err))
})

app.delete('/api/bug/:id', (req, res) => {
    const bugId = req.params.id
    bugService.remove(bugId)
        .then(res.redirect('/api/bug'))
        .catch((err) => {
            loggerService.error('Cannot remove car', err)
            res.status(400).send('Cannot remove car')
        })
})






const port = 3030
app.listen(port, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)
