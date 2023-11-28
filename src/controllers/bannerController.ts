import bannerModel from "../models/bannerModel";

export class BannerController {
    static async addBanner(req, res, next) {
        const path = req.file.path.replace(/\\/g, "/");
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

    static async getBanners(req, res, next) {
        try {
            const allBanners = await bannerModel.find({});
            res.send(allBanners);
        } catch (err) {
            next(err);
        }
    }
}
