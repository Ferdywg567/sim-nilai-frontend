import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export function showAlert([icon, title, text], options) {

    const config = {
        title: title,
        html: text,
        icon: icon,
    };

    Object.assign(config, options);

    Swal.fire(config);
}