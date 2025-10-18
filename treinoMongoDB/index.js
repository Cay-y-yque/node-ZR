const { MongoClient } = require('mongodb');
const URI = "mongodb+srv://cayqueferreira11_db_user:~B({g)2278ZH&vRX@cluster0.magvqfe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    await findListings(mongoClient, 100);
    mongoClient.close();

};

async function findListings(mongoclient, resultsLimit) { 
    const cursor = mongoclient.db('sample_airbnb')
     .collection('listingsAndReviews') 
     .find() 
     .limit(resultsLimit); 
    const results = await cursor.toArray(); 
    if (results.length > 0) { 
        console.log(`Found ${results.length} listing(s):`); 
        results.forEach((result, i) => { 
            console.log(`\n${i + 1}. Name: ${result.name}`); 
            console.log(` Bedrooms: ${result.bedrooms}`); 
            console.log(` Bathrooms: ${result.bathrooms}`); 
        });
    }
};


main();