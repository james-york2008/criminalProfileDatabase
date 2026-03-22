document.addEventListener('DOMContentLoaded', function() {
    let btn = document.getElementById('dropdownButton')
    let navList = document.getElementById('navList')

    btn.addEventListener('click', function() {   
        navList.classList.toggle('d-none')
        navList.classList.toggle('d-show')

        const expanded = btn-this.getAttribute('aria-expanded') === 'true'
        btn.setAttribute('aria-expanded', !expanded)
    })
})