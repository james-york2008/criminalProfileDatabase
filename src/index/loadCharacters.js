import { loadCriminals } from "../global/fetchCharacters.js"

document.addEventListener('DOMContentLoaded', async() => {
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

    const applyFilters = () => {
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

    const characters = await loadCriminals()
    const container = document.getElementById('profileCards')
    let loadMore = false

    container.addEventListener('error', (event) => {
        if (event.target.tagName.toLowerCase() !== "img") {
            return
        }

        event.target.classList.add('errorImage')
        event.target.onerror = null
        event.target.src = `images/redacted.png`
        event.target.alt = `Clearance level not met. Image redacted`
    }, true)


    const loadCharacters = () => {
        container.innerHTML = ''
        const renderCharacters = loadMore
        ? characters
        : characters.slice(0, 3)

        renderCharacters.forEach(character => {
            let article = document.createElement('article')
            article.classList.add('profileCard')

            article.dataset.threat = character.threat
            article.dataset.status = character.status
            article.dataset.search = character.search

            article.innerHTML = `
            <img class="profileImage" src="images/${character.id}/${character.id}.png" alt="Mugshot of ${character.name}, also known as ${character.alias}" loading="lazy">
            <h3>${character.name}</h3>
            <p>Alias: ${character.alias}</p>
            <p>Threat: ${character.threatLabel}</p>
            <p>Status: ${character.statusLabel}</p>
            <a href="profilePage.html?id=${character.id}" class="button">View Full Report</a>`
            
            container.append(article)
        })

    }

    loadCharacters()
 
    const btn = document.getElementById('seeMoreCharacters')
    btn.addEventListener('click', () => {
        btn.classList.toggle('expanded')
        btn.classList.contains('expanded')  
        ? btn.textContent = 'See fewer characters' 
        : btn.textContent = 'See more characters'

        btn.classList.toggle('expandedSeeMoreCharacters')

        loadMore  
        ? loadMore = false  
        : loadMore = true

        loadCharacters() 
        applyFilters()

    })

})