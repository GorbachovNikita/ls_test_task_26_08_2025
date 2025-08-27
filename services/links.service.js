
class LinksService {

    constructor(axiosInstance, authServiceInstance, linkValidator, apiError) {
        this.axios = axiosInstance
        this.authService = authServiceInstance
        this.apiError = apiError
        this.linkValidator = linkValidator
        this.baseURL = `${process.env.CLIENT_URL}/api/v4`
    }

    async getValidAccessToken() {
        try {
            return await this.authService.getCurrentToken()
        } catch (error) {
            throw error
        }
    }

    async createLink(linkData) {
        try {
            const { lead_id, contact_id } = linkData

            this.linkValidator.validate(linkData, 'create')

            const lead = await this.checkLeadExists(lead_id)

            if (!lead) {
                return this.apiError.BadRequest(['Сделка не найдена'])
            }

            const contact = await this.checkContactExists(contact_id)
            if (!contact) {
                return this.apiError.BadRequest(['Контакт не найден'])
            }

            const accessToken = await this.getValidAccessToken()

            const response = await this.axios.post(
                `${this.baseURL}/leads/link`,
                [{
                    "entity_id": lead_id,
                    "to_entity_id": contact_id,
                    "to_entity_type": "contacts"
                }],
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return response.data
        } catch (error) {
            throw error
        }
    }

    async deleteLink(linkData) {
        try {
            const { lead_id, contact_id } = linkData

            const accessToken = await this.getValidAccessToken()

            this.linkValidator.validate(linkData, 'delete')

            const response = await this.axios.post(
                `${this.baseURL}/leads/${lead_id}/unlink`,
                [{
                    "to_entity_id": contact_id,
                    "to_entity_type": "contacts"
                }],
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return response.data
        } catch (error) {
            throw error
        }
    }

    async checkLeadExists(leadId) {
        try {
            const accessToken = await this.getValidAccessToken()

            const response = await this.axios.get(
                `${this.baseURL}/leads/${leadId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return response?.data
        } catch (error) {
            return null
        }
    }

    async checkContactExists(contactId) {
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

            return response?.data
        } catch (error) {
            return null
        }
    }
}

module.exports = LinksService
