import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { TabMenu } from 'primereact/tabmenu';

const NavBarUsuarios = () => {
    const [activeIndex, setIndexActive] = useState(0);

    const navBarItems = [
        { label: 'Información', command: () => router.push('/usuarios/informacion') },
        { label: 'Uso', command: () => router.push('/usuarios/uso') },
    ];

    const router = useRouter();
    const checkActiveIndex = useCallback(() => {
        const paths = router.pathname.split('/');
        const currentPath = paths[paths.length - 1];

        switch (currentPath) {
            case 'uso':
                setIndexActive(1);
                break;
            case 'informacion':
                setIndexActive(0);
                break;
            default:
                break;
        }
    }, [router]);

    useEffect(() => {
        checkActiveIndex();
    }, [checkActiveIndex]);


    return (
        <>
            <TabMenu key={"NavBar Usuarios"} model={navBarItems} activeIndex={activeIndex} onTabChange={(e) => setIndexActive(e.index)} />
        </>
    );
};

export default NavBarUsuarios;