
class LeadsService {

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
            return this.apiError.BadRequest(['Пользователь не авторизован'])
        }
    }

    async createLead(leadData) {
        try {
            const accessToken = await this.getValidAccessToken()

            const existingLead = await this.checkLeadExists(leadData?.[0]?.name)

            if (existingLead !== undefined) {
                return this.apiError.BadRequest(['Сделка с таким названием уже существует'])
            }

            const response = await this.axios.post(
                `${this.baseURL}/leads`,
                leadData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return {
                result: 'Сделка успешно создана',
                content: response?.data
            }
        } catch (error) {
            return this.apiError.BadRequest([{
                message: 'Ошибки при создании сделки',
                errors: error?.response?.data
            }])
        }
    }

    async checkLeadExists(name) {
        try {
            const accessToken = await this.getValidAccessToken();

            const response = await this.axios.get(
                `${this.baseURL}/leads?filter[name]=${name}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return response?.data?.['_page']
        } catch (error) {
            return this.apiError.BadRequest([{
                message: 'Ошибки при проверке существования сделки',
                errors: error?.response?.data
            }])
        }
    }

    async updateLead(leadId, updateData) {
        try {
            const accessToken = await this.getValidAccessToken();

            const response = await this.axios.patch(
                `${this.baseURL}/leads/${leadId}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return {
                result: 'Сделка успешно отредактирована',
                content: response?.data
            }
        } catch (error) {
            return this.apiError.BadRequest([{
                message: 'Ошибки при обновлении сделки',
                errors: error?.response?.data
            }])
        }
    }

    async getLead(leadId) {
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

            return {
                result: 'Информация по сделке',
                content: response?.data
            }
        } catch (error) {
            return this.apiError.BadRequest([{
                message: 'Ошибки при получении сделки',
                errors: error?.response?.data
            }])
        }
    }
}

module.exports = LeadsService
