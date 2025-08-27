
class ContactsController {

    constructor(contactsService, contactModel, apiError) {
        this.contactsService = contactsService
        this.contactModel = contactModel
        this.apiError = apiError
    }

    createContact = async (req, res) => {
        try {
            const contactData = req.body

            this.contactModel.validate(contactData, 'create')

            const createdContact = await this.contactsService.createContact(contactData)

            res.status(201).json({
                message: 'Контакт успешно создан',
                contact: createdContact
            })
        } catch (error) {
            res.status(500).json({error})
        }
    }

    updateContact = async (req, res) => {
        try {
            const contactId = req.params.id
            const updateData = req.body

            if (!contactId) {
                return this.apiError.BadRequest(['Не указан ID контакта для обновления'])
            }

            if (!updateData) {
                return this.apiError.BadRequest(['Нет данных для обновления'])
            }

            this.contactModel.validate(updateData, 'update')

            const updatedContact = await this.contactsService.updateContact(contactId, updateData)

            res.status(200).json({
                message: 'Контакт успешно обновлен',
                contact: updatedContact
            })
        } catch (error) {
            res.status(500).json({error})
        }
    }

    getContact = async (req, res) => {
        try {
            const contactId = req.params.id

            if (!contactId) {
                return this.apiError.BadRequest(['Не указан ID контакта'])
            }

            const contact = await this.contactsService.getContact(contactId)

            res.status(200).json({
                message: 'Контакт успешно получен',
                contact: contact
            })
        } catch (error) {
            res.status(500).json({error})
        }
    }
}

module.exports = ContactsController
