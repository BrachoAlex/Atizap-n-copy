import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const handleSession = () => {
        const correo = process.env.NEXT_PUBLIC_CORREO;
        const pass = process.env.NEXT_PUBLIC_PASSWORD;
        if (correo === email && pass === password) {
            router.push('/');
        }
        else {
            setError(true);
        }

        // router.push('/');
    };
    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`${contextPath}/layout/images/logo_Atizapan.png`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">¡Bievenido!</div>
                            <span className="text-600 font-medium">Inicia sesión para continuar</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Correo electrónico
                            </label>
                            <InputText inputid="email1" value={email} onChange={(e) => {
                                if (error) setError(false);
                                setEmail(e.target.value)
                            }} type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Contraseña
                            </label>
                            <Password promptLabel="Ingresa una contraseña" weakLabel="Contraseña débil" mediumLabel="Contraseña media" strongLabel="Contraseña fuerte" inputid="password1" value={password} onChange={(e) => {
                                if (error) setError(false);
                                setPassword(e.target.value)
                            }} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex justify-center mb-5 gap-5">
                                {error && (
                                    <span style={{ marginLeft: '115px' }} className="text-red-500 text-center flex items-center h-full">
                                        Correo o contraseña incorrectos
                                    </span>
                                )}
                            </div>

                            <Button label="Inicia sesión" className="w-full p-3 text-xl" onClick={() => handleSession()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
