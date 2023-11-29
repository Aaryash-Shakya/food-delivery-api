import cityModel from "../models/cityModel";

export class CityController {
    static async addCity(req, res, next) {
        const { name, status } = req.body.name;
        const data = {
            name,
            status,
        };
        try {
            let city = await new cityModel(data).save();
            res.send(city);
        } catch (err) {
            next(err);
        }
    }

    static async getCities(req, res, next) {
        try {
            const allCities = await cityModel.find();
            res.send(allCities);
        } catch (err) {
            next(err);
        }
    }
}
