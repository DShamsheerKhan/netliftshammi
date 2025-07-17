import * as React from "react"
import { Link } from "gatsby";
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../components/style/404.css"

const NotFoundPage = () => (
  <Layout>
    <section className="NotFoundPage-section">
    <div className="NotFoundPage-container">
      <img src="/Frame 427319299.svg"/>
    <h1>تعذر الوصول الى الصفحة!</h1>
    <Link to="../../../"><button>الرجوع الى الرئيسية</button></Link>
    </div>
    </section>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
