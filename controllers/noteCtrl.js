const Note = require('../models/notesModel')

const noteCtrl = {
    getNotes:async(req,res)=>{
        try {
            const notes = await Note.find({user_id:req.user.id})
            res.json(notes)       
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    createNote: async(req,res)=>{
        try {
            const {title,content,date} = req.body;
            const newNote = new Note({
                title,
                content,
                date,
                user_id : req.user.id,
                name : req.user.name

            })
            await newNote.save()
            res.json(newNote)
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    deleteNote:async(req,res)=>{
        try {
            await Note.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted Succesfully"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    updateNote:async(req,res)=>{
        try {
            const {title,content,date} = req.body
            await Note.findOneAndUpdate({_id:req.params.id},{
                title,content,date
            })
            res.json({msg:"Updated Succesfully"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    getNote:async(req,res)=>{
        try {
            const note = await Note.findById(req.params.id)
            res.json(note)
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}

module.exports = noteCtrl