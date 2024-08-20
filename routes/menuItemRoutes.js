const express = require("express");
const MenuItem = require("./../models/MenuItem");
const router = express.Router();

// post to add MenuItem
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    //create new MenuItem
    const newMenu = new MenuItem(data);

    //saving data
    const response = await newMenu.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get to read MenuItem data
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get to read MenuItem data by taste
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "spicy" || taste == "sour") {
      const data = await MenuItem.find({ taste: taste });
      console.log("Data fetched by taste");
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Invalid work Type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// put to update MenuItem data by Id
router.put("/:id", async (req, res) => {
  try {
    const MenuItemId = req.params.id;
    const updatedMenuItemData = req.body;

    const response = await MenuItem.findByIdAndUpdate(
      MenuItemId,
      updatedMenuItemData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      res.status(404).json({ error: "MenuItem not found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete to delete MenuItem data by Id
router.delete("/:id", async (req, res) => {
  try {
    const MenuItemId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(MenuItemId);
    if (!response) {
      res.status(404).json({ error: "MenuItem not found" });
    }
    console.log("Data Deleted");
    res.status(200).json({ message: "data deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
