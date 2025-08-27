
class AuthController {

    constructor(authService, apiError) {
        this.authService = authService
        this.apiError = apiError
    }

    authCallback = async (req, res) => {
        try {
            const authCode = req.query.code

            if (!authCode) {
                return this.apiError.BadRequest(['Отсутствует код авторизации'])
            }

            const accessToken = await this.authService.getAccessToken(authCode)

            res.status(200).json({
                message: 'Токен получен успешно',
                accessToken
            })
        } catch (error) {
            res.status(500).json({error})
        }
    }
}

module.exports = AuthController
