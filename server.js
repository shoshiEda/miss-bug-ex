import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'
import cookieParser from 'cookie-parser'


import express from 'express'

const app = express()

app.use(express.static('public'))
app.use(cookieParser())

/*app.get('/', (req, res) => {
    res.send(`<h1>Welcome to my server </h1>`)
})*/

app.get('/api/bug',(req,res) => {
   
    bugService.query()
    .then(bugs => {
        res.send(bugs)
    })
    .catch(err => {
        loggerService.error('cannot get bugs',err)
        res.status(400,sand('cannot get bugs'))
    })
})

app.get('/api/bug/save',(req,res) => {     //save?title=lala&severity=8
const bug={
    title: req.query.title,
    severity: +req.query.severity,
    description: req.query.description,
    _id:  req.query._id

}
console.log(bug)
  bugService.save(bug)
  .then(bug => res.send(bug))
 
 }) 
    

app.get('/api/bug/:id',(req,res) => {
   const bugId = req.params.id
   bugService.getById(bugId)
   .then(bug => {
    res.send(bug)
}) 
.catch(err => res.status(400,sand(err)))
    })

app.get('/api/bug/:id/remove',(req,res) => {
    const bugId = req.params.id
    bugService.remove(bugId)
     .then( res.redirect('/api/bug')) 
     })






const port = 3030
app.listen(port, () =>
loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)
