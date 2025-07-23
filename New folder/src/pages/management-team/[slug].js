import React from 'react'
import ManagementTeamCategory from '../ManagementTeamCategory';
const Slug = ({ params }) => {
    const { slug } = params; 

  return (
  <ManagementTeamCategory Slug={slug}/>
  )
}

export default Slug
