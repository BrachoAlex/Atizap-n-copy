export const CustomerService = {
    getCustomersMedium() {
        return fetch('/demo/data/customers-medium.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    },

    getCustomersLarge() {
        return fetch('/demo/data/customers-large.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    },


    getInfoDispositivos() {
        return fetch('/demo/data/info-dispositivos.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    },

    getInfoUsuarios() {
        return fetch('/demo/data/info-usuarios.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);

    },
    getInfoClientes() {
        return fetch('/demo/data/clients.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
};