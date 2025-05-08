// DOM Elements
const box = document.querySelector('.box')
const age = document.querySelector('.age')
const slider = document.querySelector('.slider')
const currentRoundNum = document.querySelector('.round-number')
const totalRoundNum = document.querySelector('.total-round')
const mainImage = document.querySelector('.image')
const offYears = document.querySelector('.off-years')
const popup = document.getElementById('popupContainer')
const popupOkButton = document.getElementById('popupOkButton')
const resultBtn = document.getElementById('result-btn')
const finishedWindow = document.querySelector('.finished-window')
const averageError = document.getElementById('averageError')
const restartBtn = document.getElementById('restartBtn')

// Game state variables
let currentRound = 1
const numberOfRounds = 10
let correctAge
let totalError = 0

// Initialize the game on page load
window.addEventListener('load', () => {
    currentRoundNum.innerText = currentRound
    totalRoundNum.innerText = numberOfRounds
    getRandomImage()
})

// Update age display on slider change
slider.addEventListener('input', (e) => {
    age.innerText = e.target.value
})

// Fetch a random image and update correctAge
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length)
    const selected = images[randomIndex]
    correctAge = selected.age
    mainImage.src = selected.image
}

// Show result pop-up with guessed and actual age
function showPopup(guessed, correct) {
    document.getElementById('guessedAge').innerText = guessed
    document.getElementById('correctAge').innerText = correct
    document.getElementById('ageDiff').innerText = Math.abs(guessed - correct)
    popup.classList.remove('hidden')
}

// Proceed to the next round or finish the game
function nextRound() {
    const guessed = parseInt(slider.value)

    offYears.innerText = calculateAverageError(guessed, correctAge).toFixed(2)

    if (currentRound < numberOfRounds) {
        currentRound++
        currentRoundNum.innerText = currentRound
        getRandomImage()
    } else {
        finishGame()
    }
}

// Final results and feedback display
function finishGame() {
    box.classList.add('hidden')
    finishedWindow.classList.remove('hidden')
    averageError.innerText = calculateAverageError().toFixed(2)

    const average = (totalError / numberOfRounds).toFixed(1)
    let feedback = ''

    if (average <= 2) {
        feedback = '"Aad baad u fiicantay! Si fiican ayaad u qiyaastay 🤩."'
    } else if (average <= 5) {
        feedback = '"Qiyaas fiican! Waad dhawday 🙂."'
    } else {
        feedback =
            '"Waad isku dayday, laakiin waxay u baahan tahay muraayado 🤓."'
    }

    document.getElementById('feedbackMessage').innerText = feedback
}

// Calculate average error (can update running total or just return final avg)
function calculateAverageError(guessed, correct) {
    if (guessed !== undefined && correct !== undefined) {
        const error = Math.abs(guessed - correct)
        totalError += error
    }
    return totalError / numberOfRounds
}

// Event: Show result pop-up
resultBtn.addEventListener('click', () => {
    showPopup(parseInt(slider.value), correctAge)
})

// Event: Continue to next round
popupOkButton.addEventListener('click', () => {
    nextRound()
    popup.classList.add('hidden')
})

// Event: Restart the game
restartBtn.addEventListener('click', () => {
    window.location.reload()
})
