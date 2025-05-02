const age = document.querySelector('.age')
const slider = document.querySelector('.slider')
const currentRoundNum = document.querySelector('.round-number')
const totalRoundNum = document.querySelector('.total-round')
const mainImage = document.querySelector('.image')
const offYears = document.querySelector('.off-years')
const popup = document.getElementById('popupContainer')
const popupOkButton = document.getElementById('popupOkButton')

let currentRound = 1
let numberOfRounds = 10

window.addEventListener('load', () => {
    currentRoundNum.innerHTML = currentRound
    totalRoundNum.innerHTML = numberOfRounds
    getRandomImage()
})

slider.addEventListener('input', (e) => {
    age.innerHTML = e.target.value
})

const getRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * images.length - 1)
    const image = images[randomNumber].image

    mainImage.src = image
}

function showPopup(guessed, correct) {
    document.getElementById('guessedAge').innerText = guessed
    document.getElementById('correctAge').innerText = correct
    document.getElementById('ageDiff').innerText = Math.abs(guessed - correct)
    popup.classList.remove('hidden')
}

popupOkButton.addEventListener('click', () => popup.classList.add('hidden'))
