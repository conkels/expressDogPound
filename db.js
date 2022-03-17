const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/dog-pound", {
    useNewUrlParser: true
});

const dogSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 20
    },
    breed: {
        type: String,
        required: true,
        minlength: 2
    }
});

module.exports = mongoose.model("Dog", dogSchema);