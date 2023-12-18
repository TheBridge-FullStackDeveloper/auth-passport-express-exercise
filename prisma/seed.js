const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany({});

  const numberOfPosts = 20;
  const posts = [];

  for (let i = 0; i < numberOfPosts; i++) {
    // I put the usersID manually in the users to try if it works
    const usersID = [
      "3d110403-3301-4dd9-a15d-e3c584ba4952",
      "d65496eb-c42c-485e-95e7-2f91db0fed3d",
    ];
    const randomID = Math.floor(Math.random() * usersID.length);
    const createdAtTime = faker.date.past();
    const updatedAtTime = new Date(
      createdAtTime.getTime() +
        Math.random() * (new Date().getTime() - createdAtTime.getTime())
    );
    const post = {
      createdAt: createdAtTime,
      updatedAt: updatedAtTime,
      title: faker.hacker.phrase(),
      content: faker.lorem.paragraphs({ min: 2, max: 5 }),
      authorId: usersID[randomID],
    };
    posts.push(post);
  }

  const addPosts = async () => {
    await prisma.post.createMany({
      data: posts,
      skipDuplicates: true,
    });
  };

  await addPosts();
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
