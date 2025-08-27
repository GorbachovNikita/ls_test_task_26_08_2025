
class LinksController {

    constructor(linksService) {
        this.linksService = linksService
    }

    createLink = async (req, res) => {
        try {
            const linkData = req.body

            const createdLink = await this.linksService.createLink(linkData)

            res.status(201).json({
                message: 'Связь успешно создана',
                link: createdLink
            })
        } catch (error) {
            res.status(500).json({error})
        }
    }

    deleteLink = async (req, res) => {
        try {
            const linkData = req.body

            const deletedLink = await this.linksService.deleteLink(linkData)

            res.status(200).json({
                message: 'Связь успешно удалена',
                link: deletedLink
            })
        } catch (error) {
            res.status(500).json({error})
        }
    }
}

module.exports = LinksController
