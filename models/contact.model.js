
class ContactModel {

    constructor(apiError) {
        this.apiError = apiError
    }

    validate(data, operation) {
        if (operation === 'create') {
            if (!Array.isArray(data)) {
                throw this.apiError.BadRequest(['Данные должны быть представлены в виде массива'])
            }

            if (data.length === 0) {
                throw this.apiError.BadRequest(['Вы не указали никаких данных для контакта'])
            }

            return data.map(contact => this.validateContact(contact))
        } else {
            return this.validateContact(data)
        }
    }

    validateContact(contact) {

        if (contact?.name !== undefined && typeof contact?.name !== 'string') {
            throw this.apiError.BadRequest(['Имя контакта (name) должно быть строкой'])
        }

        if (contact?.['first_name'] !== undefined) {

            if (typeof contact?.['first_name'] !== 'string') {
                throw this.apiError.BadRequest(['Имя контакта должно быть строкой'])
            }
        }

        if (contact?.['last_name'] !== undefined) {

            if (typeof contact?.['last_name'] !== 'string') {
                throw this.apiError.BadRequest(['Фамилия контакта должен быть строкой'])
            }
        }

        if (contact?.['email'] !== undefined) {

            if (typeof contact?.['email'] !== 'string') {
                throw this.apiError.BadRequest(['Email должен быть строкой'])
            }
        }

        if (contact?.['phone'] !== undefined) {

            if (typeof contact?.['phone'] !== 'string') {
                throw this.apiError.BadRequest(['Телефон должен быть строкой'])
            }
        }

        if (contact?.id !== undefined && typeof contact?.id !== 'number') {
            throw this.apiError.BadRequest(['ID контакта (id) должен быть числом'])
        }

        if (contact?.['responsible_user_id'] !== undefined && typeof contact?.['responsible_user_id'] !== 'number') {
            throw this.apiError.BadRequest(['ID ответственного (responsible_user_id) должен быть числом'])
        }

        if (contact?.['custom_fields_values'] !== undefined) {

            if (!Array.isArray(contact?.['custom_fields_values'])) {
                throw this.apiError.BadRequest(['Значения дополнительных полей должны быть массивом'])
            }
        }

        if (contact?.['_embedded'] && contact?.['_embedded']?.['companies']) {

            if (!Array.isArray(contact?.['_embedded']?.['companies'])) {
                throw this.apiError.BadRequest(['Список компаний должен быть массивом'])
            }

            contact?.['_embedded']?.['companies']?.forEach(company => {
                if (typeof company?.id !== 'number') {
                    throw this.apiError.BadRequest(['ID компании должен быть числом'])
                }
            })
        }

        if (contact?.['first_name'] !== undefined) {
            if (typeof contact?.['first_name'] !== 'string') {
                throw this.apiError.BadRequest(['Имя (first_name) должно быть строкой'])
            }
        }

        if (contact?.['last_name'] !== undefined) {
            if (typeof contact?.['last_name'] !== 'string') {
                throw this.apiError.BadRequest(['Фамилия (last_name) должна быть строкой'])
            }
        }

        if (contact?.['created_by'] !== undefined) {
            if (typeof contact?.['created_by'] !== 'number') {
                throw this.apiError.BadRequest(['ID создателя (created_by) должен быть числом'])
            }
        }

        if (contact?.['updated_by'] !== undefined) {
            if (typeof contact?.['updated_by'] !== 'number') {
                throw this.apiError.BadRequest(['ID изменившего (updated_by) должен быть числом'])
            }
        }

        if (contact?.['created_at'] !== undefined) {
            if (typeof contact?.['created_at'] !== 'number') {
                throw this.apiError.BadRequest(['Дата создания (created_at) должна быть числом (timestamp)'])
            }
        }

        if (contact?.['updated_at'] !== undefined) {
            if (typeof contact?.['updated_at'] !== 'number') {
                throw this.apiError.BadRequest(['Дата изменения (updated_at) должна быть числом (timestamp)'])
            }
        }

        if (contact?.['tags_to_add'] !== undefined) {

            if (!Array.isArray(contact?.['tags_to_add'])) {
                throw this.apiError.BadRequest(['tags_to_add должен быть массивом']);
            }

            contact?.['tags_to_add']?.forEach(tag => {

                if (!tag?.id && !tag?.name) {
                    throw this.apiError.BadRequest(['В теге должен быть указан id или name']);
                }

                if (tag?.id && typeof tag?.id !== 'number') {
                    throw this.apiError.BadRequest(['ID тега должен быть числом']);
                }

                if (tag?.name && typeof tag?.name !== 'string') {
                    throw this.apiError.BadRequest(['Название тега должно быть строкой']);
                }
            })
        }

        if (contact?.['tags_to_delete'] !== undefined) {

            if (!Array.isArray(contact?.['tags_to_delete'])) {
                throw this.apiError.BadRequest(['tags_to_delete должен быть массивом'])
            }

            contact?.['tags_to_delete']?.forEach(tag => {

                if (!tag?.id && !tag?.name) {
                    throw this.apiError.BadRequest(['В теге должен быть указан id или name'])
                }

                if (tag?.id && typeof tag?.id !== 'number') {
                    throw this.apiError.BadRequest(['ID тега должен быть числом'])
                }

                if (tag?.name && typeof tag?.name !== 'string') {
                    throw this.apiError.BadRequest(['Название тега должно быть строкой'])
                }
            })
        }

        if (contact?.['request_id'] !== undefined && typeof contact?.['request_id'] !== 'string') {
            throw this.apiError.BadRequest(['request_id должен быть строкой'])
        }

        if (contact?.['_embedded'] && contact?.['_embedded']?.['tags']) {

            if (!Array.isArray(contact?.['_embedded']?.['tags'])) {
                throw this.apiError.BadRequest(['Теги должны быть массивом'])
            }

            contact?.['_embedded']?.['tags']?.forEach(tag => {

                if (typeof tag?.id !== 'number') {
                    throw this.apiError.BadRequest(['ID тега должен быть числом'])
                }

                if (typeof tag?.name !== 'string') {
                    throw this.apiError.BadRequest(['Название тега должно быть строкой'])
                }
            })
        }

        return contact
    }
}

module.exports = ContactModel
