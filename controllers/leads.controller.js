
class LeadsController {

    constructor(leadsService) {
        this.leadsService = leadsService
    }

    createLead = async (req, res) => {
        try {
            const leadData = req.body

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
            const leadId = req.params.id

            const lead = await this.leadsService.getLead(leadId)

            const result = lead?.['content']?.id !== undefined
                ? { result: 'Сделка успешно получена', lead: lead }
                : { result: 'Сделка не найдена' }

            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({error})
        }
    }
}

module.exports = LeadsController
