const router       = require('express').Router();
const Joi          = require('@hapi/joi');
const MPermissions = require('../models/Permissions');


const schemaPermissions = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    description: Joi.string().min(6).max(1024)
})

router.post('/register', async (req, res) => {

    const { error } = schemaPermissions.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const object = new MPermissions({
        name: req.body.name,
        description: req.body.description
    });

    try 
    {
        const register = await object.save();
        res.json({
            data: register
        });
    } 
    catch (error) 
    {
        res.status(400).json({error})
    }
});


router.get('/list', async (req, res) => {

    try 
    {
        const records = await MPermissions.find();
        res.json({
            data: records
        })
    } 
    catch (error) 
    {
        res.status(400).json({error})
    }

});

const schemaPermissionsUpdate = Joi.object({
    id: Joi.string().min(6).max(1024).required(),
    name: Joi.string().min(6).max(255).required(),
    description: Joi.string().min(6).max(1024)
})

router.post('/update', async (req, res) => 
{
    try 
    {
        const { error } = schemaPermissionsUpdate.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        
        var newvalues = { $set: {name: req.body.name, description: req.body.description } };
        var query     = { id_: req.body.id };
        const result  = await MPermissions.updateOne(query, newvalues);

        res.json({
            data: result
        })
    } 
    catch (error) 
    {
        res.status(400).json({error})
    }
});

const schemaPermissionsDelete = Joi.object({
    id: Joi.string().min(6).max(1024).required(),
})

router.post('/delete', async (req, res) => 
{
    try 
    {
        const { error } = schemaPermissionsDelete.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        
        var query     = { id_: req.body.id };
        const result  = await MPermissions.deleteOne(query, newvalues);

        res.json({
            data: result
        })
    } 
    catch (error) 
    {
        res.status(400).json({error})
    }
});


module.exports = router;
