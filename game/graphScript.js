
// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(drawCharts);

google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);


QTD_TURNOS = 30




let player1Score = 1
let player2Score = 2

// let ar = []

// for (let i = 0; i < QTD_TURNOS; i++){
//     ar.push([i, player1Score, player2Score]);
// }


// function drawCharts() {

//     let randomLineData = [
//     ['Turno', 'Player1', 'Player2']
//     ];

//     function createData() {

//         let ar = [];

//         for (let i = 0; i < QTD_TURNOS; i++) {
//             ar.push([i, player1Score, player2Score]);
//         }
        
//         return ar;
//     }

//     for (var x = 0; x < 7; x++) {
//         var newYear = createData();
//         for (var n = 0; n < 12; n++) {
//           randomLineData.push(newYear.shift());
//         }
//     }

//     let lineOptions = {
//         backgroundColor: 'transparent',
//         colors: ['cornflowerblue', 'tomato'],
//         fontName: 'Open Sans',
//         focusTarget: 'category',
//         chartArea: {
//             left: 50,
//             top: 10,
//             width: '100%',
//             height: '70%'
//         },
//         hAxis: {
//             //showTextEvery: 12,
//             textStyle: {
//             fontSize: 11
//             },
//             baselineColor: 'transparent',
//             gridlines: {
//             color: 'transparent'
//             }
//         },
//         vAxis: {
//             minValue: 0,
//             maxValue: 5,
//             baselineColor: '#DDD',
//             gridlines: {
//             color: '#DDD',
//             count: 4
//             },
//             textStyle: {
//             fontSize: 10
//             }
//         },
//         legend: {
//             position: 'bottom',
//             textStyle: {
//             fontSize: 12
//             }
//         },
//         animation: {
//             duration: 1200,
//             easing: 'out',
//                 startup: true
//         }
//         };
    

//     let lineData = google.visualization.arrayToDataTable(randomLineData);

//     let lineChart = new google.visualization.LineChart(document.getElementById('line-chart'));

//     lineChart.draw(lineData, lineOptions);

// }




// while(true){
    
// }

function putData (turno, player1Score, player2Score){
  ar.push([turno, player1Score, player2Score]);

}

let ar = [
    ['Year', 'player1', 'player2'],
]


reloadAr()

function reloadAr (){
    for (let i = 0; i< QTD_TURNOS;i++) {
        ar.push ([i, 100+i,100-i])
    }
}

function drawChart() {

    let data = google.visualization.arrayToDataTable(ar);
  
    let options = {
      title: 'Número de peças',
      curveType: 'function',
      legend: { position: 'bottom' }
    };
  
    let chart = new google.visualization.LineChart(document.getElementById('line-chart'));
  
    chart.draw(data, options);
}


