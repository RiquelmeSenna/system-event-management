import multer from "multer";

const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

export const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, callback) => {
        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Formato de arquivo inválido. Use JPEG ou PNG.'));
        }
    }
});
