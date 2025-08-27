const axios = require('axios')

const LeadModel = require('./models/lead.model')
const LeadValidator = require('./validators/lead.validator')
const LeadsService = require('./services/leads.service')
const LeadsController = require('./controllers/leads.controller')

const LinkModel = require('./models/link.model')
const LinkValidator = require('./validators/link.validator')
const LinksService = require('./services/links.service')
const LinksController = require('./controllers/links.controller')

const AuthModel = require('./models/auth.model')
const AuthValidator = require('./validators/auth.validator')
const AuthService = require('./services/auth.service')
const AuthController = require('./controllers/auth.controller')

const ContactModel = require('./models/contact.model')
const ContactValidator = require('./validators/contact.validator')
const ContactsService = require('./services/contacts.service')
const ContactController = require('./controllers/contacts.controller')

const ApiError = require('./exceptions/api.error')

const axiosInstance = axios.create({
    baseURL: process.env.CLIENT_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

const authModel = new AuthModel()
const authValidator = new AuthValidator(ApiError)
const authService = new AuthService(axiosInstance, authValidator, ApiError)
const authController = new AuthController(authService)

const linkModel = new LinkModel()
const linkValidator = new LinkValidator(ApiError)
const linksService = new LinksService(axios, authService, linkValidator, ApiError)
const linksController = new LinksController(linksService)

const leadModel = new LeadModel()
const leadValidator = new LeadValidator(ApiError)
const leadsService = new LeadsService(
    axiosInstance,
    authService,
    leadValidator,
    ApiError
)
const leadsController = new LeadsController(leadsService)

const contactModel = new ContactModel()
const contactValidator = new ContactValidator(ApiError)
const contactsService = new ContactsService(
    axiosInstance,
    authService,
    contactValidator
)
const contactController = new ContactController(contactsService)

module.exports = {
    axiosInstance,

    authModel,
    authValidator,
    authService,
    authController,

    leadModel,
    leadValidator,
    leadsService,
    leadsController,

    linkModel,
    linkValidator,
    linksService,
    linksController,

    contactModel,
    contactValidator,
    contactsService,
    contactController,

    ApiError,
}
