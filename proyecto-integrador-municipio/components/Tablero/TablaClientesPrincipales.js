import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ClientListService } from '../../demo/service/ClientListService';

export const TablaClientesPrincipales = () => {

    const [loading, setLoading] = useState(true);
    const [ClientListServices, setClientListService] = useState(null);

    useEffect(() => {
        ClientListService.getClientList().then((data) => {
            setClientListService(getCustomers(data))
            setLoading(false);
        });
    }, []);


    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            return d;
        });
    };

    //console.log("Array de getCustomers en TCP: ", (getCustomers(ClientListServices) || []));

    const clientesBytes = {};

    const arrClientList = (getCustomers(ClientListServices) || []);

    // Iterar sobre los objetos de cliente y calcular los bytes totales para cada cliente
    for (const cliente of arrClientList) {
        const clientId = cliente.clientId ?? 0;
        let name = cliente.name;
        if (name == null || name == "") {
            name = "---";
        }
        const totalBytes = cliente.totalBytes ?? 0;
        const uploadBytes = cliente.txBytes ?? 0;

        // Verificar si el cliente ya existe en el objeto clientesBytes
        if (clientesBytes.hasOwnProperty(clientId)) {
            // Sumar la cantidad de bytes si el cliente ya existe
            clientesBytes[clientId].totalBytes += totalBytes;
            clientesBytes[clientId].uploadBytes += uploadBytes;
        } else {
            // Agregar el cliente al objeto clientesBytes
            clientesBytes[clientId] = {
                name: name,
                totalBytes: totalBytes,
                uploadBytes: uploadBytes
            };
        }
    }

    // Obtener los primeros 5 clientes con base en la cantidad total de bytes consumidos
    const clientesTop5 = Object.keys(clientesBytes)
        .map(clientId => ({
            clientId: clientId,
            name: clientesBytes[clientId].name,
            totalBytes: clientesBytes[clientId].totalBytes,
            txBytes: clientesBytes[clientId].uploadBytes
        }))
        .sort((a, b) => b.totalBytes - a.totalBytes) // Ordenar por cantidad total de bytes en orden descendente
        .slice(0, 5); // Obtener los primeros 5 clientes

    //console.log("Top 5 Clientes: ", clientesTop5);

    const convertBytesToGB = (bytes) => {
        const gigabytes = bytes / (1024 * 1024 * 1024);
        return gigabytes.toFixed(2) + ' GB';
    };

    const convertBytesToMB = (bytes) => {
        const megabytes = bytes / (1024 * 1024);
        return megabytes.toFixed(2) + ' MB';
    };

    //functión to convert bytes to GB or MB
    const convertBytes = (bytes) => {
        if (bytes >= 1024 * 1024 * 1024) {
            return convertBytesToGB(bytes);
        } else {
            return convertBytesToMB(bytes);
        }
    };

    // función que extrae del array clientesTop5 los parametros 'clientId', 'name', 'totalBytes' y 'txBytes' y los ultimos dos los convierte a GB y MB respectivamente
    const getFormattedBytes = Object.keys(clientesTop5)
        .map(clientId => ({
            clientId: clientesTop5[clientId].clientId,
            name: clientesTop5[clientId].name,
            totalBytes: convertBytes(clientesTop5[clientId].totalBytes),
            txBytes: convertBytes(clientesTop5[clientId].txBytes)
        }));

    console.log("Array de getFormattedBytes en TCP: ", getFormattedBytes);
    // <DataTable value={getFormattedBytes} scrollable scrollHeight="400px" loading={loading} className="mt-3">
    return (
        <>
            <DataTable value={getFormattedBytes} scrollable scrollHeight="400px" loading={loading} className="mt-3">
                <Column field="clientId" header="MAC" style={{ flexGrow: 1, flexBasis: '100px' }} frozen alignFrozen="left"></Column>
                <Column field="name" header="Nombre" style={{ flexGrow: 1, flexBasis: '200px' }} frozen alignFrozen="left" ></Column>
                <Column field="totalBytes" header="Total" style={{ flexGrow: 1, flexBasis: '200px' }} frozen alignFrozen="left" ></Column>
                <Column field="txBytes" header="Upload" style={{ flexGrow: 1, flexBasis: '200px' }} frozen alignFrozen="left" ></Column>
            </DataTable>

        </>
    )
}