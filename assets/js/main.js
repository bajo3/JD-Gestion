const CLIENT_ID = '1083902324626-a3chh92k741co9dmi55n3t6lee7353c0.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDrGiN5UNdIVtmnHnbE27X-AcEQA2HDfxY';
const SHEET_ID = '1OIld6xpniVzyGSAjVlA5oh1_fGbyl5DBnZsn-SS_Zd8';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

document.addEventListener('DOMContentLoaded', () => {
    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
    }

    function initClient() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            authInstance.isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(authInstance.isSignedIn.get());
            document.getElementById('authorize_button').onclick = handleAuthClick;
            document.getElementById('signout_button').onclick = handleSignoutClick;
        }, error => {
            console.error('Error al inicializar el cliente:', error);
        });
    }

    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            document.getElementById('authorize_button').style.display = 'none';
            document.getElementById('signout_button').style.display = 'block';
            if (window.location.pathname.endsWith('stock.html')) {
                loadStockData();
            } else if (window.location.pathname.endsWith('clients.html')) {
                loadClientData();
            }
        } else {
            document.getElementById('authorize_button').style.display = 'block';
            document.getElementById('signout_button').style.display = 'none';
        }
    }

    function handleAuthClick() {
        gapi.auth2.getAuthInstance().signIn();
    }

    function handleSignoutClick() {
        gapi.auth2.getAuthInstance().signOut();
    }

    function loadStockData() {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: 'Stock!A2:C'
        }).then(response => {
            const range = response.result;
            const stockList = document.getElementById('stock-list');
            if (range.values && range.values.length > 0) {
                stockList.innerHTML = range.values.map(row =>
                    `<p>${row[0]} ${row[1]} (${row[2]})</p>`
                ).join('');
            } else {
                stockList.innerHTML = 'No hay autos en stock.';
            }
        }).catch(error => {
            console.error('Error al cargar datos:', error);
        });
    }

    function loadClientData() {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: 'Clientes!A2:B'
        }).then(response => {
            const range = response.result;
            const clientsList = document.getElementById('clients-list');
            if (range.values && range.values.length > 0) {
                clientsList.innerHTML = range.values.map(row =>
                    `<p>${row[0]} - ${row[1]}</p>`
                ).join('');
            } else {
                clientsList.innerHTML = 'No hay clientes registrados.';
            }
        }).catch(error => {
            console.error('Error al cargar datos:', error);
        });
    }

    handleClientLoad();
});
