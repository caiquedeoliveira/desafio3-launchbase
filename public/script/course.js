
const cards = document.querySelectorAll('.card')

for (let card of cards){
    card.addEventListener('click', () => {
        const courseId = card.getAttribute('id')
        window.location.href = `https://rocketseat.com.br/${courseId}`
    })
}