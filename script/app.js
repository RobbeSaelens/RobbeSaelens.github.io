'use strict';

// function getAPI() {
// 	const endPoint = `https://www.cryptingup.com/api/markets`;

//     let request = new XMLHttpRequest();
//     request.open("GET", "https://www.cryptingup.com/api/markets");
//     request.send();
//     request.onload = () => {
//         console.log(request);
//         if(request.status == 200) {
//             console.log(JSON.parse(request.response));
//         } else{
//             console.log(`error ${request.status} - ${request.statusText}`)
//         }
//     }
// }

// const fetchData = () => {
//     const url = `https://www.cryptingup.com/api/markets`;
//     fetch(url)
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//       });
//   };

// const fetch = () => {
//     const promises = [];
//     const url = 'response.json';
//     promises.push(fetch(url).then((res) => res.json()));
//     Promise.all(promises).then((results) => {
//       const data = results.map((result) => ({
//           markets: result.markets[0].exchange_id
//       }));
//       console.log(data);
//     });
//   };

const verwerkJson = function(json){
    for(let i=0; i<=99; i++){
        const exchange = json.markets[i].exchange_id;
        const symbol = json.markets[i].symbol;
        const base = json.markets[i].base_asset;
        const quote = json.markets[i].quote_asset;
        const price = json.markets[i].price;
        const roundedPrice = price.toFixed(2);
        const change = json.markets[i].change_24h;
        const roundedChange = change.toFixed(2);
        const status = json.markets[i].status;
        const updated = json.markets[i].updated_at;
        const updatedDate = updated.substring(0, 10);
        // console.log(`${exchange}, ${symbol}, ${roundedPrice}, ${roundedChange}, ${status}, ${updatedDate}`);
    }
};

function maakCard(json){  
    for(let i=0; i<=99; i++){
    const symbol = json.markets[i].symbol;
    const price = json.markets[i].price;
    const unconverted = json.markets[i].price_unconverted;
    const roundedPrice = price.toFixed(5);
    const iconName = json.markets[i].base_asset;
    const quoteAsset = json.markets[i].quote_asset;
    const change = json.markets[i].change_24h;
    const id = json.markets[i].id;
    const status = json.markets[i].status;
    const created = json.markets[i].created_at;
    const updated = json.markets[i].updated_at;
    const volume = json.markets[i].volume_24h;
    const exchange = json.markets[i].exchange_id;

    const displayCard = document.querySelector('.js-row--cards');
    displayCard.innerHTML += `
    <div class="c-card" id=${id} data-exchange=${exchange} data-base=${iconName} data-volume=${volume} data-status=${status} data-unconverted=${unconverted} data-created=${created} data-updated=${updated} data-price=${roundedPrice} data-symbol=${symbol} data-change=${change} onclick="modalDetail(this)"">
    <div class="c-card--container">
      <div class="c-card--header">
        <h4>${symbol}</h4>
        <h5 id=price${i}>€ ${roundedPrice}</h5>
      </div>
      <div class="c-card--main">
      <img id="HideImg" src="./svg/${iconName}.svg" onerror="this.src='./svg/CRYPTO.svg'" data-index-number="${iconName}"/>
      <p class="o-exchange--id"><i>${exchange}</i></p>
      </div>
    </div>
    </div>`;
  // drawChart([], document.getElementById(i).getContext('2d'))
  if(change > 0){
    document.getElementById(`price${i}`).style.color="green";
  }

  var binance = document.getElementById("BINANCE");
  var coinbase = document.getElementById("COINBASE");
  var huobi = document.getElementById("HUOBIGLOBAL");
  var bitfinex = document.getElementById("BITFINEX");
  var kraken = document.getElementById("KRAKEN");

  binance.addEventListener("click", () =>{
    if(document.getElementById(id).dataset.exchange !="BINANCE"){
      document.getElementById(id).style.display="none";
    }
    else{
      document.getElementById(id).style.display="block";
    }
  })
  coinbase.addEventListener("click", () =>{
    if(document.getElementById(id).dataset.exchange !="COINBASE"){
      document.getElementById(id).style.display="none";
    }
    else{
      document.getElementById(id).style.display="block";
    }
  })
  huobi.addEventListener("click", () =>{
    if(document.getElementById(id).dataset.exchange !="HUOBIGLOBAL"){
      document.getElementById(id).style.display="none";
    }
    else{
      document.getElementById(id).style.display="block";
    }
  })
  bitfinex.addEventListener("click", () =>{
    if(document.getElementById(id).dataset.exchange !="BITFINEX"){
      document.getElementById(id).style.display="none";
    }
    else{
      document.getElementById(id).style.display="block";
    }
  })
  kraken.addEventListener("click", () =>{
    if(document.getElementById(id).dataset.exchange !="KRAKEN"){
      document.getElementById(id).style.display="none";
    }
    else{
      document.getElementById(id).style.display="block";
    }
  })
 }
}

