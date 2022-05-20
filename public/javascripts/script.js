//Materilaze JQuery 
$(document).ready(function () {
  $(".sidenav").sidenav();
  $('#sidenav-1').sidenav({ edge: 'left' });
  $('.tooltipped').tooltip();
  $('select').formSelect();
  $('.modal').modal();
});


async function grabData() {
  const res = await axios.get('/grabExpenseData')
  const expense = await res.data
  const section = document.getElementById('section')
  const canvas = document.getElementById('myChart').getContext('2d');
  let chartObj = {}
  for (let i = 0; i < expense.length; i++) {
    if(chartObj[expense[i].category]!== undefined){
      chartObj[expense[i].category]+=expense[i].amount
    }else{
      chartObj[expense[i].category]=expense[i].amount
    }
  }
  if(chartObj!==undefined){
    section.classList.remove('hide')
  }
  const myChart = new Chart(canvas, {
    type: 'bar',
    data: {//
      labels: Object.keys(chartObj),
      datasets:[
        {
          label:'Expense Distribution',
          data: Object.values(chartObj),
        }
      ]
    },
    
    options: {
      plugins:{
        legend:{
          labels:{
            font:{
              
            }
          }
        }
      },
      indexAxis: 'y',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',  // Bar 1
        'rgba(54, 162, 235, 0.2)',  // Bar 2
        'rgba(255, 206, 86, 0.2)',  // Bar 3
        'rgba(75, 192, 192, 0.2)',  // Bar 4
        'rgba(153, 102, 255, 0.2)', // Bar 5
        'rgba(8, 8, 38, 0.8)',   // Bar 6
        'rgba(42, 43, 173, 0.2)',   // Bar 6
        'rgba(129, 213, 35, 0.2)',   // Bar 6
    ],
    borderWidth: 2,
    borderColor: 'black'
    }
  });
  
}

grabData()
