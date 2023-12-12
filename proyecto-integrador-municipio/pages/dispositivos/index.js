import React, { useState, useEffect, useRef, useContext } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import schedule from 'node-schedule';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { CustomerService } from '../../demo/service/CustomerServiceFunction';
import { InputText } from 'primereact/inputtext';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Tablafiltro } from '../../components/Ui/TablaFiltro';
import { ApService } from '../../demo/service/ApService';


const TableDemo = ({ dataAp }) => {

    const formatearFecha = (d) => {
        const fechaTemporal = d.split("-");
        const fecha = fechaTemporal[1] + "/" + fechaTemporal[0] + "/" + fechaTemporal[2];
        return fecha;
    }

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            const fecha = formatearFecha(d.fecha.toString());
            d.date = new Date(fecha);
            return d;
        });
    };

    const [apList, setApList] = useState(getCustomers(dataAp));
    const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const [menuActive, setMenuActive] = useState(layoutState.staticMenuDesktopInactive);
    const [calendarValue, setCalendarValue] = useState(null);
    const [calendarValueFin, setCalendarValueFin] = useState(null);
    const [apListCSV, setApListCSV] = useState([]);
    useEffect(() => {
        setMenuActive(layoutState.staticMenuDesktopInactive);
    }, [layoutState.staticMenuDesktopInactive]);



    const botonCSV = () => {
        const csvData = convertTocsv(apList);
        const filename = "Dispositivos.csv";

        const csv = new Blob([csvData], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(csv);
        link.download = filename;
        link.click();
    };

    const toast = useRef(null);
    const onUpload = () => {
        botonCSV();
        toast.current.show({ severity: 'info', summary: 'Acción exitosa', detail: 'Archivo subido', life: 3000 });
    };


    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    const clearFilter1 = () => {
        initFilters1();
    };

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between" style={{ paddingTop: "20px" }}>
                <Toast key={"Mensaje"} ref={toast}></Toast>
                <Button label='Exportar' onClick={onUpload}></Button>

                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText key={"Filtro"} value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar MAC/IP" />
                </span>
            </div>
        );
    };

    const [loading1, setLoading1] = useState(true);



    useEffect(() => {
        setLoading1(false);
        initFilters1();
    }, [dataAp]);


    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_BEFORE }] },
            balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue1('');
    };

    const header1 = renderHeader1();


    const Columns = [
        { field: 'fecha', header: 'Fecha', filterField: 'date', dataType: 'date', minWidth: '8rem', body: 'dateBodyTemplate', filter: 'dateBodyTemplate', filterElement: 'dateFilterTemplate', filterMatchModeOptions: 'matchModes' },
        { field: 'status', header: 'Estado actual', minWidth: '7rem' },
        { field: 'mac', header: 'MAC', minWidth: '11rem' },
        { field: 'ipv4', header: 'Dirección IP', minWidth: '9rem' },
        { field: 'ipv6', header: 'Dirección IPv6', minWidth: '12rem' },
        { field: 'versionFirmware', header: 'Firmware', minWidth: '6rem' },
        { field: 'upTime', header: 'Tiempo de conexión', minWidth: '7rem' },
    ]

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Dispositivos</h5>
                    <Tablafiltro key={"Tabla Dispositivos"} value={apList} rows={7} dataKey={'id'} filters={filters1} filterDisplay={'menu'} loading={loading1} responsiveLayout={'scroll'} header={header1} Columns={Columns} tipo={'dispositivos'} />


                </div>
            </div>


        </div>
    );
};

export const getServerSideProps = async () => {
    const dataAp = await ApService.getApList()

    if (!dataAp) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            dataAp,
        },
    };
};
//Recarga los valores cada 12 horas
schedule.scheduleJob('0 */12 * * *', async () => {
    try {
        const result = await getServerSideProps();
    } catch (error) {

    }
});

function convertTocsv(data) {
    const csvData = [];
    for (const item of data) {
        const row = [];
        for (const key in item) {
            row.push(item[key]);
        }
        csvData.push(row);
    }

    const csv = csvData.join("\n");
    return csv;
}


export default TableDemo;