import Router from 'koa-router';
import { getShippingRate } from '../controllers/shipping_rate_controller';
import { getTrackingShipment } from '../controllers/track_shipment_controller';
import { getPdfShipment } from '../controllers/pdf_shipment_controller';
import { getShippingFulfilled } from '../controllers/shipping_fulfilled_controller';
const {UserController, AppSession} = require('../controllers');
const koaBody = require('koa-body');
//const bodyParser = require('koa-parser');
const bodyParser = require('koa-bodyparser');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


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

  router.post('/app-uninstalled', async (ctx) => {
           
           console.log('app uninstall handeler.....');

           const buffers = [];

            for await (const chunk of ctx.req) {
                buffers.push(chunk);
            }
            console.log('posted data from buffers',buffers);
            const data = Buffer.concat(buffers).toString();
            // data to be sent to egyptExpress
            console.log('posted data from postman',data);
            const dataJson = JSON.parse(data);
            const domain = dataJson.domain;
            const deleteShop = await prisma.shopSession.delete({
              where: { shop: domain }
              }).then(_ => {
                  console.log('delet shop :', domain);
              }).catch(err => {
                  console.log('can not delete shop :',err);
              })

              const deleteUser = await prisma.user.delete({
                where: {
                  shop_url: domain,
                }}).then(_ => {
                  console.log('delet user.');
                }).catch(err => {
                  console.log('can not delete user.',err);
                })

      
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
     // user routes
     router.put('/users',koaBody(),UserController.update);
    // router.put('/users/:id',koaBody(),async (ctx) =>{
    //   console.log('put request..');
    //   console.log(ctx.request.body);
    //   const updateUser = await prisma.user.update({
    //     where: {
    //         shop_url : ctx.params.id,
    //     },
    //     data: {
    //         account_number : ctx.request.body.account_number,  
    //         user_name : ctx.request.body.user_name,
    //         password : ctx.request.body.password,
    //         company : ctx.request.body.company, 
    //         country : ctx.request.body.country, 
    //         city : ctx.request.body.city, 
    //         email : ctx.request.body.email, 
    //         address1 : ctx.request.body.address1, 
    //         address2 : ctx.request.body.address2, 
    //         contact : ctx.request.body.contact, 
    //         mobile : ctx.request.body.mobile, 
    //         password : ctx.request.body.password,   
    //     },
    //   })
    // })
     router.get('/users',UserController.findOne);
     router.post('/users',UserController.create);
     
     router.get('/users',UserController.find); 
     router.delete('/users/:id', UserController.destroy);
     

     // appSession routes
     router.get('/sessions/:sessionId',AppSession.findOne);
     router.post('/sessions',koaBody(),AppSession.create);
     
     router.get('/sessions',AppSession.find); 
     router.delete('/sessions/:sessionId', AppSession.destroy);
     router.put('/sessions/:sessionId',koaBody(),AppSession.update);

export default router; 