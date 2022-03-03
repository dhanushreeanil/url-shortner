const shorthash = require("shorthash")
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
    const hash = req.params.hash;
    const userAgent = req.useragent;
    console.log("userAgent", req.useragent)
    const clicksNew = {
      clickDateTime: new Date(),
      ipAddress: Object.keys(userAgent.geoIp).length
        ? ""
        : "Couldn't find the Ip",
      browser: userAgent.browser,
      platform: userAgent.platform,
      device: userAgent.isDesktop && !userAgent.isMobile ? "desktop" : "mobile",
    };
    Url.findOneAndUpdate({ hashedUrl: hash },{ $push: { clicks: clicksNew }}, {new:true})
      .then((url) => {
        url.count = url.count + 1
        url.save()
        .then((data)=>{
            console.log(data,"data");
        })
        .catch((err)=>{
            console.log(err);
        })
        console.log("hashedurl",url);
        res.redirect(url.originalUrl);
      })
      .catch((error) => {
        console.log(error);
      });
}

module.exports = urlCtlr