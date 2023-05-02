import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import {FaBars,FaTimes} from "react-icons/fa"

export const Navbar = () => {

  const navRef= useRef();

  const showNavbar=()=>{
    navRef.current.classList.toggle("responsive_nav");
  }
  return (
    <div>
        {/* <NavContainer > */}
            <div className='nav-center'>
                <div className='nav-header'>
                  <header>
                  <Link >
                    <img src="notify.png"></img>
                  </Link>
                  <nav ref={navRef}>
                    <a href="/home">Home</a>
                    <a href="/about">About us</a>
                    <a href="/products">Products</a>
                    <button className='nav-btn nav-close-btn ' onClick={showNavbar}>
                      <FaTimes/>

                    </button>
                  </nav>
                  <button className='nav-btn ' onClick={showNavbar}>
                    <FaBars/>

                    </button>

                  </header>
                </div>

            </div>

        {/* </NavContainer> */}
    </div>
  )
}
