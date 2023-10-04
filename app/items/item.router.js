const express = require("express");
const Item = require("./item.model");
const itemDTO = require("./item.dto");
const User = require("#app/users/user.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await Item.findAll({ include: User });

  res.json( { items });
});

router.post("/", async(req, res) => {
  try {
    const item = await Item.create(itemParams(req));
    res.json({ item });
  } catch({ errors }) {
    res.status(422).json({ errors })
  };
});

router.get("/:id", async(req, res) => {
  const item = await findItem(req.params.id, { include: [User]});

  res.json({ item: itemDTO(item) });
});

router.put("/:id", async(req, res) => {
  const item = await findItem(req.params.id);

  try {
    item.update(itemParams(req));
    res.json({ item });
  } catch({ errors }) {
    res.status(422).json({ errors });
  }
})

const itemParams = (req) => {
  return {
    title: req.body.title,
    url: req.body.url,
    body: req.body.body,
    addedById: req.currentUser.id,
    visibility: req.body.visibility || "hidden"
  }
}
const findItem = async (id) => await Item.findByPk(id, { include: User });

module.exports = router;
