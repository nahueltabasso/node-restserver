const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/authentication');
const_ = require('underscore');

app.get('/usuario', verificaToken, (req, res) => {

    // Parametros opcionales en el request
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    // Como retornar una lista de elementos paginadas
    Usuario.find({ estado: true }, 'nombre email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err: err
                    });
                }

                Usuario.count({ estado: true }, (err, contador) => {
                    res.json({
                        ok: true,
                        usuarios: usuarios,
                        contador: contador
                    });
                });
                
            });
});
  
app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body; 

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        // usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                } 
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    // la funcion pick de underscore sirve para seleccionar los atributos del modelo que se pueden actualizar
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    
    });
});

module.exports = app;