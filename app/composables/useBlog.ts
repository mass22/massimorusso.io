export const useBlog = () => {
  // Récupérer tous les articles
  const getPosts = async (limit?: number) => {
    const query = queryContent('blog').sort({ date: -1 })

    if (limit) {
      query.limit(limit)
    }

    return await query.find()
  }

  // Récupérer un article par slug
  const getPost = async (slug: string) => {
    return await queryContent('blog', slug).findOne()
  }

  // Récupérer les articles par catégorie
  const getPostsByCategory = async (category: string) => {
    return await queryContent('blog')
      .where({ 'category.name': category })
      .sort({ date: -1 })
      .find()
  }

  // Récupérer les catégories
  const getCategories = async () => {
    const posts = await queryContent('blog').find()
    const categories = new Set()

    posts.forEach(post => {
      if (post.category?.name) {
        categories.add(post.category.name)
      }
    })

    return Array.from(categories)
  }

  // Rechercher des articles
  const searchPosts = async (query: string) => {
    return await queryContent('blog')
      .where({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      })
      .sort({ date: -1 })
      .find()
  }

  return {
    getPosts,
    getPost,
    getPostsByCategory,
    getCategories,
    searchPosts
  }
}
