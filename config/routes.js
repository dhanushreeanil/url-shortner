const express = require("express")
const urlCtlr = require("../app/controllers/urlCtrl")

const router = express.Router()

router.get("/urls", urlCtlr.list)
router.post("/urls", urlCtlr.create)
router.get("/urls/:id", urlCtlr.show)
router.put("/urls/:id", urlCtlr.update)
router.delete("/urls/:id", urlCtlr.destroy)
router.get("/:hash", urlCtlr.redirect)

module.exports = router