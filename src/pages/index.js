import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled, { css } from "styled-components"

import { ArrowLeft } from "styled-icons/fa-solid/ArrowLeft"
import { ArrowRight } from "styled-icons/fa-solid/ArrowRight"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import Scroll from "../components/Scroll"
import { PageBody } from "../components/styles"
import PostList from "../views/PostList"
// import Projects from "../views/Projects"
import mediaQuery from "../utils/mediaQuery"

export default function IndexPage({ data, location }) {
  const { md, alessio, posts} = data
  const img = {
    ...md.frontmatter.cover,
    fluid: md.frontmatter.cover.img.sharp.fluid,
  }
  return (
    <Global margin="0" transparent path={location.pathname}>
      <PageTitle img={img} fillToBottom backdrop={false}>
        <Scroll direction="down" to={1} />
      </PageTitle>
      <PageBody>
        <Img
          fixed={alessio.img.fixed}
          css="border-radius: 50%; justify-self: center;"
        />
        <p dangerouslySetInnerHTML={{ __html: md.html }} />
        <H>Recent posts</H>
        <PostList asRow noText posts={posts.edges} />
    
      </PageBody>
    </Global>
  )
}

const Title = styled.h1`
  border: 1px solid white;
  padding: 0.4em;
  background: rgba(0, 0, 0, 0.4);
  display: grid;
  span {
    padding: 0.4em;
    ${mediaQuery.maxPhone} {
      & + span {
        border-top: 0.5px solid rgba(255, 255, 255, 0.9);
      }
    }
  }
  ${mediaQuery.minPhone} {
    grid-template-columns: 1fr 1fr;
    span {
      :nth-child(2),
      :nth-child(3) {
        background: rgba(0, 0, 0, 0.6);
      }
    }
  }
`

const iconCss = css`
  width: 0.6em;
  vertical-align: 0;
  margin: 0 0.4em;
`

const H = ({ children, as }) => (
  <h1 as={as} css="text-align: center;">
    <ArrowLeft css={iconCss} />
    {children}
    <ArrowRight css={iconCss} />
  </h1>
)

export const query = graphql`
  {
    md: markdownRemark(frontmatter: { purpose: { eq: "landing intro" } }) {
      frontmatter {
        title
        ...cover
      }
      html
    }
    alessio: file(name: { eq: "alessio" }) {
      img: childImageSharp {
        fixed(width: 175) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 5
    ) {
      edges {
        node {
          ...post
        }
      }
    }
  }
`
