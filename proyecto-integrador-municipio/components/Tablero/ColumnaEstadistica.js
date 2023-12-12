import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export const ColumnaEstadistica = ({ imagen, valor, titulo }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Image src={imagen} alt="logo" width={100} height={100} />
            <Typography sx={{
                textAlign: "center", fontSize: "2rem", fontWeight: "bold", color: "#2f4860"
            }}>
                {titulo !== "Tiempo promedio" ? `${valor}` : `${valor}m`}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "center", }}>
                {titulo}
            </Typography>
        </Box>
    )
}
