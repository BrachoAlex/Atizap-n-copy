import React from 'react'
import NavBarDispositivos from '../components/Dispositivos/navBarDispositivos'
import { Link } from '@mui/material'

export const DispositivosLayout = ({ children }) => {
    return (
        <div className="card">

            <Link href="/dispositivos" sx={{ cursor: 'pointer', textDecoration: 'none', }}>
                <h5>Dispositivos</h5>
            </Link>
            <nav style={{ paddingBottom: "15px" }}>
                <NavBarDispositivos />
            </nav>
            <main>
                {children}
            </main>
        </div>
        
    )
}