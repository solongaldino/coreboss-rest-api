import express from 'express';
import IndexController from './controllers/IndexController';
import UserController from './controllers/UserController';

class Router{

    constructor(express: express.Application){
        this.routes(express);
    }

    private routes(express: express.Application){

        /* IndexController */
        express
        .route('/')
        .get(
            IndexController.index
        );

        /* UserController */
        express
        .route('/user/isRegisteredEmail')
        .post(
            UserController.isRegisteredEmail
        );

        express
        .route('/user/register')
        .post(
            UserController.register
        );

        express
        .route('/user/confirmationRegister')
        .post(
            UserController.confirmationRegister
        );

    }

} export default Router;