// En tu archivo de rutas, por ejemplo routes/forum.js
const express = require("express");

const router = express.Router();
const passport = require("passport");

const prisma = require("../prisma");


router.get('/new-post', (req, res) => {
  console.log('Accediendo a /new-post');
  res.render('createPost');
});

// Para acceder al formulario para crear un nuevo post, debes ir a la URL  http://localhost:3000/post/new-post

router.post('/create-post', async (req, res) => {
  const { content } = req.body; // El contenido del post
  const userId = req.user?.id; // El ID del usuario autenticado

  try {
    console.log('Creating post with content:', content, 'and userId:', userId);
    // Utiliza Prisma para crear un nuevo registro en la tabla 'Post'
    const post = await prisma.post.create({
      data: {
        content: content, // Este es el contenido del post
        userId: userId,   // Este es el ID del usuario (asegúrate de que esté correctamente autenticado y el ID exista en la tabla 'User')
      }
    });
    console.log('Post created successfully:', post);
    res.status(201).send('Post creado exitosamente');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Hubo un error al crear la publicación.');
  }
});
//http://localhost:3000/post/posts

router.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true, // Esto incluirá los detalles del usuario asociado con cada post si es necesario
      },
      orderBy: {
        createdAt: 'desc', // Esto ordenará las publicaciones por fecha de creación, de la más reciente a la más antigua
      }
    });
    // Renderiza la vista 'posts.hbs' pasando el objeto { posts } que contiene todas las publicaciones
    console.log(JSON.stringify(posts, null, 2));
    res.render('posts', { posts }); // Asegúrate de que existe un archivo views/posts.hbs
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).send('Hubo un error al obtener las publicaciones.');
  }
});


// Ruta para eliminar una publicación
router.post('/delete/:postId', (req, res) => {
  const postId = req.params.postId;
  Post.findByIdAndRemove(postId, (err) => {
      if (err) {
          // Manejo del error
          req.flash('error_msg', 'No se pudo eliminar la publicación.');
          res.redirect('/post/posts');
      } else {
          // Si la eliminación fue exitosa
          req.flash('success_msg', 'Publicación eliminada con éxito.');
          res.redirect('/post/posts');
      }
  });
});

  

  module.exports = router;
  