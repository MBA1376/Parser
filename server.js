const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

//Load controller file
const controller = require('./logic/main-component');

app.get('/' , (req , res) => {
    res.json({svg : controller.svg});
});


app.listen(port , () => {
    console.log(`app running on port ${port}`);
});

