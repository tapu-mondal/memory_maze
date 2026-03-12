let board = document.getElementById("board")

let currentImage = ""
let dragItem = null

function showImages() {
    document.getElementById("menu").style.display = "none"
    document.getElementById("images").style.display = "block"
}

function backMenu() {
    document.getElementById("menu").style.display = "block"
    document.getElementById("images").style.display = "none"
}

function startGame(img) {

    currentImage = img

    document.getElementById("images").style.display = "none"
    document.getElementById("game").style.display = "block"

    createPuzzle()

}

function createPuzzle() {

    board.innerHTML = ""

    let size = 100
    let pieces = []

    let id = 0

    for (let y = 0; y < 4; y++) {

        for (let x = 0; x < 4; x++) {

            let piece = document.createElement("div")

            piece.className = "piece"

            piece.style.backgroundImage = `url(${currentImage})`
            piece.style.backgroundPosition = `-${x * size}px -${y * size}px`

            piece.setAttribute("data-id", id)

            piece.draggable = true

            piece.addEventListener("dragstart", dragStart)
            piece.addEventListener("dragover", dragOver)
            piece.addEventListener("drop", drop)

            pieces.push(piece)

            id++

        }

    }

    shuffle(pieces)

    pieces.forEach(p => board.appendChild(p))

}

function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1))

        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp

    }

}

function dragStart() {
    dragItem = this
}

function dragOver(e) {
    e.preventDefault()
}

function drop() {

    let tempImg = this.style.backgroundPosition
    let tempId = this.dataset.id

    this.style.backgroundPosition = dragItem.style.backgroundPosition
    this.dataset.id = dragItem.dataset.id

    dragItem.style.backgroundPosition = tempImg
    dragItem.dataset.id = tempId

    checkWin()

}

function checkWin() {

    let pieces = document.querySelectorAll(".piece")

    let solved = true

    pieces.forEach((p, index) => {

        if (parseInt(p.dataset.id) !== index) {
            solved = false
        }

    })

    if (solved) {

        setTimeout(() => {

            alert("SABBAS, TURU LABB <3 TOR SOB MONE ACHE! ")

        }, 200)

    }

}

function exitGame() {
    location.reload()
}