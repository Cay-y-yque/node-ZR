const { MongoClient } = require('mongodb');
require("dotenv").config();
const URI = process.env.URI;
const mongoClient = new MongoClient(URI);

async function connect(){
    try{
        await mongoClient.connect();
        await mongoClient.db().command({ping: 1});
        console.log("Conexão com o DB realizada com sucesso!");
    }
    catch(error){
        console.log(error);
    };
};

async function getDataBases(){
    const dataBaseList = await mongoClient.db().admin().listDatabases();
    console.log("Databases: ");
    dataBaseList.databases.forEach((db) => {
        console.log(db.name);
    });

};

async function main(){
    await connect();
    await getDataBases();
    const quant = await mongoClient.db("sample_restaurants").collection("restaurants").countDocuments({"borough": "Bronx"});
    console.log(quant);
    //await findListings(mongoClient, 10000);
    mongoClient.close();

};

async function findListings(mongoclient, resultsLimit) { 
    const cursor = mongoclient.db('sample_restaurants')
     .collection('restaurants')
     .find({"borough": "Bronx"});
     //.limit(resultsLimit); 
    const results = await cursor.toArray(); 
    if (results.length > 0) { 
        console.log(`Found ${results.length} listing(s):`); 
        results.forEach((result, i) => { 
            console.log(`\n${i + 1}. Endereço: ${result.borough}`); 
        });
    }
};


main();