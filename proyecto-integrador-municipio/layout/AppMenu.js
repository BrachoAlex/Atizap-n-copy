import getConfig from 'next/config';
import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const model = [
        {
            label: 'Menú',
            items: [{ label: 'Tablero', icon: 'pi pi-fw pi-home', to: '/' }, { label: 'Usuarios', icon: 'pi pi-fw pi-users', to: '/usuarios' }, { label: 'Dispositivos', icon: 'pi pi-fw pi-mobile', to: '/dispositivos' }]
        },
        {
            label: 'Sesión',
            items: [{ label: 'Cerrar sesión', icon: 'pi pi-fw pi-sign-out', to: '/auth/login' },]
        }
    ];


    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
