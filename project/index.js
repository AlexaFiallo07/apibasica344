const express = require('express');
const { MongoClient } = require('mongodb');

const app = express()

app.get('/driver', (req, res) => {
    const MongoClient = require('mongodb').MongoClient;
    // Connection url
    const url = 'mongodb+srv://Alexfialloc:2RvkNysQr6JFTPoM@cluster0.gj3ljbb.mongodb.net/';
    // Database Name
    const dbName = 'Prueba433';
    // Connect using MongoClient
    const mongoClient = new MongoClient(url);

    mongoClient.connect(function (err, client) {
        const db = client.db(dbName);
        client.close();
    });


});

app.get('/productos', async(req, res)=>{
   const url = 'mongodb+srv://Alexfialloc:2RvkNysQr6JFTPoM@cluster0.gj3ljbb.mongodb.net/'
    let client;
    try {
        client = new MongoClient(url);
        await client.connect();
        const dbName = 'prueba';
        const db = client.db(dbName);
        const productos = await db.collection('productos').find({}).toArray();

        res.json(productos);
    } catch(err) {
        res.status(500).json({error: err.message});
    }finally{
        client?.close();
    }
});

app.get('/productos/:id', async (req, res) => {
    const url = 'mongodb+srv://Alexfialloc:2RvkNysQr6JFTPoM@cluster0.gj3ljbb.mongodb.net/'
    let client;
    try {
        client = new MongoClient(url);
        await client.connect();
        const dbName = 'prueba';
        const db = client.db(dbName);
        const producto = await db.collection('productos').findOne({
            consecutivo: parseInt(req.params.id)
        });
        
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        
        res.json(producto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        client?.close();
    }

});

app.post('/productos', async (req, res) => {
   const url= 'mongodb+srv://Alexfialloc:2RvkNysQr6JFTPoM@cluster0.gj3ljbb.mongodb.net/'
   let client;
   try {
       client = new MongoClient(url);
       await client.connect();
       const dbName = 'prueba';
       let productoNuevo = {
           consecutivo: req.body.consecutivo,
           nombre: req.body.nombre,
           precio: req.body.precio,
       }
       const db = client.db(dbName);
       const productos = await db.collection('productos').insertOne(productoNuevo);
      
       res.json(productos);
   } catch (err) {
       res.status(500).json({ error: err.message });
   } finally {
       client?.close();
   }
});




app.listen(9991)