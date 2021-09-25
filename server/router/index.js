import combineRouters from 'koa-combine-routers';
import apiRouter from './api';

const router = combineRouters(apiRouter)

export default router;