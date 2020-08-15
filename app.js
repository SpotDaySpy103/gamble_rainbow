const express = require('express');
const logger = require('morgan');
require('dotenv').config();
const cors = require('cors')

const port = process.env.PORT || 3000

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

require('./routes/index')(app);

app.listen(port, () => {
  console.log(`Listening on 1 http://localhost:${port}`)
})

module.exports = app;
