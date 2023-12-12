

import { Box, Typography } from '@mui/material'
import Image from "next/image";
import React from 'react'
import { ColumnaEstadistica } from './Columnaestadistica';

export const Estadisticas = () => {

    return (
        <>
            <h5>Estadísticas de clientes</h5>
            <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-around" }}>
                <ColumnaEstadistica imagen={`/layout/images/devices.png`} valor={80} titulo={"Nuevos clientes"} />
                <ColumnaEstadistica imagen={`/layout/images/laptop.png`} valor={2892} titulo={"Clientes devueltos"} />
                <ColumnaEstadistica imagen={`/layout/images/clock.png`} valor={14} titulo={"Tiempo promedio"} />
            </Box>
        </>
    )
}
