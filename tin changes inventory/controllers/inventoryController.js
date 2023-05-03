const Inventory = require("../models/inventory");
const sendEmail = require("../services/sendEmail");

// while creating stock deleting or update
// implement removing from inventory when status changes in stocks
// populate Inventory mongodb
// record testing

// create inventory in parts.js

exports.createInventory = async (req, res) => {

    try {
      const { partTypeID, threshold, quantity} = req.body;
      if (!partTypeID) {
        return res.status(400).json({message: "partTypeID missing"});
      }
      const inventory = new Inventory({ partTypeID, threshold, quantity });
      await inventory.save();
      
      return res.status(200).json({message: `succesfully added new inventory`});
    } catch (err) {
      return res.status(500).json({ error: err });
    }
}

exports.getAllInventory = async (req, res) => {
    try {
        const inventorys = await Inventory.find();
        return res.status(200).json(inventorys);
    } catch (error) {
        return res.status(500).json({ error: err });
    }
}

exports.getInventory = async (req, res) => {
    try {
        const {partid} = req.params
        const inventory = await Inventory.findOne({partid})
        return res.status(200).json(inventory.quantity);
    } catch (error) {
        return res.status(500).json({ error: err });
    }
}

exports.editInventory = async (req, res) => {
    try {
        const { threshold, quantity } = req.body
        const { id } = req.params
        const inventory = await Inventory.findOne(id)
        if (!inventory) res.status(404).json({message: "inventory not found"});
        if (threshold) inventory.threshold = threshold
        if (quantity) inventory.quantity = quantity
        inventory.save()

        if (inventory.quantity < inventory.threshold) {
            const message = `
            <h2>Part Type ${id} has fallen below the threshold of ${inventory.threshold} </h2>
            <p> Please place an order for it </p>
            `
            const subject = `Reached Threshold for ${id}`
        }
        const send_to = process.env.EMAIL_USER
        const sent_from = process.env.EMAIL_USER
        try {
            await sendEmail(subject, message, send_to, sent_from)
            res.status(200).json({
                success: true, 
                message: "Threshold Email Sent"
            })
        } catch (error) {
            res.status(500)
            throw new Error("Threshold Email not sent")
        }

    }
    catch (error) {
        return res.status(500).json({error: error.message});
    }
}

exports.delInventory = async (req, res, next) => {
    if (req.user.role === "USER") res.status(401).json({message : "unauthorized to delete"});
  
    try {
      const { id } = req.params;
      await Part.findOneAndDelete({partTypeID: id});
      return res.status(200).json({message: "succesfully removed part"});
    } catch (err) {
      return res.status(500).json({error: err.message});
    }
  };

  exports.incInventory = async (req, res, next) => {

    try {
        const id = req.params.id
        const inventory = await Inventory.findOne(id)
        if (!inventory) res.status(404).json({message: "inventory not found"});
        inventory.quantity = quantity + 1
        inventory.save()
    }
    catch (error) {
        return res.status(500).json({error: error.message});
    }
    
  };

  exports.decInventory = async (req, res, next) => {

    try {
        const id = req.params.id
        const inventory = await Inventory.findOne(id)
        if (!inventory) res.status(404).json({message: "inventory not found"});
        inventory.quantity = quantity - 1
        inventory.save()

        if (inventory.quantity < inventory.threshold) {
            const message = `
            <h2>Part Type ${id} has fallen below the threshold of ${inventory.threshold} </h2>
            <p> Please place an order for it </p>
            `
            const subject = `Reached Threshold for ${id}`
        }
        const send_to = process.env.EMAIL_USER
        const sent_from = process.env.EMAIL_USER
        try {
            await sendEmail(subject, message, send_to, sent_from)
            res.status(200).json({
                success: true, 
                message: "Threshold Email Sent"
            })
        } catch (error) {
            res.status(500)
            throw new Error("Threshold Email not sent")
        }

    }
    catch (error) {
        return res.status(500).json({error: error.message});
    }
  };