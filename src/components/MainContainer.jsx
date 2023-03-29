import React, { Children } from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

const MainContainer = ({ children }) => {
    return (
        <>
            <NavBar />
            <div>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default MainContainer