
class AuthController {

    constructor(authService) {
        this.authService = authService
    }

    authCallback = async (req, res) => {
        try {
            const authCode = req.query.code

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
