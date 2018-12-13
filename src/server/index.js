const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const routes = require('./routes')

const root = './'
const port = process.env.port || 3000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(root, 'dist/angular-cosmosdb')))
app.use('/api', routes)
// routes

app.get('*', (req, res) => {
    res.sendFile('dist/angular-cosmosdb/index.html', { root })
})
app.listen(port, () => console.log(`Api running on localhost:${port}`))