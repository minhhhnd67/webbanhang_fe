import axios from 'axios'

export function api (base_api, method, url = '', data = {}, headers = {}, parameters = {}) {
    if (method == 'post') {
        return axios.post(`${base_api}${url}`, data, {headers: headers, params: parameters }).catch(function (err) {
            console.log(err);
            return { data: { code: 400, message: err}};
        });
    }
    if (method == 'get') {
        return axios.get(`${base_api}${url}`, { headers: headers, params: parameters }).catch(function (err) {
            console.log(err);
            return { data: { code: 400, message: err}};
        });
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

export function getStatusOrder() {
    return [
        {id: 0, name: "Chưa thanh toán"},
        {id: 1, name: "Đã thanh toán"},
        {id: 2, name: "Đã xác nhận"},
        {id: 3, name: "Chuẩn bị hàng"},
        {id: 4, name: "Đang giao hàng"},
        {id: 5, name: "Hoàn thành"},
        {id: 6, name: "Đã hủy"},
    ];
}

export function getTypeOrder() {
    return [
        {id: 1, name: "Offline"},
        {id: 2, name: "Online"},
    ];
}

export function formatMoney(amount) {
    let moneyVND = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
    });

    return moneyVND.format(amount);
}
