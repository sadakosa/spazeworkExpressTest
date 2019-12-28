const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')

const app = express();



//==========================================
//                GRAPHQL
//==========================================
//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
app.use('/graphql', graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql:true
}));


//==========================================
//        CONNECTING TO MONGO DB
//==========================================
const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/spazeworkTest'
mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})


//==========================================
//            STARTING UP APP
//==========================================
app.listen(3000, () => {
    console.log('Listening on port 3000');
}); 