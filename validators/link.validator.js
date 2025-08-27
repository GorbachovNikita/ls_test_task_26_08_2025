
class LinkValidator {

    constructor(apiError) {
        this.apiError = apiError
    }

    validate(data, operation) {
        if (operation === 'create' || operation === 'delete') {

            if (typeof data?.['lead_id'] !== 'number') {
                throw this.apiError.BadRequest(['ID сделки (lead_id) должен быть числом'])
            }

            if (typeof data?.['contact_id'] !== 'number') {
                throw this.apiError.BadRequest(['ID контакта (contact_id) должен быть числом'])
            }

            return data
        }

        throw this.apiError.BadRequest(['Неподдерживаемая операция валидации'])
    }
}

module.exports = LinkValidator