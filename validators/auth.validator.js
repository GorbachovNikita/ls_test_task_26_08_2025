
class AuthValidator {

    constructor(apiError) {
        this.apiError = apiError
    }

    validateAuthCode(authCode) {
        if (!authCode || typeof authCode !== 'string') {
            throw this.apiError.BadRequest(['Код авторизации должен быть строкой'])
        }
    }
}

module.exports = AuthValidator