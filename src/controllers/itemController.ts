import categoryModel from "../models/categoryModel";
import itemModel from "../models/itemModel";

export class ItemController {
    static async getItems(req, res, next) {
        const restaurant = req.restaurant;
        try {
            const categories = await categoryModel.find(
                {
                    restaurant_id: req.params.restaurant_id,
                },
                {
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0,
                }
            );
            const items = await itemModel.find(
                {
                    restaurant_id: req.params.restaurant_id,
                },
                {
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0,
                }
            );
            res.status(200).json({
                restaurant,
                categories,
                items,
            });
        } catch (err) {
            next(err);
        }
    }

    static async addItem(req, res, next) {
        const { restaurant_id, category_id, name, description, price, diet } = req.body;
        const image = req.file.path.replace(/\\/g, "/");
        try {
            let itemData: any = {
                restaurant_id,
                category_id,
                name,
                image,
                price: parseFloat(price),
                diet,
            };
            if (description) {
                itemData = { ...itemData, description: description };
            }
            const item = await new itemModel(itemData).save();
            res.send(item);
        } catch (err) {
            next(err);
        }
    }
}
