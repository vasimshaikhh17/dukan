import React from 'react'
import Layout from '../../layout/Layout'
import { useParams } from 'react-router-dom';
const DynamicPage = () => {
  const { category, subcategory } = useParams();
  return (
    <Layout>

      <div className='pt-20'> DynamicPage</div>

      <div>
      <h1>{category}</h1>
      {subcategory && <h2>{subcategory}</h2>}
      {/* Fetch and display data based on category and subcategory */}
    </div>

    </Layout>
  )
}

export default DynamicPage