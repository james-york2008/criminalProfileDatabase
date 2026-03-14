/*document.addEventListener('DOMContentLoaded', function () {
    async function loadCriminals() {
        const response = await fetch('../../characters.json')
        const data = await response.json()
        return data.criminals
    }

    const container = document.getElementById('profileCards')

    loadCriminals().then(criminals => {
        criminals.forEach(criminal => {
        const article = document.createElement('article')

        article.classList.add('profileCard')
        article.dataset.threat = criminal.wantedStatus
        
            
        })
    })
})

          <div id="profileCards">
                <article class="profileCard" data-threat="3" data-status="mostWanted" data-search="lyra moonshard rift walker">
                    <a href="character-information/lyra.html"><img class="profileImage" src="images/lyra.png" alt="Mugshot of Lyra Moonshard">
                    <h3>Lyra Moonshard</h3></a>
                    <p>Alias: The Rift Walker</p>
                    <p>Threat: Severe Risk</p>
                    <p>Status: Most wanted</p>
                    <a href="character-information/lyra.html" class="button">View Full Report</a>
                </article>

                <article class="profileCard" data-threat="3" data-status="mostWanted" data-search="seraphine emberveil ashen empress">
                    <a href="character-information/seraphine.html"><img class="profileImage" src="images/seraphine.png" alt="Mugshot of Seraphine Emberveil">
                    <h3>Seraphine Emberveil</h3></a>
                    <p>Alias: The Ashen Empress</p>
                    <p>Threat: Severe Threat</p>
                    <p>Status: Most wanted</p>
                    <a href="character-information/seraphine.html" class="button">View Full Report</a>
                </article>
            </div>
        </section>*/