import { body } from "express-validator";
import { Utils } from "../utils/utils";

export class BannerValidator {
    static addBannerValidator() {
        return [
            body("banner", "Banner image is required").custom((banner, { req }) => {
                if (req.file) {
                    return true;
                } else {
                    Utils.createErrorAndThrow("File not uploaded", 400);
                }
            }),
        ];
    }
}
