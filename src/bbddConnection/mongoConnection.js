const uri = "mongodb+srv://fravega:fravega123@cluster0.efldm.mongodb.net/cluster0?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;
const mongoConnection = new MongoClient(uri, { useNewUrlParser: true });

let database;

async function connect(callback){
    mongoConnection.connect((err, db) =>{
        if (err) callback(err);

        database = db;
        console.log('conectado a la base de datos');
        callback(null);
    });
}

function getDatabase(){
    return database;
}

module.exports = {
    getDatabase,
    connect
}