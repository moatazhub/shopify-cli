import Router from 'koa-router';
import { getShippingRate } from '../controllers/shipping_rate_controller';

const router = new Router({prefix: '/api'});

router.get('/', async (ctx) => {
    ctx.body = 'Get scrip tag';
});

router.get('/all', async (ctx) => {
    ctx.body = 'Get all scrip tag';
});

router.post('/shipping-rate', async (ctx) => {
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

router.delete('/', async (ctx) => {
    ctx.body = 'delete a scrip tag';
});

router.get('/test', async function(request, response) {
    var id = request.query.id; // $_GET["id"]
    console.log('id:'+id);
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.send(id)
  })

export default router; 