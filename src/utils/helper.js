import axios from 'axios'

export function api (base_api, method, url = '', data = {}, headers = {}, parameters = {}) {
    if (method == 'post') {
        return axios.post(`${base_api}${url}`, data, {headers: headers, params: parameters });
    }
    if (method == 'get') {
        return axios.get(`${base_api}${url}`, { headers: headers, params: parameters });
    }
}

export function getTokenBE () {
    return localStorage.getItem('tokenBE');
}

export function getRoles() {
    return [
        {id:  1, code: 'admin', name: "Admin"},
        {id:  2, code: 'manage_store', name: "Quản lý cơ sở"},
        {id:  3, code: 'manage_warehouse', name: "Quản lý kho"},
        {id:  4, code: 'staff',name: "Nhân viên"},
        {id:  5, code: 'user', name: "Người dùng"}
    ];
}

export function getStatusUser() {
    return [
        {id: 0, name: "Khóa"},
        {id: 1, name: "Hoạt động"}
    ];
}
