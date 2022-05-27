const amount = document.getElementById('amount')
const total = document.getElementById('total')
const taxRate = document.getElementById('taxRate')
const subtotal = document.getElementById('subtotal')
let number;
amount.addEventListener('input',updateSubTotal)
taxRate.addEventListener('change',updateTax)
function updateSubTotal(e){
  number = Number(e.target.value)
  subtotal.textContent = number
}

function updateTax(e){
  const tax = document.getElementById('tax')
  let taxVal = Number(e.target.value)
  tax.textContent = taxVal*number
  total.textContent = number+(taxVal*number)
}


