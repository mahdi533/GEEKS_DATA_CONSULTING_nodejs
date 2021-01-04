const mongoose =require('mongoose');

var schema = mongoose.Schema

var sujetSchema =new schema({
    titre : {type:String,required :true},
    description  : {type:String,required :true},
    choix  : {type:Boolean},
    nombreDeVote: {type:Number},
    idUser:{type:String,required :true},
})
module.exports=mongoose.model('sujet',sujetSchema);