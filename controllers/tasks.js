const Task = require('../models/tasks')

const getAllTasks = async (req,res) => {
    try {
        const task = await Task.find({})
        res.status(200).json({ task })
    }
    catch(error)  {
        res.status(500).json({msg: error})
    }
}

const createTask = async (req,res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getTaskById = async (req,res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).json({msg: 'No Task with given ID found'})
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ error})
    }
}

const updateTaskById = async (req,res) => {
    try {
        
        const taskID = req.params.id;
        const task = await Task.findByIdAndUpdate(taskID , req.body , { 
            new:true,
            runValidators:true
        })
        if(!task) {
            return res.status(404).json({msg: 'No Task with given ID found'})
        }
        res.status(200).json({ task })

    } catch (error) {
        res.statu(500).json({error})
    }
}

const deleteTaskById = async (req,res) => {
    try {
        const taskID = req.params.id
        const task = await Task.findByIdAndDelete(taskID);
        if(!task) {
            return res.status(404).json({msg: 'No Task with given ID found'})
        }
        res.status(200).json({task});
        
    } catch (error) {
        res.status(500).json({error});
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
}