import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const fetch_get = async (url) => {
    let user = JSON.parse(localStorage.getItem("user") ?? "{}");
    let token = user?.token ?? "";
    try {
        let response = await fetch(url, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status >= 200 && response.status < 300) {
            return await response.json();
        } else {
            let res = await response.json();
            Swal.fire({
                icon: "error",
                title: "Oh no!",
                text: res.errors[Object.keys(res.errors)[0]],
            });
            return null;
        }
    } catch (e) {
        Swal.fire({
            icon: "error",
            title: "Oh no!",
            text: "Error del sistema",
        });
    }
};

export const fetch_post = async (url, data) => {
    let user = JSON.parse(localStorage.getItem("user") ?? "{}");
    let token = user?.token ?? "";
    try {
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status >= 200 && response.status < 300) {
            return await response.json();
        } else {
            let res = await response.json();
            Swal.fire({
                icon: "error",
                title: "Oh no!",
                text: res.errors[Object.keys(res.errors)[0]],
            });
            return null;
        }
    } catch (e) {
        console.error(e);
        Swal.fire({
            icon: "error",
            title: "Oh no!",
            text: "Error del sistema",
        });
    }
};

export const fetch_patch = async (url, data) => {
    let user = JSON.parse(localStorage.getItem("user") ?? "{}");
    let token = user?.token ?? "";
    try {
        let response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status >= 200 && response.status < 300) {
            return await response.json();
        } else {
            let res = await response.json();
            Swal.fire({
                icon: "error",
                title: "Oh no!",
                text: res.errors[Object.keys(res.errors)[0]],
            });
            return null;
        }
    } catch (e) {
        console.log(e);
        Swal.fire({
            icon: "error",
            title: "Oh no!",
            text: "Error del sistema",
        });
    }
};

export const fetch_delete = async (url, data) => {
    let user = JSON.parse(localStorage.getItem("user") ?? "{}");
    let token = user?.token ?? "";
    try {
        let response = await fetch(url, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status >= 200 && response.status < 300) {
            return await response.json();
        } else {
            let res = await response.json();
            Swal.fire({
                icon: "error",
                title: "Oh no!",
                text: res.errors[Object.keys(res.errors)[0]],
            });
            return null;
        }
    } catch (e) {
        console.log(e);
        Swal.fire({
            icon: "error",
            title: "Oh no!",
            text: "Error del sistema",
        });
    }
};