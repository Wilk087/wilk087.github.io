function saveToLocalStorage() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        localStorage.setItem(input.id, input.value);
    });
}

function loadFromLocalStorage() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const value = localStorage.getItem(input.id);
        if (value !== null) {
            input.value = value;
        }
    });
}

window.onload = function() {
    loadFromLocalStorage();
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', saveToLocalStorage);
    });
}
