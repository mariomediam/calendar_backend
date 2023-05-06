const { response } = require("express");
const bcrypt = require("bcryptjs");

const { generarJWT } = require("../helpers/jwt");

const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res = response) => {
  try {
    const { name, email, password } = req.body;

    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ ok: false, msg: "El correo ya existe" });
    }

    // crear usuario con el modelo
    usuario = new Usuario({ name, email, password });

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);


    await usuario.save();

    return res
      .status(201)
      .json({ ok: true, uid: usuario.id, name: usuario.name, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error inesperado" });
  }
};

const loginUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ ok: false, msg: "Usuario y contraseña no existen" });
    }

    // Confirmar los passwords    
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({ ok: false, msg: "Usuario y contraseña no existen" });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    return res.json({ ok: true, 
        uid: usuario.id,
        name: usuario.name,
        token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error inesperado" });
  }
};

const revalidarToken =  async (req, res = response) => {
  const { uid, name } = req;

  const token = await generarJWT(uid, name);


  return res.json({ ok: true, token });
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };
