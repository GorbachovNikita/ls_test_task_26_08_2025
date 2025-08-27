
class LeadModel {

    constructor() {

    }

    get getLeadModel() {
        return {
            id: Number,
            name: String,
            price: Number,
            status_id: Number,
            pipeline_id: Number,
            created_by: Number,
            updated_by: Number,
            closed_at: Number,
            created_at: Number,
            updated_at: Number,
            loss_reason_id: Number,
            responsible_user_id: Number,
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
                contacts: {
                    type: Array,
                    items: {
                        id: Number,
                        is_main: String
                    }
                },
                companies: {
                    type: Array,
                    items: {
                        id: Number
                    }
                },
                source: {
                    external_id: Number,
                    type: String
                }
            }
        }
    }
}

module.exports = LeadModel
