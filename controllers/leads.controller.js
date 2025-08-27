
class LeadsController {

    constructor(leadsService, leadModel, apiError) {
        this.leadsService = leadsService
        this.leadModel = leadModel
        this.apiError = apiError
    }

    createLead = async (req, res) => {
        try {
            const leadData = req.body

            this.leadModel.validate(leadData, 'create')

            const result = await this.leadsService.createLead(leadData)

            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({error})
        }
    }

    updateLead = async (req, res) => {
        try {
            const leadId = req.params.id
            const updateData = req.body

            if (!leadId) {
                return this.apiError.BadRequest(['Не указан ID сделки для обновления'])
            }

            if (!updateData) {
                return this.apiError.BadRequest(['Нет данных для обновления'])
            }

            this.leadModel.validate(updateData, 'update')

            const updatedLead = await this.leadsService.updateLead(leadId, updateData)

            res.status(200).json({
                message: 'Сделка успешно обновлена',
                lead: updatedLead
            })
        } catch (error) {
            res.status(500).json({error})
        }
    }

    getLead = async (req, res) => {
        try {
            const leadId = req.params.id;

            if (!leadId) {
                return this.apiError.BadRequest(['Не указан ID сделки для обновления'])
            }

            const lead = await this.leadsService.getLead(leadId)

            const result = lead?.['content']?.id !== undefined
                ? { message: 'Сделка успешно получена', lead: lead }
                : { message: 'Сделка не найдена' }

            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({error})
        }
    }
}

module.exports = LeadsController
