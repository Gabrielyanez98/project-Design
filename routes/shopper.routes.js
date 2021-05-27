const express = require('express');
const router = express.Router();

const Shopper = require('../models/shopper');



router.get('/', async(req, res)=> {
    const shopper = await Shopper.find();
    console.log(shopper);
    res.json(shopper);
})

router.get('/:id', async (req, res) => {
    const filterShopper = await Producto.findById(req.params.id);
    res.json(filterShopper);
});

router.post('/nuevo-shopper', (req, res) => {
    const newShopper = new Shopper ({
        name: req.body.name,
        surname: req.body.surname
    })
    newShopper.save().then(shopper => res.json(shopper));
})

router.put('/:id', async (req, res) => {

    const { name, surname, place, phone, gmail, user, password, likes, bankAccount} = req.body;
    const newShopper = { name, surname, place, phone, gmail, user, password, likes, bankAccount};
    await Shopper.findByIdAndUpdate(req.params.id, newShopper);
    res.json({status: 'Producto actualizado'})

});

router.delete('/:id', async (req, res) => {
    await Shopper.findByIdAndRemove(req.params.id);
    res.json({status: 'Producto eliminado'})
})

module.exports = router;