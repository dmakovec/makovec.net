const Promise = require('bluebird')
const path = require('path')
const _ = require("lodash")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  const blogPostTemplate = path.resolve('./src/templates/blog-post.tsx')
  const tagTemplate = path.resolve('./src/templates/tag.tsx')

  // Legacy page redirects
  createRedirect({ fromPath: '/category/useful-stuff', toPath: '/useful-stuff', isPermanent: true });


  const result = await graphql(`
        {
          posts: allContentfulBlogPost {
            edges {
              node {
                title
                slug
              }
            }
          }
          tags: allContentfulBlogPost(sort: {fields: tags, order: ASC}) {
            group(field: tags) {
              fieldValue
            }
          }
        }
        `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    console.error(result.errors)
    return
  }

  // Individual posts page
  const posts = result.data.posts.edges
  posts.forEach((post) => {
    createPage({
      path: `/useful-stuff/${post.node.slug}`,
      component: blogPostTemplate,
      context: {
        slug: post.node.slug
      },
    })
  })

  // Tags
  const tags = result.data.tags.group
  tags.forEach((tag) => {
    createPage({
      path: `/tag/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue
      },
    })
  })

}
