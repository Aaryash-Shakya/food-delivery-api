import itemModel from "../models/itemModel";

export class ItemController {
    static async getItems(req, res, next) {
        try {
            const allItems = await itemModel.find();
            res.send(allItems);
        } catch (err) {
            next(err);
        }
    }

    static async addItem(req, res, next) {
        const {restaurant_id, category_id, name, description, price, diet} = req.body;
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
