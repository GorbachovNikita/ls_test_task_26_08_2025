
class LinksController {

    constructor(linksService, linkModel) {
        this.linksService = linksService
        this.linkModel = linkModel
    }

    createLink = async (req, res) => {
        try {
            const linkData = req.body

            this.linkModel.validate(linkData, 'create')

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

            this.linkModel.validate(linkData, 'delete')

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
