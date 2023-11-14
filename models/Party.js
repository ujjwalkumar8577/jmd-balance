const mongoose = require('mongoose');

const Party = new mongoose.Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  area: { type: String, default: '' },
  contact: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false },
},
{ timestamps: true });

Party.index({ name: 1 });
Party.index({ contact: 1 });
module.exports = new mongoose.model('party', Party, 'party');
