const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Balance = require("../models/Balance");
// --------------Method get---------------------
router.get("/", (req, res) => {
  return Balance.findAll()
    .then((b) => {
      res.json(b);
    })
    .catch((err) => {
      res.status(404, err);
    });
});
// --------------Method post---------------------
router.post("/", (req, res) => {
  const { concept, amount, type } = req.body;
  return Balance.create({ concept: concept, amount: amount, type: type })
    .then((b) => {
      res.status(201).json(b);
    })
    .catch((err) => {
      res.status(404, err);
      console.log(err);
    });
});
// --------------Method put---------------------
router.put("/:id", (req, res) => {
  const { concept, amount } = req.body;
  Balance.update(
    {
      concept: concept,
      amount: amount,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )

    .then(() => {
      res.status(200).json("done");
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "we can't update the balance", error: err });
    });
});

// --------------Method delete---------------------
router.delete("/:id", (req, res) => {
  Balance.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.json("Done");
    })
    .catch((err) => {
      res.status(400, err);
    });
});

module.exports = router;
