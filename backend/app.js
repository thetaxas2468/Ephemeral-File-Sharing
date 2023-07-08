const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(cors());

const milToSec = 60 * 1000;
// it is better to save these information in a database like an sql data base but the problem is
// because we want to constantly check the expiration date of the files we dont want to make requests to a database for now
// in order to do things more fast

// another thing we can do, we can sort files by expirationTime and add new ones by binarysearch and for each minute
// we will be checking the files from 0---k untill k is bigger than 0 ( k = expiration - now)

const upload = multer({ dest: 'uploads/' });
// const files = [];


app.put('/v1/file', upload.single('file'), (req, res) => {
    const { file } = req;
    const retentionTime = req.headers['retentiontime'] || 1;
    const fileName = `${uuidv4()}${path.extname(file.originalname)}`; // this is because we want to have unique name for each file and extname to get the .[type] of the file
    const filePath = path.join(__dirname, 'uploads', fileName);

    fs.renameSync(file.path, filePath);

    const sharableURL = `/v1/${fileName}`;

    setTimeout(() => {
        fs.unlinkSync(filePath); // Remove the file from disk because of the space
      }, milToSec * retentionTime);
    return res.status(200).json({ url: sharableURL });
});

app.get('/v1/:file', (req, res) => {
    const fileName = req.params.file;
    // const file = files.find((f) => f.url === `/v1/${fileName}`);
    const filePath = `${__dirname}/uploads/${fileName}`;

    if(fs.existsSync(filePath)){
        return res.status(200).sendFile(filePath);
    }
    else{
        return res.status(404).json({error:"File is not found!"});
    }

    // if (!file) {
    //     return res.status(404).json({ error: 'File not found' });
    // }

    // if (file.expirationTime < Date.now()) {
    //     fs.unlinkSync(file.filePath);
    //     files.splice(files.indexOf(file), 1);
    //     return res.status(404).json({ error: 'File expired' });
    // }

});



//  we can do this but instead if we do a timeout function that run after x minutes
// to delete the file it will be better


// const deleteExpiredFiles = () => {
//     const now = Date.now();
//     const expiredFiles = files.filter((file) => file.expirationTime < now);

//     expiredFiles.map((file) => {
//         fs.unlinkSync(file.filePath);
//         files.splice(files.indexOf(file), 1);
//     })
// };
// setInterval(function () {
//     deleteExpiredFiles();
// }, milToSec);








module.exports = app ;