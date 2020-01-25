const express = require("express");
const router = express.Router();
const passport = require("passport");
const fs = require("fs");
const multer = require("multer");

const Photo = require("../../models/Photo");


router.use(multer({ dest: "./uploads/",
    rename: function (fieldname, filename) {
      return filename;
    },
}).single('photo'));


// @route POST api/photo
// @desc upload photo and save in mongo
// TODO: @access Private
router.post("/upload", 
    // passport.authenticate("jwt", { session: false }),  // authentication line, implement after front-end 
    function(req,res){
        var newPhoto = new Photo({
            op: req.body.op,
            img: {
                data: fs.readFileSync(req.file.path),
                contentType: "image/png"
            },
            featured: req.body.featured
        });
    
        // newItem.img.data = fs.readFileSync(req.file.path)
        // newItem.img.contentType = "image/png";
        newPhoto.save().then(task => res.json(task))
        .catch(err => console.log(err));
    // res.send("success")
    }
 );

//upload form
router.get("/upload",
    // passport.authenticate("jwt", { session: false }),
    function(req,res){
        console.log('Accessing the secret section ...')
        res.sendFile("test.html", {root: __dirname })
    }
);

// @route GET api/photos/:id
// @desc Get specific photo by id
// TODO: @access Private 
router.get(
    "/:id",
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        let id = req.params.id;

        Photo.findById(id).then(photo => res.json(photo));
    }
);

// @route DELETE api/photos/delete/:id
// @desc Delete an existing photo
// TODO: @access Private
router.delete(
    "/delete/:id",
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Photo.findById(req.params.id).then(photo => {
        photo.remove().then(() => res.json({ success: true }));
        });
    }
);
  


  
module.exports = router