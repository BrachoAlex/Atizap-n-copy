import getConfig from 'next/config';
import { Chart } from 'primereact/chart';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { Estadisticas } from '../../components/Tablero/Estadisticas'
import { TablaClientesPrincipales } from '../../components/Tablero/TablaClientesPrincipales';
import { UsuariosLayout } from '../../layout/usuariosLayout'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Informacion = () => {
    const clientHistory = [
        { dispositivo: 'Villas de la Hacienda', mac: '00:00:00:00:00:01', tiempoDeConexion: '09:40PM' },
        { dispositivo: 'Villas de la Hacienda', mac: '00:00:00:00:00:02', tiempoDeConexion: '09:50PM' },
        { dispositivo: 'Villas de la Hacienda', mac: '00:00:00:00:00:07', tiempoDeConexion: '10:40AM' },
        { dispositivo: 'Villas de la Hacienda', mac: '00:00:00:00:00:04', tiempoDeConexion: '10:50AM' },
    ]
    return (
        <UsuariosLayout>
            <div className="card">
                <h3><strong>Básico</strong></h3>
                <table>
                    <tr>
                        <td><strong>Nombre de host:</strong></td>
                        <td>--------</td>
                    </tr>
                    <tr>
                        <td><strong>Detalles del cliente:</strong></td>
                        <td>En línea</td>
                    </tr>
                    <tr>
                        <td><strong>Dirección IP:</strong></td>
                        <td>10.10.10.5</td>
                    </tr>
                    <tr>
                        <td><strong>Velocidad actual:</strong></td>
                        <td>-------</td>
                    </tr>    
                </table>            
                <details>
                    <summary>Mostrar más información</summary>
                    <table>
                    <tr>
                        <td><strong>Nombre de host:</strong></td>
                        <td>--------</td>
                    </tr>
                    <tr>
                        <td><strong>Conexión</strong></td>
                        <td>En línea</td>
                    </tr>
                    <tr>
                        <td><strong>SSID:</strong></td>
                        <td>Atizapán conectado</td>
                    </tr>
                    <tr>
                        <td><strong>Dirección IPv6:</strong></td>
                        <td>-------</td>
                    </tr>
                    <tr>
                        <td><strong>Radio:</strong></td>
                        <td>5G</td>
                    </tr>
                    <tr>
                        <td><strong>Uso:</strong></td>
                        <td>14.16KB 7.27KB 6.9KB</td>
                    </tr>
                    <tr>
                        <td><strong>RSSI:</strong></td>
                        <td>-82</td>
                    </tr>
                    <tr>
                        <td><strong>Modo de estación:</strong></td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td><strong>Invitado:</strong></td>
                        <td>Sí</td>
                    </tr>
                    <tr>
                        <td><strong>Tiempo de conexión:</strong></td>
                        <td>-----</td>
                    </tr>
                    <tr>
                        <td><strong>OS:</strong></td>
                        <td>Windows 10</td>
                    </tr>
                    <tr>
                        <td><strong>Fabricante:</strong></td>
                        <td>----</td>
                    </tr>
                    <tr>
                        <td><strong>Canal:</strong></td>
                        <td>36</td>
                    </tr>
                    <tr>
                        <td><strong>Lista de acceso:</strong></td>
                        <td>Ninguna</td>
                    </tr>
                    <tr>
                        <td><strong>Vistos primero:</strong></td>
                        <td>2023-04-21 04:24PM</td>
                    </tr>
                    <tr>
                        <td><strong>Último visto:</strong></td>
                        <td>2023-04-21 04:24PM</td>
                    </tr>    
                    </table>
                </details>
            </div>
            <div className="card">
            <h3><strong>History</strong></h3>
            <DataTable
                value={clientHistory}
                className="p-datatable-striped"
                showGridlines
                rows={7}
                filterDisplay='menu'
                //loading={loading1}
                responsiveLayout='scroll'
                emptyMessage='No hay registros'
                //header={header1}
            >
                <Column field="dispositivo" header="Dispositivo"/>
                <Column field="mac" header="MAC"/>
                <Column field="tiempoDeConexion" header="Tiempo de conexión" sortable filter filterPlaceholder="Buscar por tiempo de conexión" />
            </DataTable>
            </div>
        </UsuariosLayout>
    );
};




export default Informacion
