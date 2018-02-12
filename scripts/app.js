var app = new Framework7({
    root: '#app',
    pushState: true,
    swipePanel: 'left',
    material: true,
    materialPreloaderHtml: '<span class="preloader-inner"><span class="preloader-inner-gap"></span><span class="preloader-inner-left"><span class="preloader-inner-half-circle"></span></span><span class="preloader-inner-right"><span class="preloader-inner-half-circle"></span></span></span>',
    cache: true,
    fastClicks: true,
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});
var $$ = Dom7;
/*var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});*/
var mainView = app.views.create('#app');

function showCurrency() {
    app.request.json('http://phisix-api3.appspot.com/stocks.json', function (data) {
        for (var i = 0; i < data.stock.length; i++) {
            var newCell = function (i) {  
                for (j = 0; j < 3; j++) {
                    var cell = document.createElement('td');
                    cell.className = "label-cell";
                    return cell;
                }
                return cell;
            }
            var newRaw = function (i) {
                var raw = document.createElement('tr');
                raw.id = 'raw' + data.stock[i].name.replace(/\s/g, '');
                currencyTable.appendChild(raw);
                for (j = 0; j < 3; j++) {
                    var cell = document.createElement('td');
                    cell.className = "label-cell";
                    cell.id = ('cell_' + j);
                    raw.appendChild(cell);
                }
                raw.cells[0].innerText = data.stock[i].name;
                raw.cells[1].innerText = data.stock[i].volume;
                raw.cells[2].innerText = data.stock[i].price.amount;
            }
            newRaw(i);
        }
    },
        function () {
            console.log('error');
            showCurrency();
  });
}
function updateCurrency() {
    app.request.json('http://phisix-api3.appspot.com/stocks.json', function (data) {
        for (var i = 0; i < data.stock.length; i++) {
            id = 'raw' + data.stock[i].name.replace(/\s/g, '');
            el = document.getElementById(id);
            el.cells[1].innerText = data.stock[i].volume;
            el.cells[2].innerText = data.stock[i].price.amount;
        }
        console.log('updated');
    });
}
showCurrency();

setInterval(updateCurrency, 15000);

update.onclick = function () {
    updateCurrency();
};
