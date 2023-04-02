const Sheet = require('../models/sheetModel')
const mongoose = require('mongoose')

const getSheets = async (req,res)=>{
    const user_id = req.user._id
    const sheets =await Sheet.find({user_id}).sort({createdAt:-1})
    res.status(200).json(sheets)
}

const getSheet =async (req,res)=> {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such record'})}
    const sheet = await Sheet.findById(id)
    if (!sheet){ //null
        return res.status(404).json({error: 'No such record'})
    }
    res.status(200).json(sheet)
}
//create new sheet
const createSheet = async (req,res)=>{
    const { title, content} = req.body;
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!content){
        emptyFields.push('content')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please fill in all the fields',emptyFields:emptyFields })
    }

    try {
        const user_id = req.user._id
        const sheet = await Sheet.create({ title, content, user_id});
        res.status(200).json(sheet)
    }catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deleteSheet  = async (req,res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such record'})}
    const sheet = await Sheet.findOneAndDelete({_id:id})
    if (!sheet){ //null
        return res.status(400).json({error: 'No such record'})
    }
    res.status(200).json(sheet)
}
const updateSheet = async (req,res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such record'})}
    const sheet = await Sheet.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if (!sheet){ //null
        return res.status(400).json({error: 'No such record'})
    }
    res.status(200).json(sheet)
}

module.exports = {
    createSheet,
    getSheet,
    getSheets,
    deleteSheet,
    updateSheet
}