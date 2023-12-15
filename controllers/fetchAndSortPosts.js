  const fetchAndSortPosts = async (prisma, userId = null) => {
    try {
      const allPosts = {
        include: {
          author: true,
        },
      };
  
      if (userId) {
        allPosts.where = {
          authorId: userId,
        };
      }
  
      const posts = await prisma.post.findMany(allPosts);
  
      posts.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
  
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Server Error");
    }
  };
  
  module.exports = fetchAndSortPosts;
  