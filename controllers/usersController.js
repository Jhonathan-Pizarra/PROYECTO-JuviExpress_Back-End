const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {

    login(req,res){

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email,
            async (err,cUser) =>{
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del usuarui',
                        error: err
                    });
                }

                if (!cUser) {
                    return res.status(401).json({
                        success: false,
                        message: 'El email no fue encontrado'
                    });
                }

                const isPasswordValid = await bcrypt.compare(password, cUser.password);

                if (isPasswordValid) {
                    const token = jwt.sign({id: cUser.id, email: cUser.email}, keys.secretOrKey,{});
                    const data = {
                        id: `${cUser.id}`,
                        name: cUser.name,
                        lastname: cUser.lastname,
                        email: cUser.email,
                        phone: cUser.phone,
                        image: cUser.image,
                        session_token: `JWT ${token}`
                    }

                    return res.status(201).json({
                        success: true,
                        message: 'Usuario autenticado!',
                        data: data //El id del usuario que se registró
                    })
                }else{
                    return res.status(401).json({
                        success: false,
                        message: 'El password es incorrecta',
                    })
                }

            });
    },

    register(req, res){
        const user = req.body; //Capturo los datos que envie el cliente
        User.create(user, (err,data) =>{
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuarui',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente',
                data: data //El id del usuario que se registró
            })
        });
    }
}