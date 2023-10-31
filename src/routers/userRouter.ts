import { Router } from "express";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    
    getRoutes() {
        this.router.get('/test',(req,res)=>{
            res.status(200).send('test success')
        })
    }

    postRoutes() {}

    putRoutes() {}

    patchRoutes() {}

    deleteRoutes() {}
}

export default new UserRouter().router;
