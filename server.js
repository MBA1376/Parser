const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
//Load controller file
const controller = require('./logic/main-component');


app.use(cors());



app.get('/' , (req , res) => {
    res.json({strSvg : controller.strSvg});
});


app.listen(port , () => {
    console.log(`app running on port ${port}`);
});

