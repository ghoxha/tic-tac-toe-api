const {
    storeMove,
    clearStorage,
    numberOfStoredElements,
    initStorage,
    storageKeys,
    storageValues,
    stateOfBoard
} = require('./storage')

const cellsToWin =
    [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ]

const isOdd = (num) => { return num % 2 }

module.exports = {
    isXOrOMove: (ttlNumOfMoves) => {
        return isOdd(ttlNumOfMoves) ? 'o' : 'x'
    },
    checkIfWonGame: async () => {
        const _ = require('lodash')
        const moves = await storageValues()
        const players = await storageKeys()
        let xMoves = []
        let oMoves = []
        for (let i = 0; i < moves.length; i++) {
            const player = players[i].split(':')[0]
            if (player === 'x') {
                xMoves.push(moves[i])
            } else {
                oMoves.push(moves[i])
            }
        }

        let won = false
        let whoWon
        for (let winningMove of cellsToWin) {
            if (_.intersection(winningMove, xMoves).length === 3) {
                won = true
                whoWon = 'x'
                break
            } else if (_.intersection(winningMove, oMoves).length === 3) {
                won = true
                whoWon = 'o'
                break
            }
        }

        return [won, whoWon]
    },
    stateOfBoard: async () => {
        const board = ['_', '_', '_', '_', '_', '_', '_', '_', '_']
        const players = await storageKeys()
        const moves = await storageValues()
        let xMoves = []
        let oMoves = []
        for (let i = 0; i < moves.length; i++) {
            const player = players[i].split(':')[0]
            if (player === 'x') {
                xMoves.push(moves[i])
            } else {
                oMoves.push(moves[i])
            }
        }

        xMoves.forEach((move) => {
            board[move] = 'x'
        })

        oMoves.forEach((move) => {
            board[move] = 'o'
        })

        let str = ''
        board.forEach((move, idx) => {
            str = str + move
            if ((idx + 1) >= 3 && (idx + 1) % 3 === 0) {
                str = str + '\n'
            }
        })
        return str
    }
}