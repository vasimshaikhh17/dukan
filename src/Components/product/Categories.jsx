import React from 'react'
import { useParams } from 'react-router-dom'

const Categories = () => {
    const params = useParams()
    console.log(params.id)
  return (
    <div>Categories</div>
  )
}

export default Categories