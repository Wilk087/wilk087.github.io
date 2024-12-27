// Maintain an array of all loaded characters
let importedCharacters = [];

// Display all characters in #players, using an even smaller font
function displayCharacters() {
    const container = document.getElementById('players');
    container.innerHTML = ''; 
    
    importedCharacters.forEach(characterData => {
        let summary = `
            <div class="player-summary" 
                 style="border:1px solid #333;
                        margin-bottom:10px;
                        padding:10px;
                        border-radius:5px;
                        font-size:0.6rem;">
        `;
        for (const field in characterData) {
            summary += `<p style="font-size: 1rem"><strong>${field}:</strong> ${characterData[field]}</p>`;
        }
        summary += '</div>';
        container.innerHTML += summary;
    });
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

// Clear loaded data and reset file input
function clearCharacters() {
    importedCharacters = [];
    const container = document.getElementById('players');
    container.innerHTML = '';

    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.value = '';
    }
}

// Optional: automatically display characters on page load
window.onload = function() {
    displayCharacters();
};