import React from 'react'
import { Link } from 'react-router-dom'

const NavbarOrder = () => {
  return (
  <>
   <nav className="top-0 z-100 fixed w-full bg-white border-b-2 py-5 px-10">
        <Link to={"/"} className=" font-bold">Dukan</Link>
    </nav>
  </>
  )
}

export default NavbarOrder