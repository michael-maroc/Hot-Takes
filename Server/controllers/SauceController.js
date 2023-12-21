import Sauce from '../models/sauceModel.js';
import fs from 'fs';
import { tryCatch } from "../utils/tryCatch.js";

// Get all Sauces
export const getAllSauces = tryCatch(async (req, res) => {
  const sauces = await Sauce.find()
  sauces 
    ? res.status(200).json(sauces)
    : res.status(204).json({ message: "No sauces to display"})
});

// Get a single Sauce
export const getOneSauce = tryCatch(async (req, res) => {
  const sauce = await Sauce.findOne({ _id: req.params.id })
  sauce
    ? res.status(200).json(sauce)
    : res.status(404).json({ message: "No sauce found"})
});

// Create a Sauce
export const createSauce = tryCatch(async (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  await sauce.save()
  res.status(201).json({ message: 'Sauce successfuly created !'})
});

// Update a Sauce
export const updateSauce = tryCatch(async (req, res) => {
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split('/images')[1];
      fs.unlink(`images/${filename}`, (error) => { if (error) throw error })
    })
    .catch(error => res.status(400).json({ error }));
  }

  const sauceObject = req.file 
    ? { ...JSON.parse(req.body.sauce), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} 
    : { ...req.body };

  delete sauceObject._userId;
  const sauce = await Sauce.findOne({ _id: req.params.id})
  sauce.userId != req.auth.userId 
    ? res.status(401).json({ message : 'Unauthorized'})
    : await Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id}),
    res.status(200).json({ message : 'Sauce successfuly updated !'})
});

// Delete a Sauce
export const deleteSauce = tryCatch(async (req, res) => {
  const sauce = await Sauce.findOne({ _id: req.params.id })
  if (sauce.userId != req.auth.userId) {
    res.status(401).json({ message : 'Unauthorized'});
  }
  else {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, async (error) => {
      error 
      ? res.status(401).json({ error })
      : await Sauce.deleteOne({ _id: req.params.id }),
      res.status(200).json({ message: 'Sauce successfuly deleted !'})
    });
  }
});