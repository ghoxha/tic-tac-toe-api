const express = require('express')
const storage = require('node-persist')
const app = express()
const port = 3000
const {
	store,
	clearStorage,
	numberOfStoredElements,
	initStorage
} = require('./storage')

const {
	checkIfWonGame,
	isXOrOMove,
	stateOfBoard
} = require('./helper')

app.get('/create-game', async (req, res) => {
	const move = parseInt(req.query.initial_move)
	if (!(move >= 0 && move <= 9)) {
		res.send('Please enter a valid move')
		return
	}
	await initStorage()
	await clearStorage()
	await storage.setItem('x:1', move)
	const currentStateOfBoard = await stateOfBoard()

	res.send('Current state of the board' + '\n' + currentStateOfBoard)
})

app.get('/make-move', async (req, res) => {
	const move = parseInt(req.query.move)
	if (!(move >= 0 && move <= 9)) {
		res.send('Please enter a valid move')
		return
	}
	const ttlNumOfMoves = await numberOfStoredElements()
	const XorOMove = isXOrOMove(ttlNumOfMoves)
	await store(XorOMove, ttlNumOfMoves, move)
  	const [wonGame, whoWon] = await checkIfWonGame()
	const currentStateOfBoard = await stateOfBoard()
	if (wonGame) {
		res.send(`You\'ve won (${whoWon}) \n${currentStateOfBoard}`)
		await clearStorage()
	} else {
		res.send(`Current state of the board \n${currentStateOfBoard}`)
	}
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})