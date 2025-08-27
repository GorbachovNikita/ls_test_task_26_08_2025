require('dotenv').config()

const express = require('express')
const { leadsController, authController, linksController, contactController } = require('./di-container')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express()

const errorMiddleware = require('./middlewares/error.middleware')

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.get('/auth/callback', authController.authCallback)

app.post('/leads', leadsController.createLead)
app.put('/leads/:id', leadsController.updateLead)
app.get('/leads/:id', leadsController.getLead)

app.post('/contacts', contactController.createContact)
app.put('/contacts/:id', contactController.updateContact)
app.get('/contacts/:id', contactController.getContact)

app.post('/link', linksController.createLink)
app.post('/unlink', linksController.deleteLink)

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`)
})
