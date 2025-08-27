
class LeadsService {

    constructor(axiosInstance, authServiceInstance, leadValidator, apiError) {
        this.axios = axiosInstance
        this.authService = authServiceInstance
        this.leadValidator = leadValidator
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

            this.leadValidator.validate(leadData, 'create')

            await this.checkLeadExists(leadData?.[0]?.name)

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
            throw error
        }
    }

    async checkLeadExists(name) {
        try {
            const accessToken = await this.getValidAccessToken()

            const response = await this.axios.get(
                `${this.baseURL}/leads?filter[name]=${name}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response?.data?.['_page'] !== undefined) {
                throw this.apiError.BadRequest(['Сделка с таким названием уже существует']);
            }
        } catch (error) {
            throw error
        }
    }

    async updateLead(leadId, updateData) {
        try {
            const accessToken = await this.getValidAccessToken()

            this.leadValidator.validateLeadId(leadId)

            this.leadValidator.validateUpdateData(updateData)

            this.leadValidator.validate(updateData, 'update')

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
            throw error
        }
    }

    async getLead(leadId) {
        try {
            const accessToken = await this.getValidAccessToken()

            this.leadValidator.validateLeadId(leadId)

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
            throw error
        }
    }
}

module.exports = LeadsService
