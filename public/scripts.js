
const currentPage = location.pathname
const menuItem = document.querySelectorAll('header .links a')

for (item of menuItem) {
    if(currentPage.includes(item.getAttribute('href')))
        item.classList.add('active')
}

//retorna span estilizado
const trs = document.querySelectorAll('.lines')
let id = 0
for (tr of trs) {
    id = id + 1
    let elements =  document.getElementById(id).textContent.split(',')
    console.log(elements)
    document.getElementById(id).innerHTML = ""
    for (element of elements){
        console.log(document.getElementById(id).innerHTML)
        document.getElementById(id).innerHTML += ` <span>${element}</span>`

    }

}