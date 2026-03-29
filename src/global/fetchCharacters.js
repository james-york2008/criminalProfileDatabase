export async function loadCriminals() {
    const response = await fetch('./characters.json')
    const data = await response.json()
    return data.characters
}