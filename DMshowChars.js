// Maintain an array of all loaded characters
let importedCharacters = [];

// Save characters to localStorage
function saveToLocalStorage() {
    localStorage.setItem('characters', JSON.stringify(importedCharacters));
}

// Load characters from localStorage
function loadFromLocalStorage() {
    const storedCharacters = localStorage.getItem('characters');
    if (storedCharacters) {
        try {
            importedCharacters = JSON.parse(storedCharacters);
            displayCharacters();
        } catch (error) {
            console.error('Error loading characters from localStorage:', error);
        }
    }
}

// Display all characters in #players, using an even smaller font
function displayCharacters() {
    const container = document.getElementById('players');
    container.innerHTML = ''; 
    
    importedCharacters.forEach(characterData => {
        let summary = `
            <div class="player-summary">
        `;
        for (const field in characterData) {
            summary += `<p><strong>${capitalize(field)}:</strong> ${characterData[field]}</p>`;
        }
        summary += '</div>';
        container.innerHTML += summary;
    });
}

// Utility function to capitalize field names
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Import and parse multiple JSON files
function importFromFile() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput || fileInput.files.length === 0) {
        alert('Please select at least one JSON file.');
        return;
    }

    const files = Array.from(fileInput.files);
    let filesToLoad = files.length;

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const jsonData = JSON.parse(e.target.result);
                if (Array.isArray(jsonData)) {
                    importedCharacters.push(...jsonData);
                } else {
                    importedCharacters.push(jsonData);
                }
                saveToLocalStorage();
            } catch (error) {
                alert('Invalid JSON file format');
                console.error(error);
            }
            filesToLoad--;
            if (filesToLoad === 0) {
                displayCharacters();
            }
        };
        reader.readAsText(file);
    });
}

// Exports data from input fields to a JSON file
function exportToJsonFile() {
    const data = {};
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        data[input.id] = input.value;
    });

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'characterData.json';
    downloadLink.click();
    URL.revokeObjectURL(url);
}

function clearCharacters() {
    importedCharacters = [];
    const container = document.getElementById('players');
    container.innerHTML = '';

    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.value = '';
    }
    saveToLocalStorage();
}

// Automatically display characters on page load
window.addEventListener('load', function() {
    loadFromLocalStorage();
    displayCharacters();
});