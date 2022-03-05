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

        express
        .route('/user/auth')
        .post(
            UserController.auth
        );

        express
        .route('/user/logout')
        .post(
            UserController.logout
        );

        express
        .route('/user/isAuthenticated')
        .post(
            UserController.isAuthenticated
        );

        express
        .route('/user/passwordRecoveryRequest')
        .post(
            UserController.passwordRecoveryRequest
        );

        express
        .route('/user/confirmPasswordRecovery')
        .post(
            UserController.confirmPasswordRecovery
        );

        express
        .route('/user/unlockLogin')
        .post(
            UserController.unlockLogin
        );

        express
        .route('/user/updatePassword')
        .post(
            UserController.updatePassword
        );

        express
        .route('/user/cancelAccount')
        .post(
            UserController.cancelAccount
        );

    }

} export default Router;