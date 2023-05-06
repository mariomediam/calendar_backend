/*
    Rutas de eventos
    host + /api/events    
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use(validarJWT);

const {
  getEventos,
  crearEvento,
  actulizarEvento,
  eliminarEvento,
} = require("../controllers/events");

router.get("/", getEventos);

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inico es obligatoria").custom(isDate),
    check("end", "La fecha fin es obligatoria").custom(isDate),
    validarCampos,
  ],

  crearEvento
);

router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inico es obligatoria").custom(isDate),
    check("end", "La fecha fin es obligatoria").custom(isDate),
    validarCampos,
  ],
  actulizarEvento
);

router.delete("/:id", eliminarEvento);

module.exports = router;
