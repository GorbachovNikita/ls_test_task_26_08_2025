
class LeadModel {

    constructor(apiError) {
        this.apiError = apiError
    }

    validate(data, operation) {

        if (operation === 'create') {

            if (!Array.isArray(data)) {
                return this.apiError.BadRequest(['Данные должны быть представлены в виде массива'])
            }

            if (data.length === 0) {
                return this.apiError.BadRequest(['Вы не указали никаких данных для сделки'])
            }

            return data.map(lead => this.validateLead(lead, operation))
        }
        else {
            return this.validateLead(data, operation)
        }
    }

    validateLead(lead, operation) {

        if (operation === 'update') {
            if (lead?.id !== undefined && typeof lead?.id !== 'number') {
                return this.apiError.BadRequest(['ID сделки (id) должен быть числом'])
            }

            if (lead?.['tags_to_delete'] !== undefined) {
                if (!Array.isArray(lead?.['tags_to_delete'])) {
                    return this.apiError.BadRequest(['Теги для удаления (tags_to_delete) должны быть массивом'])
                }

                lead?.['tags_to_delete']?.forEach(tag => {
                    if (!tag.id && !tag.name) {
                        return this.apiError.BadRequest(['Для тега удаления должно быть указано id или name'])
                    }
                })
            }

            if (lead?.['_embedded']?.['tags']) {
                lead?.['_embedded']?.['tags']?.forEach(tag => {
                    if (typeof tag.name !== 'string') {
                        return this.apiError.BadRequest(['Название тега во вложенных сущностях (_embedded.tags.name) должно быть строкой'])
                    }
                })
            }
        }

        if (lead?.name !== undefined && typeof lead?.name !== 'string') {
            throw this.apiError.BadRequest(['Название сделки (name) должно быть строкой'])
        }

        if (lead?.['price'] !== undefined && typeof lead?.['price'] !== 'number') {
            throw this.apiError.BadRequest(['Бюджет сделки (price) должен быть числом'])
        }

        if (lead?.['status_id'] !== undefined && typeof lead?.['status_id'] !== 'number') {
            throw this.apiError.BadRequest(['ID статуса сделки (status_id) должен быть числом'])
        }

        if (lead?.['pipeline_id'] !== undefined && typeof lead?.['pipeline_id'] !== 'number') {
            throw this.apiError.BadRequest(['ID воронки (pipeline_id) должен быть числом'])
        }

        ['created_by', 'updated_by'].forEach(field => {
            if (lead[field] !== undefined &&
                (typeof lead[field] !== 'number' ||
                    (lead[field] !== 0 && lead[field] < 0))) {
                throw this.apiError.BadRequest([`${field} должен быть числом >= 0 или 0 для робота`])
            }
        });

        ['closed_at', 'created_at', 'updated_at']?.forEach(field => {
            if (lead?.[field] !== undefined && typeof lead?.[field] !== 'number') {
                throw this.apiError.BadRequest([`${field} должно быть временной меткой (число)`])
            }
        })

        if (lead?.['loss_reason_id'] !== undefined && typeof lead?.['loss_reason_id'] !== 'number') {
            throw this.apiError.BadRequest(['ID причины отказа (loss_reason_id) должен быть числом'])
        }

        if (lead?.['responsible_user_id'] !== undefined && typeof lead?.['responsible_user_id'] !== 'number') {
            throw this.apiError.BadRequest(['ID ответственного пользователя (responsible_user_id) должен быть числом'])
        }

        if (lead?.['custom_fields_values'] !== undefined) {
            if (!Array.isArray(lead?.['custom_fields_values'])) {
                throw this.apiError.BadRequest(['Значения дополнительных полей (custom_fields_values) должны быть массивом'])
            }
        }

        if (lead?.['tags_to_add'] !== undefined) {
            if (!Array.isArray(lead?.['tags_to_add'])) {
                throw this.apiError.BadRequest(['Теги для добавления (tags_to_add) должны быть массивом'])
            }

            lead?.['tags_to_add']?.forEach(tag => {
                if (!tag.id && !tag.name) {
                    throw this.apiError.BadRequest(['Для тега должно быть указано id или name'])
                }
            })
        }

        if (lead?.['_embedded'] !== undefined) {
            if (lead?.['_embedded']?.['tags']) {
                if (!Array.isArray(lead?.['_embedded']?.['tags'])) {
                    throw this.apiError.BadRequest(['Теги во вложенных сущностях (_embedded.tags) должны быть массивом'])
                }

                lead?.['_embedded']?.['tags']?.forEach(tag => {
                    if (typeof tag.id !== 'number') {
                        throw this.apiError.BadRequest(['ID тега во вложенных сущностях (_embedded.tags[id]) должен быть числом'])
                    }
                })
            }

            if (operation === 'create') {
                if (lead?.['_embedded']?.['contacts']) {
                    if (!Array.isArray(lead?.['_embedded']?.['contacts'])) {
                        throw this.apiError.BadRequest(['Контакты (_embedded.contacts) должны быть массивом'])
                    }

                    lead?.['_embedded']?.['contacts']?.forEach(contact => {
                        if (typeof contact.id !== 'number') {
                            throw this.apiError.BadRequest(['ID контакта (_embedded.contacts.id) должен быть числом'])
                        }

                        if (contact?.['is_main'] !== undefined) {
                            if (typeof contact?.['is_main'] !== 'string') {
                                throw this.apiError.BadRequest(['Флаг главного контакта (_embedded.contacts.is_main) должен быть строкой'])
                            }

                            const validIsMainValues = ['true', 'false'];
                            if (!validIsMainValues.includes(contact?.['is_main'])) {
                                throw this.apiError.BadRequest(['Флаг главного контакта (_embedded.contacts.is_main) должен быть "true" или "false"'])
                            }
                        }
                    })
                }

                if (lead?.['_embedded']?.['companies']) {
                    if (!Array.isArray(lead?.['_embedded']?.['companies'])) {
                        throw this.apiError.BadRequest(['Список компаний (_embedded.companies) должен быть массивом'])
                    }

                    lead?.['_embedded']?.['companies']?.forEach(company => {
                        if (typeof company.id !== 'number') {
                            throw this.apiError.BadRequest(['ID компании (_embedded.companies.id) должен быть числом'])
                        }
                    })
                }

                if (lead?.['_embedded']?.source) {
                    if (lead?.['_embedded']?.source?.['external_id'] !== undefined) {
                        if (typeof lead?.['_embedded']?.source?.['external_id'] !== 'number') {
                            throw this.apiError.BadRequest(['Внешний ID источника (_embedded.source.external_id) должен быть числом'])
                        }
                    }

                    if (lead?.['_embedded']?.source?.type !== undefined) {
                        if (typeof lead?.['_embedded']?.source?.type !== 'string') {
                            throw this.apiError.BadRequest(['Тип источника (_embedded.source.type) должен быть строкой'])
                        }

                        if (lead?.['_embedded']?.source?.type !== 'widget') {
                            throw this.apiError.BadRequest(['Тип источника (_embedded.source.type) должен быть равен "widget"'])
                        }
                    }
                }
            }
        }

        return lead
    }
}

module.exports = LeadModel
