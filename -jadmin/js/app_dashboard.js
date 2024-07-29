function loader_show() {
    document.getElementById('loader').classList.add('active_loader');
}

function loader_close() {
    document.getElementById('loader').classList.remove('active_loader');
}

loader_show();

window.addEventListener("DOMContentLoaded", function() {
    loader_close();
});