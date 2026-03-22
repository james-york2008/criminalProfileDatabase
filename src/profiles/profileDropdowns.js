document.addEventListener('DOMContentLoaded', function () {
    const criminalRecordButton = document.getElementById('criminalRecordButton')
    const criminalRecordContent = document.getElementById('criminalRecordDropdown')

    criminalRecordButton.addEventListener('click', function() {
        criminalRecordContent.classList.toggle('open')
    })

    const knownAssociatesButton = document.getElementById('knownAssociatesButton')
    const knownAssociatesContent = document.getElementById('knownAssociatesDropdown')

    knownAssociatesButton.addEventListener('click', function() {
        knownAssociatesContent.classList.toggle('open')
    })
})