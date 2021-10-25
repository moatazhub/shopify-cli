import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, {DataType, ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
//const axios = require('axios');
import axios from "axios";
import routes from './router/index';
import fs from 'fs';
import {Session} from '@shopify/shopify-api/dist/auth/session';
//import { FORCE } from "sequelize/types/lib/index-hints";
const bodyParser = require('koa-parser');

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

const FILENAME = './session.json';
function storeCallback(session){
  console.log('storeCallback ',session);
  fs.writeFileSync(FILENAME, JSON.stringify(session));
  return true;
}
function loadCallback(id){
  console.log('loadCallback ',id);
  if(fs.existsSync(FILENAME)){
    const sessionResult = fs.readFileSync(FILENAME,'utf8');
    return Object.assign(
      new Session,
      JSON.parse(sessionResult)); 
  }
  return false;  
}
function deleteCallback(id){
  console.log('deleteCallback', id);
}
const sessionStorage = new Shopify.Session.CustomSessionStorage(
  storeCallback,
  loadCallback,
  deleteCallback
)

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOSTLT.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.April21,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),//sessionStorage,
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};

// const session = loadCallback();
// if(session?.shop && session?.scope){
//   console.log('session ',session);
//   ACTIVE_SHOPIFY_SHOPS[session.shop] = session.scope;
// }




app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) =>
            delete ACTIVE_SHOPIFY_SHOPS[shop],
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }
        else{
          console.log('register APP_UNINSTALLED webhook...')
        }

        console.log('shop ',shop);
        console.log('access ',accessToken);


        //   ////////////////////////////////////////////////////////////////////////
//   // add new carrire service
       
        //  const url = `https://${shop}/admin/api/2021-07/carrier_services.json`;
    
        // const shopifyHeader = (token) => ({
        //     'Content-Type' : 'application/json',
        //     'X-Shopify-Access-Token' : token
        // })
        // console.log('start2 webhook');
        // let payload = {
        //     "carrier_service": {
        //     "name": "EgyptExpress Rate",
        //     "callback_url": "https://95fd1458dd39.ngrok.io/api/shipping-rate",
        //     "service_discovery": true
        //     }
        // }
        // console.log('start3 webhook');
        // const addCarrier = await axios.post(url, payload, {headers : shopifyHeader(accessToken)});
        // ctx.body = addCarrier.data;
        // console.log(addCarrier.data);
        // ctx.res.statusCode = 200;
        // console.log('start4 webhook');
 
 

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

//   ////////////////////////////////////////////////////////////////////////
//   // add new carrire service
//   router.post('/addCarrier', verifyRequest(), async (ctx, res) => {
//     // const { shop, accessToken } = ctx.session;
//     console.log('start1 webhook');
//      const shop = ctx.query.shop;
//      const accessToken = ctx.query.accessToken;
//      const url = `https://${shop}/admin/api/2021-07/carrier_services.json`;
 
//      const shopifyHeader = (token) => ({
//          'Content-Type' : 'application/json',
//          'X-Shopify-Access-Token' : token
//      });
//      console.log('start2 webhook');
//      let payload = {
//          "carrier_service": {
//          "name": "EgyptExpress Fulfillment",
//          "callback_url": "https://4f02006c4ad8.ngrok.io/api/shipping-rate",
//          "service_discovery": true
//          }
//      }
//      console.log('start3 webhook');
//      const addCarrier = await axios.post(url, payload, {headers : shopifyHeader(accessToken)});
//      ctx.body = addCarrier.data;
//      console.log(addCarrier.data);
//      ctx.res.statusCode = 200;
//      console.log('start4 webhook');
//  });
 ///////////////////////////////////////////////////////////////////////////
 
  //server.use(bodyParser());

  
  
  
  //server.use(bodyParser());

  // use cobine route
  server.use(routes());

  

 
  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(.*)", async (ctx) => {
    const shop = ctx.query.shop;

    // This shop hasn't been seen yet, go through OAuh to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });

  // router for dashboard
  router.get("/dashboard", handleRequest); 
  // router for about
  router.get("/about", handleRequest); 
  

  server.use(router.allowedMethods());
  server.use(router.routes());

  const db = require('../models');
  db.sequelize.sync()
     .then(() => console.log('models sysced!'))
     .catch(err => console.log(err));
  
  server.context.db = db;   

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
