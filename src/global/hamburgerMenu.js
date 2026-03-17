document.addEventListener('DOMContentLoaded', function() {
    let btn = document.getElementById('dropdownButton')
    let navList = document.getElementById('navList')

    btn.addEventListener('click', function() {   
            if (navList.classList.contains('d-none')) {
                navList.classList.remove('d-none')
                navList.classList.add('d-show')
            } else {
                navList.classList.remove('d-show')
                navList.classList.add('d-none')    
            }
    })
})