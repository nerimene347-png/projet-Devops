const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");
const ApiError = require("../utils/ApiError");

// GET /api/notifications — notifications personnelles + diffusions générales
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    $or: [{ destinataire: req.user._id }, { destinataire: null }],
  }).sort({ createdAt: -1 });
  res.json(notifications);
});

// PATCH /api/notifications/:id/lu
const marquerCommeLue = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { lu: true },
    { new: true },
  );
  if (!notification) throw new ApiError(404, "Notification introuvable.");
  res.json(notification);
});

// POST /api/notifications  (Administrateur/DRH/RSSI — diffusion)
const creerNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.create(req.body);
  res.status(201).json(notification);
});

module.exports = { getNotifications, marquerCommeLue, creerNotification };
