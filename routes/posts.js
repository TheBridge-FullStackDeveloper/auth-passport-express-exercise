const express = require("express");
const router = express.Router();
const prisma = require("../prisma");
const fetchAndSortPosts = require("../controllers/fetchAndSortPosts")
router.get("/", async (req, res) => {
  try {
    const allPosts = await fetchAndSortPosts(prisma);

    res.render("allPosts", { title: "All the Posts", posts: allPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.json("Server Error");
  }
});

router.get("/create", async (req, res) => {
  res.render("newPost", { title: "Create new post" });
});
router.post('/create', async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });

    res.redirect(`/posts/${newPost.id}`);
  } catch (error) {
    console.error(error);
    res.json('Server Error');
  }
});

router.get("/edit/:id", async (req, res) => {
  const editID = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.render("editPost", { title: editID.title, posts: editID });
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const editPost = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        title,
        content,
      },
    });
    res.redirect(`/posts/${editPost.id}`);
  } catch (error) {
    res.json("Server Error");
  }
});

router.get("/delete/:id", async (req, res) => {
  const deleteID = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.render("deletePost", { title: deleteID.title, posts: deleteID });
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/");
  } catch (error) {
    res.json("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const postID = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        author: true
      }
    });
    res.render("post", { title: postID.title, posts: postID, user: req.user });
  } catch (error) {
    res.json("Server Error");
  }
});

module.exports = router;
