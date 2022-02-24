import express from 'express';
import IndexController from '../controllers/IndexController';

class IndexRouter{

    constructor(express: express.Application){
        this.routes(express);
    }

    private routes(express: express.Application){

        express
        .route('/')
        .get(
            IndexController.index
        );

    }

} export default IndexRouter;