
class ContactsService {

    constructor(axiosInstance, authServiceInstance, contactValidator) {
        this.axios = axiosInstance
        this.authService = authServiceInstance
        this.contactValidator = contactValidator
        this.baseURL = `${process.env.CLIENT_URL}/api/v4`
    }

    async getValidAccessToken() {
        try {
            return await this.authService.getCurrentToken()
        } catch (error) {
            throw error
        }
    }

    async createContact(contactData) {
        try {
            const accessToken = await this.getValidAccessToken()

            this.contactValidator.validate(contactData, 'create')

            const response = await this.axios.post(
                `${this.baseURL}/contacts`,
                contactData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return {
                result: 'Контакт успешно создан',
                content: response.data
            }
        } catch (error) {
            throw error
        }
    }

    async updateContact(contactId, updateData) {
        try {
            const accessToken = await this.getValidAccessToken()

            this.contactValidator.validateContactId(contactId)

            this.contactValidator.validateUpdateData(updateData)

            this.contactValidator.validate(updateData, 'update')

            const response = await this.axios.patch(
                `${this.baseURL}/contacts/${contactId}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return {
                result: 'Контакт успешно обновлен',
                content: response.data
            }
        } catch (error) {
            throw error
        }
    }

    async getContact(contactId) {
        try {
            const accessToken = await this.getValidAccessToken()

            this.contactValidator.validateContactId(contactId)

            const response = await this.axios.get(
                `${this.baseURL}/contacts/${contactId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return {
                result: 'Информация по контакту',
                content: response.data
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = ContactsService
