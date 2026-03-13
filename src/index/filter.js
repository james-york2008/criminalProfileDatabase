document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('profileCards')
    const profileCards = Array.from(container.querySelectorAll('.profileCard'))
    
    const threatDropdown = document.getElementById('threatLevel')
    const statusDropdown = document.getElementById('status')

    const applyFilters = function() {
        const threatValue = threatDropdown.value
        const statusValue = statusDropdown.value

        for (let i = 0; i < profileCards.length; i++) {
            const threatMatch = threatValue === 'all' || profileCards[i].dataset.threat === threatValue
            const statusMatch = statusValue === 'all' || profileCards[i].dataset.status === statusValue

            if (threatMatch && statusMatch) {
                profileCards[i].style.display = 'block'
            } else {
                profileCards[i].style.display = 'none'
            }
        }
    }
    threatDropdown.addEventListener('change', applyFilters)
    statusDropdown.addEventListener('change', applyFilters)
})