function saveToCookies() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        document.cookie = `${input.id}=${input.value}; path=/`;
    });
}

function loadFromCookies() {
    const cookies = document.cookie.split('; ');
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        const input = document.getElementById(name);
        if (input) {
            input.value = value;
        }
    });
}

window.onload = function() {
    loadFromCookies();
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', saveToCookies);
    });
}