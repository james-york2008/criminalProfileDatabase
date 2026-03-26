import { loadCriminals } from "../global/fetchCharacters.js"

document.addEventListener('DOMContentLoaded', async() => {
    const characters = await loadCriminals()
    const container = document.getElementById('profileCards')

    console.log(characters)
    characters.forEach(character => {
        let article = document.createElement('article')
        article.classList.add('profileCard')

        article.dataset.threat = character.threat
        article.dataset.status = character.status
        article.dataset.search = character.search

        article.innerHTML = `
        <img class="profileImage" src="${character.image}" alt="Mugshot of ${character.name}, also known as ${character.alias}" loading="lazy">
        <h3>${character.name}</h3>
        <p>Alias: ${character.alias}</p>
        <p>Threat: ${character.threatLabel}</p>
        <p>Status: ${character.statusLabel}</p>
        <a href="profilePage.html?id=${character.id}" class="button">View Full Report</a>`
        
        container.append(article)
    })

    const searchInput = document.getElementById('searchInput')
    const threatDropdown = document.getElementById('threatLevel')
    const statusDropdown = document.getElementById('status')

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
        const profileCards = document.querySelectorAll('.profileCard')
            
        profileCards.forEach(card => {
            const matchesSearch = card.dataset.search.toLowerCase().includes(search)
            const matchesThreat = threatValue === 'all' || card.dataset.threat === threatValue
            const matchesStatus = statusValue === 'all' || card.dataset.status === statusValue

            card.classList.toggle('hidden', !(matchesSearch && matchesThreat && matchesStatus))
        })
    }

    const debouncedApplyFilters = debounce(applyFilters, 300)

    searchInput.addEventListener('input', debouncedApplyFilters)
    threatDropdown.addEventListener('change', applyFilters)
    statusDropdown.addEventListener('change', applyFilters)
})