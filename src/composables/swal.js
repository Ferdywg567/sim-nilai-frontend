import Swal from 'sweetalert2';

export function showAlert([icon, title, text], options) {

    const config = {
        title: title,
        text: text,
        icon: icon,
    };

    Object.assign(config, options);

    Swal.fire(config);
}