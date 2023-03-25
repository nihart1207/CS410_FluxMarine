const Part = require('../models/parts');

exports.getAllParts = async (req, res, next) => {
    try {
      const parts = await Part.find();
      res.status(200).json(parts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
};

exports.addNewPart = async (req, res, next) => {
  try {
    const {partNumber, partDescription, partImageURL} = req.body;
    
    const part = new Part({ partNumber, partDescription, partImageURL });
    
    await part.save();
    res.status(200).json({message: "part added"});

    // user created successfully
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
    // user already exists
  }
};