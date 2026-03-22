document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const btn = dropdown.querySelector('button')
        const content = dropdown.querySelector('.profileDropdowns')

        btn.addEventListener('click', () => {
            const isOpen = content.classList.toggle('open')
            btn.setAttribute('aria-expanded', isOpen)
        })
    })
})