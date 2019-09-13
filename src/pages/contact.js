import React from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import { PageBody } from "../components/styles"
import Social from "../components/Social"

const ContactPage = ({ data, location }) => (
  <Global path={location.pathname}>
    <PageTitle img={data.img.sharp}>
      <h1>Contact</h1>
    </PageTitle>
    <PageBody>
      <p>You can find me at: </p>
      <Social size="2em" />
    </PageBody>
  </Global>
)

export default ContactPage

export const query = graphql`
  {
    img: file(name: { eq: "ag-mountain" }) {
      sharp: childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
