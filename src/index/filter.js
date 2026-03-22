document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput')
    const threatDropdown = document.getElementById('threatLevel')
    const statusDropdown = document.getElementById('status')
    const profileCards = document.querySelectorAll('.profileCard')

    const debounce = (fn, delay = 300) => {
        let timeoutId

        return (...args) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                fn.apply(null, args)
            }, delay)
        }
    }

    const applyFilters = function() {
        const search = searchInput.value.toLowerCase()
        const threatValue = threatDropdown.value
        const statusValue = statusDropdown.value

        profileCards.forEach(card => {
            const matchesSearch = card.dataset.search.includes(search)
            const matchesThreat = threatValue === 'all' || card.dataset.threat === threatValue
            const matchesStatus = statusValue === 'all' || card.dataset.status === statusValue

            card.style.display = (matchesSearch && matchesThreat && matchesStatus) ? 'block' : 'none'
        })
    }

    const debouncedApplyFilters = debounce(applyFilters, 300)

    searchInput.addEventListener('input', debouncedApplyFilters)
    threatDropdown.addEventListener('change', applyFilters)
    statusDropdown.addEventListener('change', applyFilters)
})