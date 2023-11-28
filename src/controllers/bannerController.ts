import bannerModel from "../models/bannerModel";

export class BannerController {
    static async addBanner(req, res, next) {
        const path = req.file.path;
        const data = {
            banner: path,
        };
        try {
            let banner = await new bannerModel(data).save();
            res.send(banner);
        } catch (err) {
            next(err);
        }
    }
}
