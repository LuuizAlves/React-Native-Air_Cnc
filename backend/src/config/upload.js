const multer = require('multer');
const paht = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: paht.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) =>{
            const ext = paht.extname(file.originalname);
            const name = paht.basename(file.originalname, ext);
            
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};