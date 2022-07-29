const router = require('express').Router();
const Notes  = require('../models/Notes')
const { isAuthenticated } = require('../helpers/auth')

router.put('/notes/note-edit/:id', isAuthenticated, async function (req, res) {

    const {title, description} = req.body;
    await Notes.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('success_msg', 'Note Updated Successfully')
    res.redirect('/notes')

});

router.delete('/notes/notes-delete/:id', isAuthenticated, async function (req, res) {
    await Notes.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note Deleted Successfully')
    res.redirect('/notes');
});

router.get('/notes/edit/:id', isAuthenticated, function(req, res){
    Notes.findById(req.params.id)
    .then(record => {

        const note = {
                    id: record.id,
                    title: record.title,
                    description: record.description,
                    date: record.date};
        res.render('notes/notes-edit', {  note: note })
    })
    
})

router.get('/notes/remove/:id', isAuthenticated, function(req, res){
    Notes.findById(req.params.id)
    .then(record => {

        const note = {
                    id: record.id,
                    title: record.title,
                    description: record.description,
                    date: record.date};
        res.render('notes/notes-remove', {  note: note })
    })
    .catch(error => res.status(500).send(error));
})

router.get('/notes/add', isAuthenticated, function(req, res){
    res.render('notes/notes-news');
})

router.get('/notes', isAuthenticated, async function(req, res){

    Notes.find()
        .sort({ date: -1 })
        .then(records => {
            const all = {
                notes: records.map(data => {
                    return {
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        date: data.date,
                    }
                })
            }
            res.render("notes/notes-all", {
                notes: all.notes
            })
        })
        .catch(error => res.status(500).send(error));
})


router.post('/notes/add', isAuthenticated, async function(req, res){
    const {title, description} = req.body;
    const errors = []
    
    if (!title){
        errors.push({msg: 'Please write a title'})
    }

    if (!description){
        errors.push({msg: 'Please write a description'})
    }

    if (errors.length > 0){
        res.render('notes/notes-news', {
            errors: errors,
            title: title,
            description: description
        })
    }else{
        const newNote = new Notes({ title: title, description: description})
        await newNote.save();
        req.flash('success_msg', 'Note Added Successfully')
        res.redirect('/notes');
    }

})

module.exports = router;