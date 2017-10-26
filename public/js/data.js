import * as requester from 'requester';

export function getProducts(query) {
    return requester.get('api/products?' + query);
}

export function getClients() {
    return requester.get('api/clients');
}

export function login(username, passHash) {
    const body = {
        username,
        passHash
    };

    return requester.put('api/auth', body);
}

export function register(username, passHash) {
    const body = {
        username,
        passHash
    };

    return requester.post('api/users', body);
}
export function addClient(name, profession, age, trainings, endDate, price, picture) {
    const body = {
        name,
        profession,
        age,
        trainings,
        endDate,
        price,
        picture
    };

    return requester.post('api/clients', body);
}