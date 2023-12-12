import { Chart } from 'primereact/chart';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';


import { LayoutContext } from '../../../layout/context/layoutcontext';
import { DispositivosLayout } from '../../../layout/dispositivosLayout';



const infoDispositivosDetallada = () => {
    const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const [menuActive, setMenuActive] = useState(layoutState.staticMenuDesktopInactive);

    useEffect(() => {
        setMenuActive(layoutState.staticMenuDesktopInactive);
    }, [layoutState.staticMenuDesktopInactive]);

    const [options, setOptions] = useState({});
    const [data, setChartData] = useState({});
    const [dropdownValue, setDropdownValue] = useState('01');
    const [dropdownValueUso, setDropdownValueUso] = useState('01');

    const [calendarValue, setCalendarValue] = useState(null);
    const [calendarValueFin, setCalendarValueFin] = useState(null);

    const [calendarValueUso, setCalendarValueUso] = useState(null);
    const [calendarValueFinUso, setCalendarValueFinUso] = useState(null);


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

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


        const lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
        setOptions({
            lineOptions
        });
        setChartData({
            lineData,
            lineDataAnchoBanda
        });
    }, [layoutConfig]);


    return (
        <DispositivosLayout>
            <div className="grid">

                <div className="col-12 xl:col-6">
                    <div className="card">
                        <div className="flex items-center flex-wrap space-between" style={{ justifyContent: "space-between" }}>
                            <h5 style={{ marginRight: "50px" }}>Conteo de clientes</h5>
                            <span className="p-float-label" style={{
                                display: !menuActive ? "none" : "flex"
                            }}>
                                <Calendar style={{
                                    width: "180px",
                                    display: !menuActive ? "none" : "flex"
                                }} showIcon inputId="calendarInicio" showButtonBar value={calendarValue} onChange={(e) => setCalendarValue(e.value)}></Calendar>
                                <label htmlFor="calendarInicio">Fecha inicio</label>
                            </span>
                            <span className="p-float-label" style={{
                                display: !menuActive ? "none" : "flex"
                            }}>
                                <Calendar style={{
                                    width: "180px",
                                    display: !menuActive ? "none" : "flex"
                                }} showIcon inputId="calendarFin" showButtonBar value={calendarValueFin} onChange={(e) => setCalendarValueFin(e.value)}></Calendar>
                                <label htmlFor="calendarFin">Fecha fin</label>
                            </span>
                            <Dropdown defaultValue={dropdownValue} value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder='1 día' />

                        </div>

                        <Chart type="line" data={data.lineData} options={data.lineOptions} />
                    </div>



                </div>

                <div className="col-12 xl:col-6">
                    <div className="card">
                        <div className="flex items-center flex-wrap space-between" style={{ justifyContent: "space-between" }}>
                            <h5>Uso de ancho de banda&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5>
                            <span className="p-float-label" style={{
                                display: !menuActive ? "none" : "flex"
                            }}>
                                <Calendar style={{
                                    width: "180px",
                                    display: !menuActive ? "none" : "flex"
                                }} showIcon inputId="calendarInicioUso" showButtonBar value={calendarValueUso} onChange={(e) => setCalendarValue(e.value)}></Calendar>
                                <label htmlFor="calendarInicioUso">Fecha inicio</label>
                            </span>
                            <span className="p-float-label" style={{
                                display: !menuActive ? "none" : "flex"
                            }}>
                                <Calendar style={{
                                    width: "180px",
                                    display: !menuActive ? "none" : "flex"
                                }} showIcon inputId="calendarFinUso" showButtonBar value={calendarValueFinUso} onChange={(e) => setCalendarValueFin(e.value)}></Calendar>
                                <label htmlFor="calendarFinUso">Fecha fin</label>
                            </span>
                            <Dropdown value={dropdownValueUso} onChange={(e) => setDropdownValueUso(e.value)} options={dropdownValuesUso} optionLabel="name" placeholder='1 día' />

                        </div>
                        <Chart type="line" data={data.lineDataAnchoBanda} options={data.lineOptions} />
                    </div>

                </div>

            </div>
        </DispositivosLayout>
    );
};


export default infoDispositivosDetallada
