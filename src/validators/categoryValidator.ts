import { body, param } from "express-validator";
import restaurantModel from "../models/restaurantModel";

export class CategoryValidator {
    static getRestaurantCategoryValidator() {
        param("res_id", "Restaurant id is required")
    }
}
