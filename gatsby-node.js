// gatsby-node.js
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  
  // Skip 404 pages
  if (page.path !== '/404/') {
    deletePage(page);
    
    // Create Arabic version at the root path
    createPage({
      ...page,
      path: page.path,
      context: {
        ...page.context,
        locale: 'ar',
      },
    });

    // Create English version with /en prefix
    createPage({
      ...page,
      path: `/en${page.path}`,
      context: {
        ...page.context,
        locale: 'en',
      },
    });
  }
};