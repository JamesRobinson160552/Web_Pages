const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://u1b4ugxiqgkvnhmhlkyz:csY71mfn2PW5WTeDwuOh@b1ilqnjm6dbzxqa-mongodb.services.clever-cloud.com:27017/b1ilqnjm6dbzxqa";
const DATABASE_NAME = "b1ilqnjm6dbzxqa";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var database, customer_collection, order_collection;


//Get all customers
app.get('/api/customers', (req, res) => {
    customer_collection.find({}).toArray((error, result) => {
        if (error){
            return res.status(500).send(error);
        }
        res.send(result);
    });
})

//Get one customer by ID
app.get('/api/customer/:customer_id', (req, res) => {
    var customer_id = req.params.customer_id;
    customer_collection.find({"customer_id":customer_id}).toArray((error, result) =>{
        if (error){
            return res.status(500).send(error);
        }
        res.send(result);
    });
})

//Get orders by customer ID
app.get('/api/orders/customer/:customer_id', (req, res) =>{
    var customer_id = req.params.customer_id;
    order_collection.find({"customer_id":customer_id}).toArray((error, result) => {
        if (error){
            return res.status(500).send(error);
        }
        res.send(result);
    })
})

//Get one order by id
app.get('/api/orders/:order_id', (req, res) => {
    var order_id = req.params.order_id;
    order_collection.find({"order_id":order_id}).toArray((error, result) => {
        if (error){
            return res.status(500).send(error);
        }
        res.send(result);
    })
})

//Create new Customer
app.post('/api/customers', (req, res) => {
    customer_collection.insert(req.body, (error, result) => {
        if (error){
            return res.status(500).send(error);
        }
        res.send(result);
    })
})

//Create new Order
app.post('api/orders', (req, res) => {
    order_collection.insert(req.body, (error, result) => {
        if (error){
            return res.status(500).send(error);
        }
        res.send(result);
    })
})

//Update Customer info
app.post('api/customers/:customer_id', (req, res) => {
    var customer_id = req.params.customer_id;
    var update_data = {$set: req.body};
    customer_collection.updateone({"customer_id":customer_id}, update_data, function(error, result){
        if (error){
            return res.status(500).send(error);
        }
        res.send(result.result);
    });
})

//Update Order info
app.post('api/orders/:order_id', (req, res) => {
    var order_id = req.params.order_id;
    var update_data = {$set: req.body};
    order_collection.updateone({"order_id":order_id}, update_data, function(error, result) {
        if (error){
            return res.status(500).send(error);
        }
        res.send(result.result);
    });
})

//Delete Customer
app.delete('api/customers/:customer_id', (req, res) => {
    var customer_id = req.params.customer_id;
    customer_collection.delete({"customer_id":customer_id}, (error, result) => {
        if (error){
            return res.status(500).send(error);
        }
        res.send(result);
    });
})


//Delete Order
app.delete('api/orders/:order_id', (req, res) => {
    var order_id = req.params.order_id;
    order_collection.delete({"order_id":order_id}, (error, result) => {
        if (error){
            return res.status(500).send(error);
        }
        res.send(result);
    })
})

//Set up database connection
app.listen(8080, () => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
      if(error) {
          throw error;
      }
      database = client.db(DATABASE_NAME);
      customer_collection = database.collection("customers");
      order_collection = database.collection("orders");
      console.log("Successful connection to " + DATABASE_NAME);
      console.log('Listening on localhost:8080 ...');
    });
});