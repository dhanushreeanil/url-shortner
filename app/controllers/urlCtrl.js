const Url = require("../models/url")

const urlCtlr = {}

urlCtlr.list = (req,res) => {
    Url.find()
        .then((urls)=>{
            res.json(urls)
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlCtlr.create = (req,res) => {
    const body = req.body
    const url = new Url(body)
    url.save()
        .then((url)=>{
            res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlCtlr.show = (req,res) => {
    const id = req.params.id
    Url.findById(id)
        .then((url)=>{
            res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlCtlr.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Url.findByIdAndUpdate(id, body , { new:true, runValidators:true })
        .then((url)=>{
            res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlCtlr.destroy = (req,res) => {
    const id = req.params.id
    Url.findByIdAndDelete(id)
        .then((url)=>{
            res.json(url)
        })
        .catch((err)=>{
            res.json(err)
        })
}

urlCtlr.redirect = (req,res) => {
    const hash = req.params.hash
    Url.findOne({ hashedUrl: hash })
    .then((url) => {
      res.redirect(url.originalUrl);
    })
    .catch((error) => {
      res.json(error);
    });
}

module.exports = urlCtlr