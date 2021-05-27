const express = require('express');;
const router = express.Router();

const Contact = require('../models/contact');

router.get('/', async(req, res) => {
    const contact = await Contact.find();
    res.json(contact)
})

router.post('/new_contact', (req, res)=> {
    const newContact = new Contact({
        gmail: req.body.gmail,
        phone: req.body.phone,
        textArea: req.body.textArea
    })
    newContact.save().then(contact => res.json(contact));
})

router.delete('/:id', async (req, res) => {
    await Contact.findByIdAndRemove(req.params.id);
    res.json({status: 'Contacto eliminado'})
})

module.exports = router