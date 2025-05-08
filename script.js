// Element selectors
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
const restartBtn = document.querySelector('#restartBtn')
const guessedDisplay = document.getElementById('guessedAge')
const correctDisplay = document.getElementById('correctAge')
const ageDiffDisplay = document.getElementById('ageDiff')
const feedbackMessage = document.getElementById('feedbackMessage')

// Game state variables
let currentRound = 1
const numberOfRounds = 30
let correctAge = 0
let totalError = 0
let usedIndices = []

// Load first image and round info
window.addEventListener('load', () => {
    currentRoundNum.textContent = currentRound
    totalRoundNum.textContent = numberOfRounds
    getRandomImage()
})

// Update slider value display
slider.addEventListener('input', (e) => {
    age.textContent = e.target.value
})

// Pick a random image without repeating
function getRandomImage() {
    if (usedIndices.length >= images.length) usedIndices = []

    let randomIndex
    do {
        randomIndex = Math.floor(Math.random() * images.length)
    } while (usedIndices.includes(randomIndex))

    usedIndices.push(randomIndex)
    const selected = images[randomIndex]

    mainImage.src = 'assets/' + selected.image + '.jpg'
    correctAge = selected.age
}

// Show result popup
function showPopup(guessed, correct) {
    guessedDisplay.textContent = guessed
    correctDisplay.textContent = correct
    ageDiffDisplay.textContent = Math.abs(guessed - correct)
    popup.classList.remove('hidden')
}

// Go to next round or finish
function nextRound() {
    const guessed = parseInt(slider.value)
    offYears.textContent = calculateAverageError(guessed, correctAge).toFixed(2)

    if (currentRound < numberOfRounds) {
        currentRound++
        currentRoundNum.textContent = currentRound
        getRandomImage()
    } else {
        finishGame()
    }
}

// Finish the game and show results
function finishGame() {
    box.classList.add('hidden')
    finishedWindow.classList.remove('hidden')
    averageError.textContent = calculateAverageError().toFixed(2)

    const average = (totalError / numberOfRounds).toFixed(1)
    let feedback = ''

    if (average <= 2) {
        feedback = '"Aad baad u fiicantay! Si fiican ayaad u qiyaastay 🤩."'
    } else if (average <= 5) {
        feedback = '"Qiyaas fiican! Waad dhawday 🙂."'
    } else {
        feedback =
            '"Waxaad isku dayday, laakiin waxad u baahan tahay muraayado 🤓."'
    }

    feedbackMessage.textContent = feedback
}

// Track and calculate average error
function calculateAverageError(guessed, correct) {
    if (guessed !== undefined && correct !== undefined) {
        const error = Math.abs(guessed - correct)
        totalError += error
    }
    return totalError / numberOfRounds
}

// Reset the entire game
function resetGame() {
    currentRound = 1
    totalError = 0
    usedIndices = []

    slider.value = 50
    age.textContent = 50
    offYears.textContent = ''
    averageError.textContent = ''
    currentRoundNum.textContent = currentRound
    totalRoundNum.textContent = numberOfRounds

    popup.classList.add('hidden')
    finishedWindow.classList.add('hidden')
    box.classList.remove('hidden')

    getRandomImage()
}

// Event listeners
resultBtn.addEventListener('click', () => showPopup(slider.value, correctAge))
popupOkButton.addEventListener('click', () => {
    nextRound()
    popup.classList.add('hidden')
})
restartBtn.addEventListener('click', resetGame)
