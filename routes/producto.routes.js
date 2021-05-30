const express = require('express');
const router = express.Router();

const Producto = require('../models/producto');

router.get('/', async (req, res)=> {
    const producto = await Producto.find();
    
    res.json(producto);
})

router.get('/:id', async (req, res) => {
    const filterProducto = await Producto.findById(req.params.id);
    res.json(filterProducto);
});

router.post('/nuevo-producto', (req, res)=> {
    const newProducto = new Producto({
        nameProduct: req.body.nameProduct,
        productType: req.body.productType,
        price: req.body.price,
        place: req.body.place

    })
    newProducto.save().then(producto => res.json(producto))
});



router.put('/:id', async (req, res) => {
    
    const { nameProduct, productType,price, place, photo} = req.body;
    const newProducto = { nameProduct, productType, price, place, photo};
    await Producto.findByIdAndUpdate(req.params.id, newProducto);
    res.json({status: 'Producto actualizado'})

});

router.delete('/:id', async (req, res) => {
    // No se elimina
    await Producto.findByIdAndRemove(req.params.id);
    res.json({status: 'Producto eliminado'})
})
/*
router.get('/', (req, res)=> {
    res.json({
        status: 'API Works!'
    });
})*/

module.exports = router;