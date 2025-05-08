const box = document.querySelector('.box')
const age = document.querySelector('.age')
const slider = document.querySelector('.slider')
const currentRoundNum = document.querySelector('.round-number')
const totalRoundNum = document.querySelector('.total-round')
const mainImage = document.querySelector('.image')
const offYears = document.querySelector('.off-years')
const popup = document.getElementById('popupContainer')
const popupOkButton = document.getElementById('popupOkButton')
const resultBtn = document.querySelector('#result-btn')
const finishedWindow = document.querySelector('.finished-window')
const averageError = document.querySelector('#averageError')

let currentRound = 1
let numberOfRounds = 10

let correctAge
let totalError = 0

window.addEventListener('load', () => {
    currentRoundNum.innerHTML = currentRound
    totalRoundNum.innerHTML = numberOfRounds
    getRandomImage()
})

slider.addEventListener('input', (e) => {
    age.innerHTML = e.target.value
})

const getRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * images.length)
    const image = images[randomNumber].image

    correctAge = images[randomNumber].age

    mainImage.src = image
}

function showPopup(guessed, correct) {
    document.getElementById('guessedAge').innerText = guessed
    document.getElementById('correctAge').innerText = correct
    document.getElementById('ageDiff').innerText = Math.abs(guessed - correct)
    popup.classList.remove('hidden')
}

const nextRound = () => {
    const guessed = parseInt(slider.value)

    offYears.innerHTML = calculateAverageError(guessed, correctAge).toFixed(2)

    if (currentRound < numberOfRounds) {
        currentRound++
        currentRoundNum.innerHTML = currentRound
        getRandomImage()
    } else {
        finished()
    }
}

const finished = () => {
    box.classList.add('hidden')
    finishedWindow.classList.remove('hidden')
    averageError.innerHTML = calculateAverageError().toFixed(2)

    const average = (totalError / numberOfRounds).toFixed(1)

    let feedback = ''
    if (average <= 2) {
        feedback = 'Aad bay u fiicantay! Si fiican ayaad u qiyaastay 🤩.'
    } else if (average <= 5) {
        feedback = 'Qiyaas fiican! Waad dhawday 🙂.'
    } else {
        feedback =
            'Waxaad isku dayday, laakiin waxay u baahan tahay muraayado 🤓.'
    }

    document.getElementById('feedbackMessage').innerText = feedback
}

const calculateAverageError = (guessed, correct) => {
    if (guessed !== undefined && correct !== undefined) {
        const absError = Math.abs(guessed - correct)
        totalError += absError
    }

    return totalError / numberOfRounds
}

resultBtn.addEventListener('click', () => showPopup(slider.value, correctAge))
popupOkButton.addEventListener('click', () => {
    nextRound()
    popup.classList.add('hidden')
})
