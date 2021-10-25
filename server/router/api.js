import Router from 'koa-router';
import { getShippingRate } from '../controllers/shipping_rate_controller';
import { getTrackingShipment } from '../controllers/track_shipment_controller';
import { getPdfShipment } from '../controllers/pdf_shipment_controller';
import { getShippingFulfilled } from '../controllers/shipping_fulfilled_controller';
const {UserController} = require('../controllers');
const koaBody = require('koa-body');


const router = new Router({prefix: '/api'});

router.get('/', async (ctx) => {
    ctx.body = 'Get scrip tag';
});

router.get('/all', async (ctx) => {
    ctx.body = 'Get all scrip tag';
});

router.post('/shipping-rate',  async (ctx) => {
//     ctx.body = 'post rquest ..';
//     //ctx.request.query.id;
//     const data = ctx.req.body.data;
//     ctx.body = data;
//     console.log(data);
//    // const id = ctx.request.query.id;
//    // console.log(id);
//    // ctx.body = id;
  
  const result =  await getShippingRate(ctx);

  ctx.body = result;

  
});

router.post('/shipping-fulfilled', async (ctx) => {
  //     ctx.body = 'post rquest ..';
  //     //ctx.request.query.id;
  //     const data = ctx.req.body.data;
  //     ctx.body = data;
  //     console.log(data);
  //    // const id = ctx.request.query.id;
  //    // console.log(id);
  //    // ctx.body = id;
    const result =  await getShippingFulfilled(ctx);
    ctx.body = result;
  
    
  });



router.post('/shipping-track', async (ctx) => {
  //     ctx.body = 'post rquest ..';
         const id = ctx.request.query.id;
  //     const data = ctx.req.body.data;
  //     ctx.body = data;
  //     console.log(data);
  //    // const id = ctx.request.query.id;
  //    // console.log(id);
  //    // ctx.body = id;
    const result =  await getTrackingShipment(id);
    ctx.body = result;
  
    
  });

  router.post('/shipping-pdf', async (ctx) => {
    //     ctx.body = 'post rquest ..';
           const id = ctx.request.query.id;
    //     const data = ctx.req.body.data;
    //     ctx.body = data;
    //     console.log(data);
    //    // const id = ctx.request.query.id;
    //    // console.log(id);
    //    // ctx.body = id;
      const result =  await getPdfShipment(id);
      ctx.body = result; 
      
    });

  // // user setting route  
  // router.post('/user', async (ctx) => {
  //   let {accountNum, password, userName} = ctx.request.body;
    
  //    ctx.body = {accountNum, password, userName};
  // });
     
     router.get('/users/:id',UserController.findOne);
     router.post('/users',UserController.create);
     
     router.get('/users',UserController.find); 
     router.delete('/users/:id', UserController.destroy);
     router.put('/users/:shop_url',koaBody(),UserController.update);

export default router; 