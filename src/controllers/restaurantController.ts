import categoryModel from "../models/categoryModel";
import restaurantModel from "../models/restaurantModel";
import userModel from "../models/userModel";
import { Bcrypt } from "../utils/bcrypt";
import { Utils } from "../utils/utils";

export class RestaurantController {
    static async addRestaurant(req, res, next) {
        const { name, email, phone, password } = req.body;
        const { res_name, location, address, open_time, close_time, status, cuisines, price, delivery_time, city_id } =
            req.body;
        const path = req.file.path.replace(/\\/g, "/");
        try {
            const existingUser = await userModel.findOne({ email: email });
            if (existingUser) {
                Utils.createErrorAndThrow("Email is already registered", 409); // conflict
            }
            let hashed_password = await Bcrypt.encryptPassword(password);
            // generate verification OTP
            let verification_token = Utils.generateOTP();

            // post user
            const data = {
                name,
                email,
                verification_token,
                verification_token_time: Utils.generateVerificationTime(new Date(), 5),
                password: hashed_password,
                password_reset_token: -1, // -1 -> not generated
                password_reset_token_time: Utils.generateVerificationTime(new Date(), -10), // always expired: 10 min before creating the account
                phone,
                type: "restaurant",
                status: "active",
            };
            const user = await new userModel(data).save();

            // create category
            const categoryData = JSON.parse(req.body.categories).map((item) => {
                return {
                    name: item,
                    user_id: user._id,
                };
            });
            const categories = await categoryModel.insertMany(categoryData);
            // only add category name that doesn't exist
            // const newCategory = req.body.categories.map((item) => ({
            //     updateOne: {
            //         filter: { name: item },
            //         update: {
            //             $setOnInsert: {
            //                 name: item,
            //                 user_id: user._id,
            //             },
            //         },
            //         upsert: true,
            //     },
            // }));
            // const categories = await categoryModel.bulkWrite(newCategory);

            // create restaurant
            let restaurantData: any = {
                name: res_name,
                cover: path,
                location: JSON.parse(location),
                address,
                open_time,
                close_time,
                status,
                cuisines: cuisines,
                price: parseInt(price),
                delivery_time: parseInt(delivery_time),
                user_id: user._id,
                city_id,
            };
            if (req.body.description) {
                restaurantData = { ...restaurantData, description: req.body.description };
            }
            if (req.file) {
                restaurantData = { ...restaurantData, cover: path };
            }
            const restaurant = await new restaurantModel(restaurantData).save();
            res.status(200).json({
                message: "Success",
                restaurant: restaurant,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getNearbyRestaurants(req, res, next) {
        const METERS_PER_KILOMETER = 1000;
        const EARTH_RADIUS_KILOMETER = 6378.1;
        const { lat, lon, radius } = req.query;
        try {
            const restaurants = await restaurantModel.find({
                status: "active",
                location: {
                    // $nearSphere:{
                    //     $geometry:{ 
                    //         type: "Point",
                    //         coordinates: [parseFloat(lon),parseFloat(lat)]
                    //     },
                    //     $maxDistance: radius * METERS_PER_KILOMETER
                    // }
                    $geoWithin: {
                        $centerSphere: [
                            // note home: lat: 27.698853 lon: 85.307705
                            [parseFloat(lon),parseFloat(lat)],
                            parseFloat(radius) / EARTH_RADIUS_KILOMETER,
                        ],
                    },
                },
            });
            let justName = restaurants.map((i) => i.name);
            res.status(200).json({
                justName,
            });
        } catch (err) {
            next(err);
        }
    }
    
    // change to search by keywords instead
    static async searchNearbyRestaurants(req, res, next) {
        const METERS_PER_KILOMETER = 1000;
        const EARTH_RADIUS_KILOMETER = 6378.1;
        const { lat, lon, radius, searchName } = req.query;
        try {
            const restaurants = await restaurantModel.find({
                status: "active",
                name: {$regex: searchName, $options: 'i'},
                location: {
                    // $nearSphere:{
                    //     $geometry:{ 
                    //         type: "Point",
                    //         coordinates: [parseFloat(lon),parseFloat(lat)]
                    //     },
                    //     $maxDistance: radius * METERS_PER_KILOMETER
                    // }
                    $geoWithin: {
                        $centerSphere: [
                            // note home: lat: 27.698853 lon: 85.307705
                            [parseFloat(lon),parseFloat(lat)],
                            parseFloat(radius) / EARTH_RADIUS_KILOMETER,
                        ],
                    },
                },
            });
            let justName = restaurants.map((i) => i.name);
            res.status(200).json({
                justName,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getRestaurants(req,res,next){
        try {
            const restaurants = await restaurantModel.find()
            res.status(200).json({
                restaurants,
            });
        } catch (err) {
            next(err);
        }
    }
}
