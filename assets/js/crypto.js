const textInput = document.getElementById('text-input');
const fetchButton = document.getElementById('fetch-button');
const results = document.getElementById('results')

// Error Modal Elements
const errorModal = document.getElementById("errorModal");
const closeBtn = document.getElementById("closeBtn");

function saveCoinsToStorage(favoriteCoins) {
    localStorage.setItem('favoriteCoins', JSON.stringify(favoriteCoins));
}

function readCoinsFromStorage() {
    let favoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins'));

    if (!favoriteCoins) {
        favoriteCoins = [];
    }

    return favoriteCoins;
}

function getGeckoApi(event) {
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-JRFGKiLZjLqxhCoT7of1Kng2' }
    };
    const cryptoName = textInput.value;
    const requestUrl = `https://api.coingecko.com/api/v3/coins/${cryptoName}`;


    fetch(requestUrl, options)
        .then(function (response) {
            if (!response.ok) {
                console.log('API request failed with status:', response.status);
                errorModal.style.display = "block";
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Creating elements, card, header, img, and price
            const card = document.createElement('div');
            const header = document.createElement('h2');
            const img = document.createElement('img');
            const price = document.createElement('div');
            const favoriteBtn = document.createElement('button')

            card.setAttribute('class', 'card');
            header.textContent = data.name;
            img.setAttribute('src', data.image.small);
            price.textContent = `Price (USD): ${data.market_data.current_price.usd.toLocaleString("en-US", {
                style: "currency",
                maximumFractionDigits: 10,
                currency: "USD"
            })}`;

            const coin = {
                id: data.id
            };

            favoriteBtn.textContent = 'Add to favorites';
            favoriteBtn.onclick = function () {
                const favoriteCoins = readCoinsFromStorage();
                favoriteCoins.push(coin);
                saveCoinsToStorage(favoriteCoins);
            }

            //Appending Elements to crypto.html
            card.appendChild(header);
            card.appendChild(img);
            card.appendChild(price);
            card.appendChild(favoriteBtn);
            results.appendChild(card);

        }
        );
}


function fetchButtonHandler(event) {
    event.preventDefault();
    getGeckoApi();
}


fetchButton.addEventListener('click', fetchButtonHandler);

closeBtn.onclick = function () {
    errorModal.style.display = "none";
};