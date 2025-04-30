const age = document.querySelector('.age')
const slider = document.querySelector('.slider')
const currentRoundNum = document.querySelector('.round-number')
const totalRoundNum = document.querySelector('.total-round')
const mainImage = document.querySelector('.image')

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
