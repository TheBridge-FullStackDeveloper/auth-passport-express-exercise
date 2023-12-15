const express = require("express");
const router = express.Router();

const prisma = require("../prisma");

router.get("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await prisma.orderFood.findMany({
      where: {
        orderId,
      },
      include: {
        foods: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    res.json(order);
  } catch (error) {
    console.log(error);
    res.json("Server error");
  }
});

router.post("/", async (req, res) => {
  const { quantity, foodId } = req.body;
  try {
    const orderCreated = await prisma.order.create({
      data: {
        quantity,
        foods: {
          connect: {
            id: foodId,
          },
        },
      },
    });

    res.json(orderCreated);
  } catch (error) {
    console.log(error);
    res.json("server error");
  }
});

module.exports = router;
