import { loadCriminals } from "../global/fetchCharacters.js"

document.addEventListener('DOMContentLoaded', async() => {
    const parameters = new URLSearchParams(window.location.search)
    const id = parameters.get('id')
    const file = parameters.get('case')

    const characters = await loadCriminals()
    const character = characters.find(character => character.id === id)
    
    if (!character) {
        document.body.innerHTML = `<h1>Character not found</h1>`
        return
    }
    
    const caseFile = character.caseFiles?.find(caseFile => caseFile.caseNumber === file)

    if (!caseFile) {
        document.body.innerHTML = `<h1>ACCESS DENIED<br>Clearance level not met</h1>`
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


    function renderCase() {
        document.title = `${caseFile.title} | iTab Criminal Database`

        document.getElementById('caseName').textContent = caseFile.title

        document.getElementById('metaDataList').innerHTML = `
        <li><strong>Case Number:</strong><br>${caseFile.caseNumber}</li>
        <li><strong>Status:</strong><br><span class="${caseFile.status.toLowerCase()}">${caseFile.status}</span></li>
        <li><strong>Date:</strong><br>${caseFile.date}</li>`

        const image = document.getElementById('caseFileImage')
        image.src = `images/${character.id}/${caseFile.caseNumber}.png`
        image.alt = `Image of the ${caseFile.title}` || caseFile.title

        document.getElementById('eventInfo').innerHTML = `
        <li><strong>Location:</strong><br>${caseFile.location}</li>
        <li><strong>Time:</strong><br>${caseFile.time}</li>
        <li><strong>Witnesses:</strong><br>${caseFile.witnesses}</li>`

        document.getElementById('objectDescription').textContent = caseFile.stolenObjects

        document.getElementById('incidentSummaryText').textContent = caseFile.incidentSummary

        const evidenceList = document.getElementById('keyEvidenceList')
        caseFile.evidence?.forEach(evidence => {
            let li = document.createElement('li')
            li.classList.add('infoListItems')
            li.textContent = evidence
            
            evidenceList.appendChild(li)
        })

        const notesList = document.getElementById('investigatorNotesList')
        caseFile.investigatorNotes?.forEach(note => {
            let li = document.createElement('li')
            li.classList.add('infoListItems')
            li.textContent = note

            notesList.appendChild(li)
        })

        const relatedIncidentsList = document.getElementById('relatedIncidentsList')
        caseFile.relatedIncidents?.forEach(incident => {
            let li = document.createElement('li')
            li.innerHTML = `<a href="caseFilePage.html?id=${incident.relatedCharacter}&case=${incident.caseNumber}">${incident.incidentName}</a>`

            relatedIncidentsList.append(li)
        })

        const backToProfile = document.getElementById('backToProfile')
        backToProfile.href = `profilePage.html?id=${id}`
    }
    
    renderCase()
})