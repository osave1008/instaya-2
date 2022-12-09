const express = require("express");
const router = express.Router();
const { Order, validator } = require("../models/orders");
const validate = require("../middlewares/validate");
const isValidObjectId = require("../middlewares/isValidObjectId");
const asyncHandler = require("../middlewares/asyncHandler");

// Crear una orden
router.post(
  "/",
  validate(validator),
  asyncHandler(async (req, res) => {
    await Order(req.body).save();
    res.status(200).send("Orden creada");
  })
);

// Obtener todas las ordenes
router.get(
  "/orders",
  asyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
  })
);

//Obtener orden por id
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.json(order);
  })
);

// Update
router.put(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    await Order.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).send("actualizacion exitosa");
  })
);

// Delete
router.delete(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("borrado exitoso");
  })
);

module.exports = router;
