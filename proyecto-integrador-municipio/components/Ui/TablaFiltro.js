import React from 'react'
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';

import Link from 'next/link';



export const Tablafiltro = ({ value: value, paginator: paginator = true, showGridlines: showGridlines = true, rows: rows = 7, dataKey: dataKey, filters: filters, filterDisplay: filterDisplay = "menu", loading: loading, responsiveLayout: responsiveLayout = "scroll", header: header, Columns: columns = [], tipo: tipo = 'usuarios'
}) => {

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


    const totalTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* Cambiar por /usuarios/informacion/id */}
                <span>{convertBytes(rowData.totalBytes)}</span>
            </React.Fragment>
        );
    };

    const convertSecondsToMinutes = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return minutes + ' min';
    };

    const convertSecondsToHours = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const remainingSecondsFinal = remainingSeconds % 60;
        return hours + '.' + minutes + ' hr ';
    };

    const convertSecondsToDays = (seconds) => {
        const days = Math.floor(seconds / 86400);
        const remainingSeconds = seconds % 86400;
        const hours = Math.floor(remainingSeconds / 3600);
        const remainingSecondsFinal = remainingSeconds % 3600;
        const minutes = Math.floor(remainingSecondsFinal / 60);
        const remainingSecondsFinalFinal = remainingSecondsFinal % 60;
        return days + ' días ' + hours + '.' + minutes + ' hr ';
    };


    const convertTime = (seconds) => {
        if (seconds >= 86400) {
            return convertSecondsToDays(seconds);
        } else if (seconds >= 3600) {
            return convertSecondsToHours(seconds);
        } else {
            return convertSecondsToMinutes(seconds);
        }
    };

    const upTimeTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* Cambiar por /usuarios/informacion/id */}
                <span>{convertTime(rowData.upTime)}</span>
            </React.Fragment>
        );
    };

    const usageTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* Cambiar por /usuarios/informacion/id */}
                <span>{rowData.usage}</span>
            </React.Fragment>
        );
    };

    const statusTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* Cambiar por /usuarios/informacion/id */}
                <span>{rowData.status == 1 ? "En línea" : "Sin Conexión"}</span>
            </React.Fragment>
        );
    };


    const macTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* Cambiar por /usuarios/informacion/id */}
                <Link key={rowData.mac} href={`/dispositivos/${rowData.mac}/informacion`} legacyBehavior ><a>{rowData.mac}</a></Link>
            </React.Fragment>
        );
    };

    const hostnameTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* Cambiar por /dipositivos/informacion/id */}
                <Link key={rowData.mac} href={`/usuarios/informacion`} legacyBehavior ><a>{rowData.mac}</a></Link>
            </React.Fragment>
        );
    };


    //Elementos para dar formato a las fechas:
    const matchModes = [
        { label: 'Todos excepto', value: FilterMatchMode.DATE_IS_NOT },
        { label: 'Antes de', value: FilterMatchMode.DATE_BEFORE },
        { label: 'Después de', value: FilterMatchMode.DATE_AFTER },
    ];

    //Elementos para cargar fechas
    const formatDate = (value) => {
        date = new Date(value);
        return value.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat='mm/dd/yy' placeholder="dd/mm/aaaa" mask="99/99/9999" />
    }


    //Función que va a comparar qué template usar:
    const comparadorTemplate = (field, body, tipo) => {
        if (field === 'mac' && tipo == 'dispositivos') {
            return macTemplate;
        } else if (field === 'mac' && tipo != 'dispositivos') {
            return hostnameTemplate;
        } else if (field === 'status') {
            return statusTemplate;
        } else if (field === 'totalBytes') {
            return totalTemplate;
        } else if (field === 'upTime') {
            return upTimeTemplate;
        } else if (field === 'usage') {
            return usageTemplate;
        } else if (body === 'date') {
            return dateBodyTemplate;
        } else {
            return null;
        }
    };


    return (


        <DataTable
            key={tipo == 'dispositivos' ? 'dispositivos' : 'usuarios'}
            value={value}
            paginator={paginator}
            className="p-datatable-gridlines"
            showGridlines={showGridlines}
            rows={7}
            dataKey={dataKey}
            filters={filters}
            filterDisplay={filterDisplay}
            loading={loading}
            responsiveLayout={responsiveLayout}
            emptyMessage="No se encontro información"
            header={header}

        >
            {columns.map((column) => (

                <Column key={column.field} style={{ minWidth: `${column.minWidth}` }}
                    field={column.field} header={column.header}
                    body={comparadorTemplate(column.field, column.body, tipo)}
                    filterField={column.filterField}
                    dataType={column.dataType}
                    filter={column.filter}
                    filterElement={column.filterElement === 'dateFilterTemplate' ? dateFilterTemplate : null}
                    filterMatchModeOptions={column.filterMatchModeOptions === 'matchModes' ? matchModes : null}
                />
            ))

            }

        </DataTable>


    )
}
