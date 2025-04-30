const age = document.querySelector('.age')
const slider = document.querySelector('.slider')
const currentRoundNum = document.querySelector('.round-number')
const totalRoundNum = document.querySelector('.total-round')

let currentRound = 1
let numberOfRounds = 10

window.addEventListener('load', () => {
    currentRoundNum.innerHTML = currentRound
    totalRoundNum.innerHTML = numberOfRounds
})

slider.addEventListener('input', (e) => {
    age.innerHTML = e.target.value
    console.log(e)
})
