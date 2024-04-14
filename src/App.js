// "npm run start" to start on local webstie

import './App.css';
import { useEffect, useState } from 'react'
import Piece from './Components/piece.js'


function App() {

  const [spaces, setSpaces] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const pawnImg = "/img/pawn.png"
  const rookImg = "/img/rook.png"
  const knightImg = "/img/knight.png"
  const queenImg = "/img/queen.png"
  const kingImg = "/img/king.png"
  const bishopImg = "/img/bishop.png"

  const startGame = () => {
    var gamestate=[]
    gamestate=[...gamestate,
      {
        "piece":"rook",
        "src":rookImg,
        "color":"black",
        "col":1,
        "row":1
      },
      {
        "piece":"knight",
        "src":knightImg,
        "color":"black",
        "col":2,
        "row":1
      },
      {
        "piece":"bishop",
        "src":bishopImg,
        "color":"black",
        "col":3,
        "row":1
      },
      {
        "piece":"queen",
        "src":queenImg,
        "color":"black",
        "col":4,
        "row":1
      },
      {
        "piece":"king",
        "src":kingImg,
        "color":"black",
        "col":5,
        "row":1
      },
      {
        "piece":"bishop",
        "src":bishopImg,
        "color":"black",
        "col":6,
        "row":1
      },
      {
        "piece":"knight",
        "src":knightImg,
        "color":"black",
        "col":7,
        "row":1
      },
      {
        "piece":"rook",
        "src":rookImg,
        "color":"black",
        "col":8,
        "row":1
      }
    ]
    for (var i=1; i <= 8; i++) {
      gamestate=[...gamestate,{
        "piece":"pawn",
        "src":pawnImg,
        "color":"black",
        "col":i,
        "row":2}]
    }
    for (var i=1; i <= 32; i++) {
      gamestate=[...gamestate,{
        "piece":"blank",
        "src":"none",
        "color":"none",
        "col":((i%8)+1),
        "row":(Math.floor(i/8)+1)}]
    }
    for (var i=1; i <= 8; i++) {
      gamestate=[...gamestate,{
        "piece":"pawn",
        "src":pawnImg,
        "color":"none",
        "col":i,
        "row":7}]
    }
    gamestate=[...gamestate,
      {
        "piece":"rook",
        "src":rookImg,
        "color":"white",
        "col":1,
        "row":8
      },
      {
        "piece":"knight",
        "src":knightImg,
        "color":"white",
        "col":2,
        "row":8
      },
      {
        "piece":"bishop",
        "src":bishopImg,
        "color":"white",
        "col":3,
        "row":8
      },
      {
        "piece":"queen",
        "src":queenImg,
        "color":"white",
        "col":4,
        "row":8
      },
      {
        "piece":"king",
        "src":kingImg,
        "color":"white",
        "col":5,
        "row":8
      },
      {
        "piece":"bishop",
        "src":bishopImg,
        "color":"white",
        "col":6,
        "row":8
      },
      {
        "piece":"knight",
        "src":knightImg,
        "color":"white",
        "col":7,
        "row":8
      },
      {
        "piece":"rook",
        "src":rookImg,
        "color":"white",
        "col":8,
        "row":8
      }
    ]
    setSpaces(gamestate)
  }

  const refreshBoard = () => {
    const tempSpaces=[...spaces]
    tempSpaces.sort((a,b) => {
      if (a.row>b.row) {
         return a
      } else if (a.row<b.row) {
        return b
      } else if (a.col>b.col) {
        return a
      } else {
        return b
      }
  })
  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const swapPosition = (space1, space2) => {
    var row1 = space1.row
    var col1 = space1.col
    space1.row=space2.row
    space1.col=space2.col
    space2.row=row1
    space2.col=col1
    refreshBoard()
  }

  //compare 2 spaces
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      var row1 = space1.row
      var col1 = space1.col
      setSpaces(prevSpace => {
      })
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src===choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  console.log(spaces)

  return (
    <div className="App">
      <h1>Bird Chess</h1>
      <div className='buttonWrapper'><button onClick={startGame}>New Game</button></div>
      <img 
        className='chessboard'
        src="/img/chessboard.jpg"
        alt="chessboard"
      />
      <div className='chessGrid'>
        {spaces.map (space => (
            <Piece 
              piece={space.piece}
              src={space.src}
              color={space.color}
              col={space.col}
              row={space.row}
              handleChoice={handleChoice}
            />
        ))}
      </div>
    </div>
  );
}

export default App;
