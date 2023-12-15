const express = require("express");
const router = express.Router();
const fs = require("fs");

const prisma = require("../prisma");

router.get("/more-expensive", async (req, res) => {
  try {
    const foods = await prisma.food.findMany({
      where: {
        price: {
          gte: parseInt(req.query.number),
        },
      },
    });

    res.json(foods);
  } catch (error) {
    console.log(error);
    res.json("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const food = await prisma.food.findMany();

    res.json(food);
  } catch (e) {
    console.log(e);
    res.json("Server error");
  }
});

router.get('/veggie', async (req, res) => {
  try {
    const veggieFood = await prisma.food.findMany({
      where: {
        isVeggie: true
      },
    });

    res.json(veggieFood)
  } catch (error) {
    console.log(error);
    res.json("Server error");
  }
})

router.get("/:name", async (req, res) => {
  try {
    const food = await prisma.food.findFirst({
      where: {
        name: req.params.name,
      },
    });

    res.json(food);
  } catch (e) {
    console.log(e);
    res.json("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const food = await prisma.food.create({
      data: {
        name: req.body.name,
        price: req.body.price,
      },
    });

    res.json(food);
  } catch (error) {
    console.log(error);
    res.json("Server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const food = await prisma.food.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        price: req.body.price,
      },
    });
    res.json(food);
  } catch (error) {
    console.log(error);
    res.json("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
   const food = await prisma.food.delete({
     where: {
       id: req.params.id,
     },
   });
    res.json(food); 
  } catch (error) {
    console.log(error);
    res.json("Server error");
  }
});

module.exports = router;
