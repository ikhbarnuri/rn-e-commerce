const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const productRouter = require('./routes/productRoute');
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
const port = process.env.PORT || 3000;

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/products', productRouter);
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);

app.listen(port, () => console.log('Example app listening on port ' + port));