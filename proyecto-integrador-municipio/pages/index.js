import getConfig from 'next/config';
import { Chart } from 'primereact/chart';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../layout/context/layoutcontext';
import { Estadisticas } from '../components/Tablero/Estadisticas';
import { TablaClientesPrincipales } from '../components/Tablero/TablaClientesPrincipales';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { StatisticsClientService } from '../demo/service/StatisticsClientService';
import { ClientListService } from '../demo/service/ClientListService';
import { Box, CircularProgress, Typography } from '@mui/material';


const Dashboard = () => {
    const [statisticsClient, setStatisticsClient] = useState([]);
    const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const [menuActive, setMenuActive] = useState(layoutState.staticMenuDesktopInactive);
    const [bool, setBool] = useState(false);

    const [options, setOptions] = useState({});
    const [data, setChartData] = useState({});
    const [lineOptions, setLineOptions] = useState(null);
    const [dropdownValue, setDropdownValue] = useState('01');
    const [dropdownValueUso, setDropdownValueUso] = useState('01');

    const [calendarValue, setCalendarValue] = useState(null);
    const [calendarValueFin, setCalendarValueFin] = useState(null);

    const [calendarValueUso, setCalendarValueUso] = useState(null);
    const [calendarValueFinUso, setCalendarValueFinUso] = useState(null);



    useEffect(() => {
        setMenuActive(layoutState.staticMenuDesktopInactive);
    }, [layoutState.staticMenuDesktopInactive]);



    const dropdownValues = [
        { name: '1 día', code: '01' },
        { name: '1 semana', code: '02' },
        { name: '1 mes', code: '03' }
    ];

    const dropdownValuesUso = [
        { name: '1 día', code: '01' },
        { name: '1 semana', code: '02' },
        { name: '1 mes', code: '03' }
    ];

    const [loading1, setLoading1] = useState(true);
    const [clientList, setClientList] = useState(null);
    useEffect(() => {
        StatisticsClientService.getStatisticsClient().then((data) => {

            setStatisticsClient(data)
            const [formattedDates, numClients] = data.reduce(
                ([formattedDates, numClients], { date, numClients: clients }) => {
                    const [day, month, year] = date.split('-');
                    const formattedDate = `${year}-${month}-${day}`;
                    return [
                        [...formattedDates, formattedDate],
                        [...numClients, clients],
                    ];
                },
                [[], []]
            );

            const sortedData = formattedDates.map((date, index) => ({ date, numClients: numClients[index] }));

            sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));

            const sortedFormattedDates = sortedData.map(data => {
                const [year, month, day] = data.date.split('-');
                const formattedDate = `${day}-${new Date(
                    `${month}-${day}-${year}`
                ).toLocaleString('en-us', { month: 'long' })}`;
                return formattedDate;
            });

            const sortedNumClients = sortedData.map(data => data.numClients);

            //console.log("formattedDates sorted: ", sortedFormattedDates);
            //console.log("numClients sorted: ", sortedNumClients);

            //console.log("Formateo de fechas: ", formattedDates);
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            //console.log("formattedDates useEffect: ", formattedDates)

            const lineData = {
                //Aquí recibimos el arreglo de la fecha y el mes de la base de datos.
                labels: sortedFormattedDates,
                datasets: [
                    {
                        label: 'Núm. de Clientes',
                        //Aquí colocamos el arreglo de la cantidad de clientes de la base de datos.
                        data: sortedNumClients,
                        fill: true,
                        tension: 0.4,
                        backgroundColor: 'rgb(99, 102, 241, 0.2)',
                        borderColor: documentStyle.getPropertyValue('--primary-500'),
                        tension: 0.4
                    },

                ]
            };
            const lineDataClientes = {
                labels: ['Abril', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Clientes',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: true,
                        tension: 0.4,
                        backgroundColor: 'rgb(99, 102, 241, 0.2)',
                        borderColor: documentStyle.getPropertyValue('--primary-500'),
                        tension: 0.4
                    },

                ]
            };
            const lineDataAnchoBanda = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Subida',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: true,
                        tension: 0.4,
                        backgroundColor: 'rgb(65, 197, 183,0.2)',
                        borderColor: 'rgb(65, 197, 183,1)',
                    },
                    {
                        label: 'Bajada',
                        data: [25, 29, 35, 21, 16, 25, 30],
                        fill: true,
                        tension: 0.4,
                        backgroundColor: 'rgb(185, 117, 249,0.2)',
                        borderColor: 'rgb(185, 117, 249,1)',
                    }

                ]
            };

            const lineOptions = {
                plugins: {
                    legend: {
                        labels: {
                            fontColor: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
            setOptions(prevOptions => ({
                ...prevOptions,
                lineOptions
            }));
            setChartData(prevChartData => ({
                ...prevChartData,
                lineData,
                lineDataClientes,
                lineDataAnchoBanda
            }));

        });
        ClientListService.getClientList().then((data) => {
            setClientList(getCustomers(data))
            setLoading1(false);
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const pieData = {
                labels: ['Android', 'Windows', 'iOS', 'Otros'],
                datasets: [
                    {
                        data: [getAndroid(data), getWindows(data), getIOS(data), getOtros(data)],
                        // data: [8, 4, 10, 5, 2],
                        // data: [array[0], array[1], array[2], array[3], array[4]],
                        backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500'), documentStyle.getPropertyValue('--red-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--teal-400'), documentStyle.getPropertyValue('--red-400')]
                    }
                ]
            };

            const pieOptions = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };

            setOptions(prevOptions => ({
                ...prevOptions,
                pieOptions
            }));
            setChartData(prevChartData => ({
                ...prevChartData,
                pieData
            }));
        });


    }, []);


    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };







    function getAndroid(data) {
        return data.filter((item) => item.dhcpOs === 'Android').length;
    }
    function getWindows(data) {
        return data.filter((item) => item.dhcpOs === 'Windows').length;
    }
    function getIOS(data) {
        return data.filter((item) => item.dhcpOs === 'iOS').length;
    }
    function getMac(data) {
        return data.filter((item) => item.dhcpOs === 'Mac').length;
    }
    function getOtros(data) {
        return data.filter((item) => item.dhcpOs !== "Android" && item.dhcpOs !== "Windows" && item.dhcpOs !== "IOS" && item.dhcpOs !== "Mac").length;
    }

    console.log("ClientList: ", clientList);





    return (
        <div className="grid">

            <div className="col-12 xl:col-6">
                <div className="card">
                    <div className="flex items-center flex-wrap space-between" style={{ justifyContent: "space-between" }}>
                        <h5 style={{ marginRight: "50px" }}>Conteo de clientes</h5>
                    </div>
                    {data.lineData ? (
                        <Chart type="line" data={data.lineData} options={data.lineOptions} key={'Conteo de clientes'} />
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                            alignItems="center"
                            height="200px"

                        ><CircularProgress color='inherit' />

                        </Box>)}

                </div>

                <div className="card">
                    <h5>Clientes principales</h5>
                    <TablaClientesPrincipales />
                </div>

            </div>


            <div className="col-12 xl:col-6">
                <div className="card" live={"true"}>
                    <h5>Cliente OS</h5>
                    {data.pieData ? (
                        <Chart
                            type="doughnut" data={data.pieData} options={options.pieOptions} key={'Cliente OS'}
                        ></Chart>
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                            alignItems="center"
                            height="200px"

                        ><CircularProgress color='inherit' />

                        </Box>)}

                </div>

            </div>






        </div>
    );
};

export default Dashboard;
