const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  //await prisma.Post.deleteMany({}); // <- Borra nada mas ejecutarse
  const numberOfPosts = 10;

  const posts = [];

  for (i = 0; i < numberOfPosts; i++) {
    const post = {
        title: faker.hacker.noun(),
        content: faker.hacker.phrase(),
        published: faker.datatype.boolean(),
        authorId: "844bf92e-a0c6-4e8d-96c1-ade38f976d29"
    };
    posts.push(post);
  }

  const addPosts = async () =>
    await prisma.Post.createMany({
      data: posts,
      skipDuplicates: true,
    });

  addPosts();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });