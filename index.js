const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const productsRouter =require('./routes/Products');
const brandsRouter = require('./routes/Brands');
const categoriesRouter = require('./routes/Categories');
const authRouter = require('./routes/Auth');
const usersRouter = require('./routes/Users');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');



const server = express();
server.use(cors({
    exposedHeaders:['X-Total-Count']
}));

main().catch(err=> console.log(err));
server.use(express.json()); 

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    console.log('database connected')
}



server.get('/',(req, res)=>{
    res.json({status:'success'})
});

server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/brands', brandsRouter.router);
server.use('/users', usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart', cartRouter.router);
server.use('/orders', ordersRouter.router);

server.listen(8080, ()=>{
    console.log('server started')
})