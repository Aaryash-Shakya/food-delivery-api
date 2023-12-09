import addressModel from "../models/addressModel";

export class AddressController {
    static async getAddresses(req, res, next) {
        const user_id = req.decoded.userId;
        try {
            const address = await addressModel.find({ user_id: user_id });
            res.status(200).json({
                user_id,
                address
            });
        } catch (err) {
            next(err);
        }
    }

    static async addAddress(req, res, next) {
        const { title, address, landmark, house, latitude, longitude } = req.body;
        const user_id = req.decoded.userId;
        try {
            const addressData = {
                user_id,
                title,
                address,
                landmark,
                house,
                latitude,
                longitude,
            };
            const newAddress = await new addressModel(addressData).save();
            res.send(newAddress);
        } catch (err) {
            next(err);
        }
    }
}
