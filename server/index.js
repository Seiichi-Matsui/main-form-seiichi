const express = require('express')
const mongoose = require('mongoose');
const config = require('./config');
const contactRoutes = require('./routes/contact')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/users')
const path = require('path')
// const FakeDb = require('./fake-db')

mongoose.connect(config.DB_URI, {
    }).then(

    () => {
        // const fakeDb = new FakeDb()
        // fakeDb.initDb()
    }
    
)

const app = express()
app.use(bodyParser.json())

app.use('/api/v1/contacts', contactRoutes)
app.use('/api/v1/users', userRoutes)

if(process.env.NODE_ENV === 'production') {
    const appPath = path.join( __dirname, '..', 'dist', 'reservation-app')
    app.use(express.static(appPath))
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'))
})
}

const PORT = process.env.PORT  || '3001'

app.listen(PORT, function() {
    console.log('起動完了');
})