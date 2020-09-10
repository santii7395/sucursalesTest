const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index.route');
const mongoConnection = require('./bbddConnection/mongoConnection');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

mongoConnection.connect((err) => {
    if (err){
      console.log("Error: ", err);
      process.exit(1);
    }
    app.listen(8000, () => {
      console.log('app listening on port 8000!')
    });
})



app.use(bodyParser.json({limit: '16mb'}));
app.use(bodyParser.urlencoded({limit: '16mb', extended: true, parameterLimit: 16000 }));
app.use('/api', routes);

module.exports = app;