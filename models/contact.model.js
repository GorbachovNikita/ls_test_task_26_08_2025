
class ContactModel {

    constructor() {
    }

    get getContactModel() {
        return {
            id: Number,
            name: String,
            first_name: String,
            last_name: String,
            email: String,
            phone: String,
            responsible_user_id: Number,
            created_by: Number,
            updated_by: Number,
            created_at: Number,
            updated_at: Number,
            request_id: String,
            custom_fields_values: {
                type: Array,
                items: Object
            },
            tags_to_add: {
                type: Array,
                items: {
                    id: Number,
                    name: String
                }
            },
            tags_to_delete: {
                type: Array,
                items: {
                    id: Number,
                    name: String
                }
            },
            _embedded: {
                tags: {
                    type: Array,
                    items: {
                        id: Number,
                        name: String
                    }
                },
                companies: {
                    type: Array,
                    items: {
                        id: Number
                    }
                }
            }
        }
    }
}

module.exports = ContactModel
