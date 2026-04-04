import { loadCriminals } from "../global/fetchCharacters.js"

document.addEventListener('DOMContentLoaded', async() => {
    const parameters = new URLSearchParams(window.location.search)
    const id = parameters.get('id')

    const characters = await loadCriminals()
    const character = characters.find(character => character.id === id)

    if (!character) {
        document.body.innerHTML = `<h1>Character not found</h1>`
        return
    }

    document.addEventListener('error', (event) => {
        if (event.target.tagName.toLowerCase() !== "img") {
            return
        }

        event.target.classList.add('errorImage')
        event.target.onerror = null
        event.target.src = `images/redacted.png`
        event.target.alt = `Clearance level not met. Image redacted`
    }, true)

    function renderCharacter(character) {
        document.title = `${character.name}`

        document.getElementById('profileName').textContent = character.name

        document.getElementById('profileAlias').textContent = character.alias

        document.getElementById('profileAge').textContent = character.age

        document.getElementById('profileHeight').textContent = character.height

        document.getElementById('profileWeight').textContent = character.weight

        document.getElementById('profileDescription').textContent = character.description

        const image = document.getElementById('profileImage')
        image.src = `images/${character.id}/${character.id}.png`
        image.alt = `Image of ${character.name}`

        const associatesList = document.getElementById('associatesList')
        character.knownAssociates.forEach(associate => {
            const id = associate.replace(' ', '-').toLowerCase()
            const li = document.createElement('li')

            if (associate === 'REDACTED') {
                li.innerHTML = `<span class="redacted">REDACTED</span>`
            } else {
                li.innerHTML = `<a href="profilePage.html?id=${id}">${associate}</a>`
            }
            associatesList.appendChild(li)
        })

        const criminalRecordList = document.getElementById('criminalRecordList')
        character.criminalRecord.forEach(incident => {
            const li = document.createElement('li')
            li.innerHTML = `<a href="caseFilePage.html?id=${character.id}&case=${incident.caseNumber}">${incident.charge}</a>`
            criminalRecordList.appendChild(li)
        })

        const caseFilesList = document.getElementById('caseFiles')
        
        character.caseFiles.forEach(caseFile => {
            const article = document.createElement('article')

            article.innerHTML = `
            <a href="caseFilePage.html?id=${character.id}&case=${caseFile.caseNumber}" aria-label="View the ${caseFile.title} case file">
                <img src="images/${character.id}/${caseFile.caseNumber}.png" alt="${caseFile.title} case photo" loading="lazy">
                <h3>${caseFile.title}</h3>
            </a>
            `
            caseFilesList.appendChild(article)
        })
    }

    renderCharacter(character)
})