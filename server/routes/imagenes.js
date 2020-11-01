const express = require('express');
const fs = require('fs');
let app = express();
const path = require('path');
const { verificaToken } = require('../middlewares/authentication');

app.get('/imagen/:tipo/:img', verificaToken, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, '../../uploads/' + tipo + '/' + img);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let noImgPath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImgPath);
    }
});


module.exports = app;