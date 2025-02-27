document.getElementById('themeCheckbox').addEventListener('click', function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-bs-theme', newTheme);
    });

const ports = {
"Mumbai": [19.0760, 72.8777],
"Chennai": [13.0827, 80.2707],
"Kolkata": [22.5726, 88.3639],
"Visakhapatnam": [17.6868, 83.2185],
"Kandla": [23.0333, 70.2167],
"Cochin": [9.9312, 76.2673],
"Mangalore": [12.9141, 74.8560],
"Paradip": [20.3167, 86.6167],
"New Mangalore": [12.9141, 74.8560],
"V.O. Chidambaranar (Tuticorin)": [8.7642, 78.1348],
"Jawaharlal Nehru Port Trust (Nhava Sheva)": [18.9510, 72.9489]
};


const map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

const apiKey = 'ztvCFM49BL1xn6SqGKqKq57Xiachwj7S2Wf6Hv1R';
const apiUrl = 'https://api.searoutes.com/route/v2/sea/';

async function getSeaRoute(startCoords, endCoords) {
    const query = `${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}`;
    const url = `${apiUrl}/${query}/plan?continuousCoordinates=true&allowIceAreas=false&avoidHRA=false&avoidSeca=false`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-api-key': apiKey
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

function optimizeRoute() {
    const startPort = document.getElementById('startPort').value;
    const endPort = document.getElementById('endPort').value;

    if (startPort === endPort) {
        alert("Start and end ports cannot be the same.");
        return;
    }

    const startCoords = ports[startPort];
    const endCoords = ports[endPort];

    if (!startCoords || !endCoords) {
        alert("Invalid port selected.");
        return;
    }

    // Clear existing layers
    map.eachLayer(function (layer) {
        if (layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });

    // Plot start and end ports
    L.marker(startCoords).addTo(map)
        .bindPopup(`<b>${startPort}</b>`).openPopup();

    L.marker(endCoords).addTo(map)
        .bindPopup(`<b>${endPort}</b>`).openPopup();

    // Fetch and draw the optimized sea route
    getSeaRoute(startCoords, endCoords).then(data => {
        if (data && data.features && data.features.length > 0) {
            const route = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            const polyline = L.polyline(route, { color: 'blue' }).addTo(map);
            map.fitBounds(polyline.getBounds());
        } else {
            alert("No route available between the selected ports.");
        }
    });
}
