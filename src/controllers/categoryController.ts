import categoryModel from "../models/categoryModel";

export class CategoryController {
    static async getCategories(req, res, next) {
        try {
            const allCategories = await categoryModel.find();
            res.send(allCategories);
        } catch (err) {
            next(err);
        }
    }

    static async getRestaurantCategories(req, res, next) {
        const restaurant_id = req.params.res_id;
        try {
            const restaurantCategories = await categoryModel.find(
                {
                    restaurant_id,
                },
                { __v: 0 }
            );
            res.send(restaurantCategories);
        } catch (err) {
            next(err);
        }
    }
}
