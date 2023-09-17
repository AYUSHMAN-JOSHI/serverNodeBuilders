// Express server
const express = require('express');
const path = require('path');
const conn = require('./conn');
const sessions = require('express-session');

const cors=require('cors')


const orderCollection = require('./order');
const userCollection = require('./users');
const feedbackCollection = require('./feedback');
const vegetableCollection = require('./vegetables');
const upiCollection = require('./upi');
const { log } = require('console');
// const functions = require('firebase-functions');

const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(sessions({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 36000000
    }
}));


// router.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/files/index.html'));
// });

router.post('/auth-login', async (req, res) => {
    // res.json(req.body);
    
    try{
        console.log(req.body);
        const result = await userCollection.findOne({email: req.body.email});
        if(result){
            console.log('Valid user');
            req.session.email = req.body.email;
            req.session.time = new Date();
            req.session.save();
            console.log(req.session);
            console.log('login successful');
        }
        // console.log(result);
        
    }catch(err){
        console.error(err);
        res.status(500).json({response: 'Internal Server Error'})
    }
});


router.post('/order', async (req, res) => {
    console.log(req.session, typeof(req.session.email));
    if(typeof(req.session.email) == 'string'){
        try {
            const order = req.body.order;
            console.log(order);
    
            const newOrder = new orderCollection({ items: order });
    
            await newOrder.save();

            req.session._id = newOrder._id;
            req.session.amt = req.body.total;

            req.session.save();
            console.log(req.session);
            
            console.log('Order saved successfully');
            // res.status(201).sendFile(path.join(__dirname + '/files/payment.html'));
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false });
        }
    }else{
        res.json(req.session);
    }
});

router.post('/payment', async(req, res) => {
    try {
        console.log('Reached');
        console.log(req.session);
        const id = req.body.upiID;
        const acc = await upiCollection.findOne({upiID: id});
        console.log(id, acc);

        // if(acc.amount != null && acc.amount >= req.session.amt){
            
        // }
        res.status(200).json({completed: true});
    } catch (error) {
        console.error(error);
        res.status(500).json({ completed: false });
    }
});

router.post('/submit-form', async (req, res) => {
    const formData = req.body;
    console.log(formData);

    try {
        const feedback = new feedbackCollection(formData);
        await feedback.save();

        res.status(201);

    } catch (error) {
        console.error(error);
    }

});

router.get('/items', async (req, res) => {
    try {
        const mongodbData = await vegetableCollection.find();
        res.send(mongodbData);
    } catch (error) {
        console.error(error);
    }
});

router.post('/items', async (req, res) => {
    console.log(req.body);
    console.log('This is items');
    const vegetableData = req.body;
    try {
        const vegetable = new vegetableCollection(vegetableData);
        await vegetable.save();

        res.status(200).send('Success');
    } catch (error) {
        console.error(error);
        res.status(500).json('Error');
    }
});

// router.post('/sample', (req))

const app = express();
app.use('/', router);
app.use(express.static(path.join(__dirname, 'files')));

// exports.app = functions.https.onRequest(app);

app.listen(process.env.PORT || 3050, () => {
    console.log('Running at Port 3050');
});
