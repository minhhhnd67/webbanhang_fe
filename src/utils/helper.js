import axios from 'axios'

export function api (base_api, method, url = '', data = {}, headers = {}, parameters = {}) {
    if (method == 'post') {
        return axios.post(`${base_api}${url}`, data, { headers, parameters });
    }
    if (method == 'get') {
        return axios.get(`${base_api}${url}`, { headers, parameters });
    }
}

export function getTokenBE () {
    return localStorage.getItem('tokenBE');
}
