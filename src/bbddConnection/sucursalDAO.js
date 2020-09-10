// const mongoConnection = require('./mongoConnection');
// const uri = "mongodb+srv://fravega:fravega123@cluster0.efldm.mongodb.net/cluster0?retryWrites=true&w=majority";
// const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const db = require('./mongoConnection');

async function insert(object){
    try{
        await db.getDatabase().db("fravega").collection("sucursales").insertOne(object);
        return 'Insertada correctamente';
    }catch(error){
        console.log(error);
        return {error: 'Ocurrio un error al insertar'};
    }
}

async function get(id){
    try{
        let sucursal = await db.getDatabase().db("fravega").collection("sucursales").findOne({"_id" : new ObjectId(id)});

        return sucursal;
    }catch(error){
        console.log(error);
        return {error: 'Ocurrio un error al obtener la sucursal'};
    }
}

async function search(filters){
    try{
        let sucursales = db.getDatabase().db("fravega").collection("sucursales").find(filters).toArray();
        return sucursales;
    }catch(error){
        console.log(error);
        return {error: 'Ocurrio un error al obtener las sucursales'};
    }
}

module.exports = {
    insert,
    get,
    search
}

