require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://jmdbalancefe.onrender.com',
  ]
}));

mongoose.connect(process.env.MONGO_URL, {}
).then(() => {
  console.log("Database Connected!");
}).catch((err) => {
  console.log(err);
});

const partyRouter = require('./routes/party.route.js');
app.use('', partyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Project: jmd-balance');
  console.log('Server started on port ' + PORT);
});
