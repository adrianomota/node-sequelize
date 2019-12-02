import { Router } from 'express';

/** Controllers */
import UserController from './app/controllers/UserController';
import AddressController from './app/controllers/AddressControler';
import TechController from './app/controllers/TechController';
import ReportController from './app/controllers/ReportController';

const routes = new Router();

/** public routes */
/** Users */
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

/** Address */
routes.get('/users/:user_id/address', AddressController.index);
routes.post('/users/:user_id/address', AddressController.store);

/** Techs */
routes.get('/users/:user_id/techs', TechController.index);
routes.post('/users/:user_id/techs', TechController.store);
routes.delete('/users/:user_id/techs', TechController.destroy);

/** Reports */
routes.get('/report', ReportController.index);
/** private routes */
export default routes;
