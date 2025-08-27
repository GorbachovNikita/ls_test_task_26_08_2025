const axios = require('axios')
const LeadsService = require('./services/leads.service')
const LeadsController = require('./controllers/leads.controller')
const LeadModel = require('./models/lead.model')
const LinksService = require('./services/links.service')
const LinkModel = require('./models/link.model')
const LinksController = require('./controllers/links.controller')
const AuthController = require('./controllers/auth.controller')
const AuthService = require('./services/auth.service')
const ApiError = require('./exceptions/api.error')
const ContactsService = require('./services/contacts.service')
const ContactModel = require('./models/contact.model')
const ContactController = require('./controllers/contacts.controller')

const axiosInstance = axios.create({
    baseURL: process.env.CLIENT_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

const authService = new AuthService(axiosInstance, ApiError)

const authController = new AuthController(
    authService,
    ApiError
)

const linksService = new LinksService(axios, authService, ApiError)
const linkModel = new LinkModel(ApiError)
const linksController = new LinksController(linksService, linkModel)

const leadModel = new LeadModel(ApiError)

const leadsService = new LeadsService(
    axiosInstance,
    authService,
    ApiError
)

const leadsController = new LeadsController(
    leadsService,
    leadModel,
    ApiError
)

const contactModel = new ContactModel(ApiError)
const contactsService = new ContactsService(axiosInstance, authService, ApiError)
const contactController = new ContactController(contactsService, contactModel, ApiError)

module.exports = {
    axiosInstance,
    authController,
    authService,
    leadsService,
    leadModel,
    leadsController,
    linksController,
    ApiError,
    contactController,
    contactsService,
    contactModel,
}
