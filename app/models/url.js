const mongoose = require("mongoose")
const validator = require("validator")
const shortHash = require("shorthash")

const Schema = mongoose.Schema

const urlSchema = new Schema({
    title : {
        type : String,
        required:[true, "title is required"]
    },
    originalUrl: {
        type: String,
        required: [true, "url is required"],
        validate : {
            validator : function (value) {
                return validator.isURL(value)
            },
            message: function () {
                return "enter a valid url";
            }
        }
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    hashedUrl : {
        type : String
    },
    count: {
        type : Number,
        default: 0
    },
    clicks: {
        type : [
        {
          clickDateTime: { type: Date },
          ipAddress: { type: String },
          browser: { type: String },
          platform: { type: String },
          device: { type: String },
        }
      ]
    }
})

urlSchema.pre("save", function (next) {
    const originalUrl = this.originalUrl;
    this.hashedUrl = shortHash.unique(originalUrl);
    next();
  });



const Url = mongoose.model("Url", urlSchema)

module.exports = Url