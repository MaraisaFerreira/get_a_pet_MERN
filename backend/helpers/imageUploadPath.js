const multer = require('multer');
const path = require('path');

const imageStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		let folder = '';

		if (req.baseUrl.includes('users')) {
			folder = 'users';
		} else if (req.baseUrl.includes('pets')) {
			folder = 'pets';
		}

		cb(null, `public/images/${folder}`);
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const imageUpload = multer({
	storage: imageStorage,
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(png|jpg)$/)) {
			return cb(new Error('Só pode ser enviado arquivos jpg ou png.'));
		}
		cb(undefined, true);
	},
});

module.exports = { imageUpload };
