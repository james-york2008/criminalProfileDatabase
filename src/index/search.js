document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchBar')
    const searchInput = document.getElementById('searchInput')
    const profileCards = document.querySelectorAll('.profileCard')

    const handleChange = function(event) {
        const search = searchInput.value.toLowerCase()

        for (let i = 0; i < profileCards.length; i++) {
            const text = profileCards[i].dataset.search
            
            const match = text.includes(search)

            profileCards[i].style.display = match ? 'block' : 'none'
        }
    }
    searchInput.addEventListener('input', handleChange)
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault()
        handleChange()
    })
})