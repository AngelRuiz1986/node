const router = require('express').Router();
const Note = require('./notes.model');
const NoteValid = require('./notes.valid');

router.post('/notes/add', async function(req, res){
    
    try{
        valid = NoteValid.noteNewValid(req.body);
        if (valid.status){
            const {title, description} = req.body;
            const newNote = new Note({title: title, description: description});
            const insert  = await newNote.save();
            res.status(200).send({message: 'notes', data: insert});
        }else{
            res.status(400).send({message:'Please validate the following fields', validations:valid.error})
        }
    }catch(e){
        res.status(500).send({message:'Server Error'})
    }
})

module.exports = router;