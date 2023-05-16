const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  return res.status(200).json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  try {
    const { title, notes, start, end } = req.body;

    const evento = new Evento({ title, notes, start, end, user: req.uid });

    const eventoGuardado = await evento.save();

    return res.status(201).json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

const actulizarEvento = async (req, res = response) => {
  try {
    const eventoId = req.params.id;
          
    const { uid } = req;

    
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        message: "Evento no existe",
      });

    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "No tiene privilegio de editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );


    return res.status(201).json({
      ok: true,
      eventoActualizado
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

const eliminarEvento = async (req, res = response) => {

  
  try {
    const eventoId = req.params.id;
    const { uid } = req;
    console.log(req)

    
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        message: "Evento no existe",
      });

      
    }


    console.log(evento.user.toString())
    console.log(uid)
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "No tiene privilegio de editar este evento",
      });
    }

    const eventoEliminado = await Evento.findByIdAndDelete(eventoId);

    return res.status(201).json({
      ok: true,
      eventoEliminado
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error inesperado",
    });
  }



  
};

module.exports = { getEventos, crearEvento, actulizarEvento, eliminarEvento };