function getUnique(array){
  var uniqueArray = [];
  
  // Loop through array values
  for(let i=0; i < array.length; i++){
      if(uniqueArray.indexOf(array[i]) === -1) {
          uniqueArray.push(array[i]);
      }
  }
  return uniqueArray;
}

const exchange = function(json){
  var exchanges = [];

  for(let i=0; i<=99; i++){
    const exchange = json.markets[i].exchange_id;
    exchanges.push(exchange);
  }

  var uniqueExchanges = getUnique(exchanges);
  var sliceExchanges = uniqueExchanges.values();

  for (const value of sliceExchanges) {
    const filterExchange = value;
    const displayExchange = document.querySelector('.js-exchange');
    displayExchange.innerHTML += `<p id="${filterExchange}" class="o-filter--exchange" href="">${filterExchange}</p>`;
  }
}

const dayNightToggle = function(){
  var element = document.getElementById("js-dot");

  element.addEventListener("click", () =>{
    if(document.getElementById("js-toggle").className =='is-night'){
      document.getElementById("js-toggle").classList.remove('is-night')
      document.getElementById("js-dayNight").src = "/svg/dark.svg";
    }
    else{
      document.getElementById("js-toggle").classList.add('is-night');
      document.getElementById("js-dayNight").src = "/svg/light.svg";
    }
  });
}

var modal = document.getElementById("myModal");
var modalContent = document.getElementById("modal-content");

function modalDetail(singleCard){
  var id = singleCard.id;
  var price = singleCard.dataset.price;
  var symbol = singleCard.dataset.symbol;
  var status = singleCard.dataset.status;
  var create = singleCard.dataset.created;
  var created = create.slice(0,-9);
  var update = singleCard.dataset.updated;
  var updated = create.slice(0,-9);
  var chang = singleCard.dataset.change;
  var change = chang.slice(0,-8);
  var unconverted = singleCard.dataset.unconverted;
  var volume = singleCard.dataset.volume;
  var iconName = singleCard.dataset.base;
  var exchange = singleCard.dataset.exchange;
  modal.style.display = "block";
  
  displaySingleCard(id,price,symbol,status,created,updated,change,unconverted,volume,iconName,exchange);

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  var span = document.getElementsByClassName("c-close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }
}

function displaySingleCard(id,price,symbol,status,created,updated,change,unconverted,volume,iconName,exchange){
  const cardHTMLString = 
  `<span class="c-close">&times;</span>
  <div class=c-modal-content--header>
  <h1>Exchange: <i>${exchange}</i></h1>
  <h3 id="price">€ ${price}</h3></div>
  <div class="c-modal-content--main">
  <canvas id="myChart"></canvas>
  </div>
  <div class=c-modal-content--footer>
  <div>
  <p><b>Created at: </b><i>${created}</i></p>
  <p><b>Updated at: </b><i>${updated}</i></p>
  <p><b>Status: </b><i>${status}</i></p>
  <p><b>Change 24h: </b><i id="change">${change}</i></p>
  </div>
  <div>
  <img class="c-modal-footer--img" src="./svg/${iconName}.svg" onerror="this.src='./svg/CRYPTO.svg'" />
  </div>
  </div>
   `;
   modalContent.innerHTML = cardHTMLString;

   if(change > 0){
    document.getElementById(`price`).style.color="green";
    document.getElementById(`change`).style.color="green";
  }
  else{
    document.getElementById(`price`).style.color="red";
    document.getElementById(`change`).style.color="red";
  }

  const labels = [
    'Price',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: `${symbol}`,
      backgroundColor: '#284b63',
      hoverBackgroundColor:'#3c6e71',
      hoverBorderColor:'#284b63',
      borderColor: '#3c6e71',
      borderWidth: 2,
      data: [`${price}`],
    }]
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        y: {
          ticks: {
            color: '#3c6e71',
          }
        },
        x: {
          ticks: {
            color: '#3c6e71',
          }
        }
      }
    },
  };

  const myChart = new Chart(document.getElementById("myChart"), config);
}

var mybutton = document.getElementById("js-btn");

window.onscroll = function() {scrollFunction()};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', function() {
	  // getAPI();
    let data = 'response.json';
    handleData(data, verwerkJson);
    handleData(data, exchange);
    handleData(data, maakCard);
    dayNightToggle();
});