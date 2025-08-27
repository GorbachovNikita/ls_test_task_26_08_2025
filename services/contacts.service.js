
class ContactsService {

    constructor(axiosInstance, authServiceInstance, apiError) {
        this.axios = axiosInstance
        this.authService = authServiceInstance
        this.apiError = apiError
        this.baseURL = `${process.env.CLIENT_URL}/api/v4`
    }

    async getValidAccessToken() {
        try {
            return await this.authService.getCurrentToken()
        } catch (error) {
            throw this.apiError.BadRequest(['Пользователь не авторизован'])
        }
    }

    async createContact(contactData) {
        try {
            const accessToken = await this.getValidAccessToken()

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
            return this.apiError.BadRequest({
                message: 'Ошибки при создании контакта',
                errors: error?.response?.data
            })
        }
    }

    async updateContact(contactId, updateData) {
        try {
            const accessToken = await this.getValidAccessToken()

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
            return this.apiError.BadRequest({
                message: 'Ошибки при обновлении контакта',
                errors: error?.response?.data
            })
        }
    }

    async getContact(contactId) {
        try {
            const accessToken = await this.getValidAccessToken()

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
            return this.apiError.BadRequest({
                message: 'Ошибки при получении контакта',
                errors: error?.response?.data
            })
        }
    }
}

module.exports = ContactsService
