import multer from 'multer';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  // explication à multer dans quel fichier enregistrer
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    // suppression des espaces pour les remplacer par des underscores
    const name = file.originalname.split(' ').join('_')
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension)
  }
});

// On appele la méthode multer à laquelle on passe notre objet storage et on appele la méthode single pour passer un fichier unique qui sera une image uniquement
export default multer({ storage }).single('image');