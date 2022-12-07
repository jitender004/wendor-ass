const router = require("express").Router();
const USERMODEL = require("../model/User");

router.get("", async (req, res) => {
  try {
    const user = await USERMODEL.find();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.post("", async (req, res) => {
  try {
    const user = await USERMODEL.create(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await USERMODEL.findById(req.params.id).lean().exec();
    return res.status(200).send(user);
  } catch (error) {}
});
router.patch("/:id", async (req, res) => {
  try {
    const user = await USERMODEL.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const user = await USERMODEL.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

module.exports = router;
