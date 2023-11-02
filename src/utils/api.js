import axios from 'axios'

export function api (base_api, method, url = '', data = {}, headers = {}, parameters = {}) {
    if (method == 'post') {
        return axios.post(`${base_api}${url}`, data, { headers, parameters });
    }
    if (method == 'get') {
        axios.get(`${base_api}${url}`, { parameters }, { headers });
    }
}
