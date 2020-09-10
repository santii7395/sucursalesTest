const app = require('express');
const routes = app.Router();
const asyncHandler = require('express-async-handler');
const mongoConnection = require('../bbddConnection/sucursalDAO');

routes.route('/create').post(asyncHandler(create));

async function create(req,res){
    let sucursal = req.body.sucursal;
    if (!sucursal){
        res.status(400);
        return res.json({ error: 'sucursal param is mandatory' });
    }
    if (!sucursal.direccion){
        res.status(400);
        return res.json({ error: 'sucursal.direccion param is mandatory' });
    }
    if (!sucursal.latitud){
        res.status(400);
        return res.json({ error: 'sucursal.latitud param is mandatory' });
    }
    if (!sucursal.longitud){
        res.status(400);
        return res.json({ error: 'sucursal.longitud param is mandatory' });
    }

    let insertion = await mongoConnection.insert(sucursal);
    
    if (insertion.error){
        res.status(500);
        res.json(insertion);
        return;
    }

    res.send(insertion);
}

routes.get('/get', async(req,res) => {
    if (!req.query.id){
        res.status(400);
        res.json({ error: 'id param is mandatory' });
    }

    let sucursal = await mongoConnection.get(req.query.id);

    res.json({ sucursal: sucursal} );
});

routes.get('/getCloser', async(req,res) => {
    let latitud = req.query.latitud;
    if (!latitud){
        res.status(400);
        res.json({ error: 'latitud param is mandatory' });
        return;
    }
    let longitud = req.query.longitud;
    if (!longitud){
        res.status(400);
        return res.json({ error: 'longitud param is mandatory' });
    }

    let sucursales = await mongoConnection.search({});

    if (sucursales.error){
        res.status(500);
        res.json(sucursales.error);
        return;
    }

    let sucursalMasCercana;
    let menorDistancia;

    sucursales.forEach(sucursal => {
        let distancia = (Math.abs(sucursal.longitud - longitud) + Math.abs(sucursal.latitud - latitud));
        if (!menorDistancia || distancia < menorDistancia){
            sucursalMasCercana = sucursal.direccion;
            menorDistancia = distancia;
        }
    })

    res.send(sucursalMasCercana);
});

// exports.create = create;
module.exports = routes;