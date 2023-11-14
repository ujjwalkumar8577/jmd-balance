const mongoose = require('mongoose');

const UpdateHistory = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
  },
  count: { type: Number, required: true },
},
{ timestamps: true });

UpdateHistory.index({ 'user.name': 1 });
module.exports = new mongoose.model('updateHistory', UpdateHistory, 'updateHistory');
