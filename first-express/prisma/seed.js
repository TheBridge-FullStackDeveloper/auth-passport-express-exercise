const prisma = require(".");

async function main() {
  const newFood = await prisma.food.create({
    data: {
      name: "tortilla de patata con cebolla",
      price: 100
    },
  });
  console.log(`Created user with ID: ${newFood.id}`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });