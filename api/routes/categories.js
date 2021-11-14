const router = require('express').Router()
const Category = require('../models/Category')
//Register
router.post("/", async (req, res) => {

    const newCat = new Category(req.body);
    try{
        const savedCat = await newCat.save();
        res.status(200).json(savedCat)
    }

    catch(err){
        res.status(500).json(err)
    }
})

router.get("/", async (req, res) => {

    
    try{
        const savedCat = await Category.find();
        res.status(200).json(savedCat)
    }

    catch(err){
        res.status(500).json(err)
    }
})

//DELETE

router.delete("/:id", async (req, res) => {

    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            try{
                await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted");
            }
        
            catch(err){
                res.status(500).json(err);
            }
        } catch(err){
            res.status(404).json("User not found");
        }
    }

    else {
        res.status(401).json("You can only delete your account");
    }
})

router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router