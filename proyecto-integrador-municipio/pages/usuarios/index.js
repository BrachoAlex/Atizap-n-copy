import React, { useState, useEffect, useRef, useContext } from 'react';
import schedule from 'node-schedule';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { CustomerService } from '../../demo/service/CustomerServiceFunction';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { Tablafiltro } from '../../components/Ui/TablaFiltro';
import { ClientListService } from '../../demo/service/ClientListService';
import { Button } from 'primereact/button';
const TableDemo = ({ dataClients }) => {

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

    const [clientList, setClientList] = useState(getCustomers(dataClients));
    const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const [menuActive, setMenuActive] = useState(layoutState.staticMenuDesktopInactive);
    const [usuariosListCSV, setUsuariosListCSV] = useState([]);
    useEffect(() => {
        setMenuActive(layoutState.staticMenuDesktopInactive);
    }, [layoutState.staticMenuDesktopInactive]);

    const botonCSV = () => {
        const csvData = convertTocsv(clientList);
        const filename = "Usuarios.csv";

        const csv = new Blob([csvData], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(csv);
        link.download = filename;
        link.click();
    };

    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [calendarValue, setCalendarValue] = useState(null);
    const [calendarValueFin, setCalendarValueFin] = useState(null);

    const toast = useRef(null);
    const onUpload = () => {
        botonCSV();
        toast.current.show({ severity: 'info', summary: 'Acción exitosa', detail: 'Archivo descargado', life: 3000 });
    };


    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between" style={{ paddingTop: "20px" }}>
                <Toast ref={toast}></Toast>
                <Button label='Exportar' onClick={onUpload}></Button>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar MAC/APID/IP" />
                </span>
            </div>
        );
    };


    useEffect(() => {
        setLoading1(false);
        initFilters1();
    }, [dataClients]);


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
        { field: 'fecha', header: 'Fecha', filterField: 'date', dataType: 'date', minWidth: '12rem', body: 'dateBodyTemplate', filter: 'dateBodyTemplate', filterElement: 'dateFilterTemplate', filterMatchModeOptions: 'matchModes' },
        { field: 'clientId', header: 'Hostname', minWidth: '12rem' },
        { field: 'apId', header: 'Access Point ID', minWidth: '12rem' },
        { field: 'ssid', header: 'SSID', minWidth: '12rem' },
        { field: 'ipv4', header: 'Dirección IP', minWidth: '12rem' },
        { field: 'totalBytes', header: 'Total', minWidth: '8rem' },
        { field: 'assoctime', header: 'Tiempo de conexión', minWidth: '12rem' },
    ]


    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Usuarios</h5>

                    <Tablafiltro key={"Tabla Usuarios"} tipo='usuarios' value={clientList} Columns={Columns} rows={7} dataKey={"id" + "fecha"} filters={filters1} filterDisplay="menu" loading={loading1} responsiveLayout="scroll" header={header1} />

                </div >
            </div >

        </div >
    );
};

export const getServerSideProps = async () => {
    const dataClients = await ClientListService.getClientList()

    if (!dataClients) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            dataClients,
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