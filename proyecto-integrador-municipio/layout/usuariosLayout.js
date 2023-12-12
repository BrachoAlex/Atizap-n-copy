import React from 'react'
import NavBarUsuarios from '../components/Usuarios/navBar'
import { Link } from '@mui/material'

export const UsuariosLayout = ({ children }) => {
    return (
        <div className="card">

            <Link href="/usuarios" sx={{ cursor: 'pointer', textDecoration: 'none', }}>
                <h5>Usuarios</h5>
            </Link>
            <nav style={{ paddingBottom: "15px" }}>
                <NavBarUsuarios />
            </nav>
            <main>
                {children}
            </main>
        </div>
        
    )
}
