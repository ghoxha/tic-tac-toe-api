## Tic Tac Toe API
### Intro
To run this app, just run 
`npm install`
and `node index.js`

For this game, think of the tic tac toe as a 1D array that looks like   
[0,1,2  
 3,4,5  
 6,7,8]  
 
So if, for example the x user plays 0, the board will look like  
[x, ,  
 , ,  
 , , ]   

There are two endpoints to be called:
`http://localhost:3000/create-game?initial_move=5`, where initial 
move is the first move for the x player. Everytime this end point is called,
the game is reset, and the local storage is wiped, so a new game begins.

`http://localhost:3000/make-move?move=7` This endpoint is used for every subsequent
move in the game, alternating between x and o. Whenever a winning move is made, the API
informs the user and the local storage is wiped.
Both endpoints return an image of the current state of the board.
 

  