import { body } from "express-validator";

export class CityValidator {
    static addCityValidator() {
        return [
            body("name", "City name is required").isString(),
            body("latitude", "Latitude is required").isNumeric(),
            body("longitude", "Longitude is required").isNumeric(),
            body("status", "City status is required").isString(),
        ];
    }
}
