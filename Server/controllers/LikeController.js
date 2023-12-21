import Sauce from '../models/sauceModel.js';
import { tryCatch } from "../utils/tryCatch.js";

export const likingSystem = tryCatch(async (req, res) => {
  const sauceId = req.params.id
  let { like, userId } = req.body

  switch (like) {
    case 1:
      await Sauce.updateOne({ _id: sauceId }, {
        $inc: { likes: +1 },
        $push: { usersLiked: userId }
      })
        res.status(200).json({ message: 'Like ajouté !' })
      break;

    case 0:
      const sauce = await Sauce.findOne({ _id: sauceId })
          if (sauce.usersLiked.includes(userId)) {
            await Sauce.updateOne({ _id: sauceId }, {
              $inc: { likes: -1 },
              $pull: { usersLiked: userId }
            })
              res.status(200).json({ message: 'Like supprimé !' })
          }
          if (sauce.usersDisliked.includes(userId)) {
            await Sauce.updateOne({ _id: sauceId }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: userId }
            })
              res.status(200).json({ message: 'Dislike supprimé !' })
          }
      break;

    case -1:
      await Sauce.updateOne({ _id: sauceId }, {
        $inc: { dislikes: +1 },
        $push: { usersDisliked: userId }
      })
        res.status(200).json({ message: 'Dislike ajouté !' })
      break;

    default: console.log(error);
  }
});