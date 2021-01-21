
const express = require('express');
const { toDefaultValue } = require('sequelize/types/lib/utils');
const router = express.Router();
const db = require('../models');

router.use(express.urlencoded({extended: false}));
router.use(express.json);



router.get('/', (req,res) => {
  
    res.render('index')
})


router.get('/api', async (req, res) => {
    //return all of the current todos
    try{
        let records = await db.todos.findAll();
        res.json(records)
    }
    catch(error){
        res.send(error)
    }
})


router.post('/api', async (req, res) => {
    //insert a todo
    try{
        let results = await db.todos.create({
            description: req.body.description,
        })
        let records = await db.todos.findAll()
        res.json(records)
    }
    catch(error){
        res.send(error)
    }
  
})

router.patch('/api/description/:id', async (req, res) => {
    //update a todo description
    try{
        let results = await db.todos.update({description: req.body.description},{where:{id:req.body.id}})
        let records = await db.todos.findAll()
        res.json(records)
    }
    catch(error){
        res.send(error)
    }
    

   
})



router.delete('/api/:id', async (req, res) => {
    
    try{
        let results = await db.todos.destroy({where: {id: req.body.id}})
        let records = await db.todos.findAll()
        res.json(records)
    }
    catch(error){
        res.send(error)
    }
})

router.delete('/api/all', async (req, res) => {
    //deletes all entries
    try{
        let results = await db.todos.destroy()
        let records = await db.todo.findAll()
        res.json(records)
    }
    catch(error){
        res.send(error)
    }
})

module.exports = router;