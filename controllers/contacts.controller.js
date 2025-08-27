
class ContactsController {

    constructor(contactsService) {
        this.contactsService = contactsService
    }

    createContact = async (req, res) => {
        try {
            const contactData = req.body

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
