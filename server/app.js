const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer');
require('./db/mongoose');
const User = require('./modal/user')
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("The server started on port 3000 !!!!!!");
});



app.get("/", (req, res) => {
    res.send(
      `<h1 style='text-align: center'>
            Wellcome to FunOfHeuristic 
            <br><br>
            <b style="font-size: 182px;">😃👻</b>
        </h1>`
    );
  });



  const upload = multer({
    // dest: 'imagesT',
     limits: {
         fileSize: 1000000
     }
     //,
     // fileFilter(req, file, cb) {
     //     if (!file.originalname.match(/\.(doc|docx)$/)) {
     //         return cb(new Error('Please upload a Word document'))
     //     }
 
     //     cb(undefined, true)
     // }
 })
 app.post('/file', upload.single('file'), async (req, res) => {
  const user = new User();

  user.avatar = req.file.buffer;
var defer =  await user.save();
console.log(defer._id);
 const filet = await User.findOne({_id:defer._id})
    res.set('Content-Type','image/jpg')
     res.send(filet)
 }, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
 })


  app.post('/file12', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file);
  
    console.log(req.body.file);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })

  app.post('/multipleFiles', upload.array('files'), (req, res, next) => {
    const files = req.files;
   
    if (!files) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send({sttus:  'ok'});
  })

