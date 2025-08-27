
class AuthService {

    constructor(axiosInstance, authValidator, apiError) {
        this.axios = axiosInstance
        this.authValidator = authValidator
        this.apiError = apiError
        this.accessToken = null
        this.expiresAt = null
    }

    async getAccessToken(authCode) {
        try {

            this.authValidator.validateAuthCode(authCode)

            if (this.accessToken && !this.isTokenExpired()) {

                return this.accessToken
            }

            const response = await this.axios.post(`${process.env.CLIENT_URL}/oauth2/access_token`,
                new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    redirect_uri: process.env.REDIRECT_URI,
                    code: authCode
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )

            this.accessToken = response?.data?.['access_token']
            this.expiresAt = Date.now() + (response?.data?.['expires_in'] * 1000)
            return this.accessToken
        } catch (error) {
            throw error
        }
    }

    async getCurrentToken() {

        if (this.accessToken && !this.isTokenExpired()) {

            return this.accessToken
        }

        throw this.apiError.BadRequest(['Пользователь не авторизован'])
    }

    isTokenExpired() {

        return Date.now() >= this.expiresAt
    }
}

module.exports = AuthService
