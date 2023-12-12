import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { TabMenu } from 'primereact/tabmenu';

const NavBarDispositivos = () => {
    const [activeIndex, setIndexActive] = useState(0);
    const router = useRouter();
    const { query: { mac } } = router;

    const navBarItems = [
        { label: 'Información', command: () => router.push(`/dispositivos/${mac}/informacion`) },
        // { label: 'Uso', command: () => router.push(`/dispositivos/${mac}/uso`) }
    ];


    const checkActiveIndex = useCallback(() => {
        const paths = router.pathname.split('/');
        const currentPath = paths[paths.length - 1];

        switch (currentPath) {
            case 'uso':
                setIndexActive(1);
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
            <TabMenu key={"NavBar Dispositivos"} model={navBarItems} activeIndex={activeIndex} onTabChange={(e) => setIndexActive(e.index)} />
        </>
    );
};

export default NavBarDispositivos;