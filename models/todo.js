var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Todo Schema
var TodoSchema  = new Schema({
  title: String
})

// Export todoModel
module.exports = mongoose.model('Todo', TodoSchema);