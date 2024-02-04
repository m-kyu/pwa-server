
const testRouter = require('express').Router();
const { MongoClient } = require('mongodb');

let connectUrl = 'mongodb+srv://minkyu:6L3lCooFyja23Nmh@minkyu.rlol7cf.mongodb.net/?retryWrites=true&w=majority';
let client = new MongoClient(connectUrl);
let collection;

const dbConnect = async ()=>{
  connectUrl = 'mongodb+srv://minkyu:6L3lCooFyja23Nmh@minkyu.rlol7cf.mongodb.net/?retryWrites=true&w=majority';
  client = new MongoClient(connectUrl);
  await client.connect(); 
}
dbConnect();

const crud = async (type, info)=>{
    const db = await client.db('bucket');
    collection = await db.collection('bucket-list');

  switch(type){
    case 'post':await collection.insertOne(info); break;
    case 'put':await collection.updateOne({id:Number(info.id)},{$set:{name:info.name}}); break;
    case 'delete':await collection.deleteMany({id:Number(info)}); break;
  }
  
  const data = await collection.find().toArray();
  
  return data;
}

testRouter.get('/', async function (req, res) {
  res.send('hello');
})

testRouter.get('/test', async function (req, res) {
    res.send(await crud('get'));
})

testRouter.post('/test/', async function (req, res) {    
    res.send(await crud('post',req.body));
})

testRouter.delete('/test/:id', async function (req, res) {
    const {id} = req.params;    
    res.send(await crud('delete',id));
})

testRouter.put('/test/', async function (req, res) {
    res.send(await crud('put',req.body));
})


module.exports = testRouter;


