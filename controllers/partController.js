const Part = require('../models/parts');

exports.getAllParts = async (req, res, next) => {
    try {
      const parts = await Part.find();
      res.status(200).json(parts);
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

exports.addNewPart = async (req, res, next) => {
  if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  try {
    const {partName, partDescription} = req.body;
    const part = new Part({ partNumber, partDescription });
    await part.save();

    res.status(200).json({message: "succesfully added new part"});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deletePartById = async (req, res, next) => {
  if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  try {
    const {_id} = req.params;
    const part = await Part.findById(_id);
    await part.remove();
    res.status(200).json({message: "succesfully removed part"});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.getPartById = async (req, res, next) => {
  try {
    const {_id} = req.params;
    const part = await Part.findById(_id);
    res.status(200).json(part);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.updatePartById = async (req, res, next) => {
  if (req.user.role === "USER") res.status(401).json({message : "unauthorized to add"});

  try {
    const {_id} = req.params;
    const {partName, partDescription} = req.body;

    const part = Part.findById(_id);
    if (!part) res.status(404).json({message: "part not found"});
    if (partName) part.partName = partName;
    if (partDescription) part.partDescription = partDescription;

    await part.save();
    res.status(200).json({message: "succesfully updated"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }


};
