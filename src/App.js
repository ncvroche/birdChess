// "npm run start" to start on local webstie

import './App.css';
import { useEffect, useState } from 'react'
import Piece from './Components/piece.js'
import Captured from './Components/captured.js';


function App() {

  const [spaces, setSpaces] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [potentialSpaces, setPotentialSpaces] = useState([])
  const [whiteCapturedBirds, setWhiteCapturedBirds] = useState([])
  const [blackCapturedBirds, setBlackCapturedBirds] = useState([])
  const [colorTurn, setcolorTurn] = useState(null)
  const [currentTurn, setCurrentTurn] = useState(0)
  const [winner, setWinner] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const pawnImg = "/img/pawn.png"
  const rookImg = "/img/rook.png"
  const knightImg = "/img/knight.png"
  const queenImg = "/img/queen.png"
  const kingImg = "/img/king.png"
  const bishopImg = "/img/bishop.png"

  //Initialize array
  const startGame = () => {
    setIsOpen(false)
    setWinner(null)
    setcolorTurn('white')
    setWhiteCapturedBirds([])
    setBlackCapturedBirds([])
    colorTurn==='white'?setcolorTurn('black'):setcolorTurn('white')
    setCurrentTurn(0)
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
    for (var i=0; i <= 31; i++) {
      gamestate=[...gamestate,{
        "piece":"blank",
        "src":"none",
        "color":"none",
        "col":((i%8)+1),
        "row":(Math.floor(i/8)+3)}]
    }
    for (var i=1; i <= 8; i++) {
      gamestate=[...gamestate,{
        "piece":"pawn",
        "src":pawnImg,
        "color":"white",
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
    gamestate=gamestate.map((space) => ({...space, id:Math.random()}))
    setSpaces(gamestate)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const handleChoiceTwo = () => {
    // if not a space it can go, don't let them go there
    if (!itemInArray(choiceTwo.id,potentialSpaces)) {
      resetTurn()
      return ""
    }
    const col1=choiceOne.col
    const col2=choiceTwo.col
    const row1=choiceOne.row
    const row2=choiceTwo.row
    var tempSpaces2=[]
    if (choiceOne.color !=='none' && choiceTwo.color !== 'none' && choiceOne.color!==choiceTwo.color) {
      tempSpaces2=spaces.map(space => {
        if ((space.col===col1) && (space.row===row1)) {
          return {...space, "col":col2, "row":row2}
        }
        else if ((space.col===col2) && (space.row===row2)) {
          if (space.color==='white') {
            setWhiteCapturedBirds([...whiteCapturedBirds,space])
          } else {
            setBlackCapturedBirds([...blackCapturedBirds,space])
          }
          return {...space, "col":col1, "row":row1, "piece":"blank", "src":"none", "color":"none"}
        }
        else {
          return {...space}
        }
    })} else {
      // otherwise swap the spaces
      tempSpaces2=spaces.map(space => {
        if ((space.col===col1) && (space.row===row1)) {
          return {...space, "col":col2, "row":row2}
        }
        else if ((space.col===col2) && (space.row===row2)) {
          return {...space, "col":col1, "row":row1}
        }
        else {
          return {...space}
        }
      })
    }
    
    //after swapping spaces, reorder the array so they actually move
    tempSpaces2.sort((a,b) => {
      if (a.row<b.row) {
          return -1
      } else if (a.row>b.row) {
        return 1
      } else if (a.col<b.col) {
        return -1
      } else if (a.col>b.col) {
        return 1
      } else {
        return 0
      }
    })
    setSpaces(tempSpaces2) // sets the spaces
    if (choiceTwo.piece==='king') {
      setWinner(choiceOne.color)
      setIsOpen(true)
    }
    resetTurn() //reset all our vars
    swapTurn() //switch sides
    setCurrentTurn(currentTurn+1)
  }

  //determine our potential spaces
  const handleChoiceOne = () => {
    var redSpaces=[]
    var potentialSpace=[]
    const color=choiceOne.color
    const oppColor=(color==='white')?'black':'white'
    const colorDirection=(color==='white')?-1:1

    //check that it is the right color 
    if (color!==colorTurn) {
      resetTurn()
      return ""
    }

    //pawn handling
    if (choiceOne.piece==='pawn') {
      if ((choiceOne.row===2 && choiceOne.color==='black')||(choiceOne.row===7 && choiceOne.color==='white')) {
        potentialSpace=getObjFromCoords((choiceOne.col),(choiceOne.row+(colorDirection*2)))
        if (potentialSpace.color==='none') {
          redSpaces=[...redSpaces, potentialSpace.id]
        }

      }
      potentialSpace=getObjFromCoords((choiceOne.col-1),(choiceOne.row+colorDirection))
      if (potentialSpace.color===oppColor) {
        redSpaces=[...redSpaces, potentialSpace.id]
      }
      potentialSpace=getObjFromCoords((choiceOne.col+1),(choiceOne.row+colorDirection))
      if (potentialSpace.color===oppColor) {
        redSpaces=[...redSpaces, potentialSpace.id]
      }
      potentialSpace=getObjFromCoords((choiceOne.col),(choiceOne.row+colorDirection))
      if (potentialSpace.color==='none') {
        redSpaces=[...redSpaces,potentialSpace.id]
      }

    //rook handling
    } else if (choiceOne.piece==='rook') {
      redSpaces=potentialSpacesAlg([1,0,-1,0],[0,1,0,-1],color,"")  

    // knight handling
    } else if (choiceOne.piece==='knight') {
      potentialSpace=getObjFromCoords(choiceOne.col-1,choiceOne.row-2)
      if (potentialSpace.color!==color) redSpaces=[...redSpaces, potentialSpace.id]
      potentialSpace=getObjFromCoords(choiceOne.col-1,choiceOne.row+2)
      if (potentialSpace.color!==color) redSpaces=[...redSpaces, potentialSpace.id]
      potentialSpace=getObjFromCoords(choiceOne.col-2,choiceOne.row-1)
      if (potentialSpace.color!==color) redSpaces=[...redSpaces, potentialSpace.id]
      potentialSpace=getObjFromCoords(choiceOne.col-2,choiceOne.row+1)
      if (potentialSpace.color!==color) redSpaces=[...redSpaces, potentialSpace.id]
      potentialSpace=getObjFromCoords(choiceOne.col+1,choiceOne.row+2)
      if (potentialSpace.color!==color) redSpaces=[...redSpaces, potentialSpace.id]
      potentialSpace=getObjFromCoords(choiceOne.col+1,choiceOne.row-2)
      if (potentialSpace.color!==color) redSpaces=[...redSpaces, potentialSpace.id]
      potentialSpace=getObjFromCoords(choiceOne.col+2,choiceOne.row+1)
      if (potentialSpace.color!==color) redSpaces=[...redSpaces, potentialSpace.id]
      potentialSpace=getObjFromCoords(choiceOne.col+2,choiceOne.row-1)
      if (potentialSpace.color!==color) redSpaces=[...redSpaces, potentialSpace.id]

    //bishop handling
    } else if (choiceOne.piece === 'bishop') {
      redSpaces=potentialSpacesAlg([1,1,-1,-1],[1,-1,1,-1],color,"")
    
    //queen handling
    } else if (choiceOne.piece === 'queen') {
      redSpaces=potentialSpacesAlg([1,1,-1,-1,1,0,-1,0],[1,-1,1,-1,0,1,0,-1],color,"")

    //king handling
    } else if (choiceOne.piece === 'king') {
      redSpaces=potentialSpacesAlg([1,1,-1,-1,1,0,-1,0],[1,-1,1,-1,0,1,0,-1],color,1)
    }
    setPotentialSpaces(redSpaces)
  }

  // function for calculating potential spaces for some of the tricky pieces
  function potentialSpacesAlg(rowconstarr,colconstarr,color,maxSpaces) {
    var colconst=""
    var rowconst=""
    var potentialSpace=[]
    var redSpaces=[]
    for (var direction=0; direction < rowconstarr.length; direction=direction+1) {
        colconst=colconstarr[direction]
        rowconst=rowconstarr[direction]
      var keeplooking=true
      var i=0
      while (keeplooking) {
        i++
        if (i===maxSpaces) keeplooking=false
        potentialSpace=getObjFromCoords((choiceOne.col+(i*colconst)),(choiceOne.row+(i*rowconst)))
        if (!potentialSpace) {keeplooking=false}
        else if (potentialSpace.piece !== 'blank') {
          if (potentialSpace.color===color) {
            keeplooking=false
          } else {
            redSpaces=[...redSpaces,potentialSpace.id]
            keeplooking=false
          }
        } else {
          redSpaces=[...redSpaces,potentialSpace.id]
        }
      }
    }
    return redSpaces
  }

  //gets an ID from the coords (returns null if there is nothing)
  function getObjFromCoords(col,row) {
    if (col < 1 || row < 1 || col > 8 || row > 8) return "" // returns null if outside bounds
    const number=((row - 1)*8+(col))-1
    if (number > 63 || number < 0) return "" // returns null if not posible
    return spaces[number]
  }

  //handle choice
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      handleChoiceTwo()
    }
    if (choiceOne && !choiceTwo) {
      handleChoiceOne()
    }
  })

  //reset variables that should be reset after each move
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setPotentialSpaces([])
  }

  function swapTurn() {
    if (colorTurn==='white') {
      setcolorTurn('black')
    } else {
      setcolorTurn('white')
    }

  }

  //determines if item is in the array
  function itemInArray(item,arr) {
    for (var i=0; i<=arr.length; i++) {
      if (arr[i]===item) return true
    }
    return false
  }


  return (
    <div className="App">
      <div className={`winnerModal ${(isOpen?'openModule':'closedModule')}`}>
        <div>
          <img src='/img/eagle.jpg' className='eagleWinner'></img>
          <p>{`You're a winner baby! (${(winner)})`}</p>
        </div>
      </div>
      {/*console.log("spaces")*/}
      {console.log(spaces)}
      {/*console.log("potentialSpaces")*/}
      {/*console.log(potentialSpaces)*/}
      {console.log("blackbirds captured")}
      {console.log(blackCapturedBirds)}
      {console.log("whitebirds captured")}
      {console.log(whiteCapturedBirds)}
      <h1 className='birdChess'>Bird Chess</h1>
      <div className='buttonWrapper'><button onClick={startGame} className='button'>New Game</button></div>
      <div className={`turnCounterHolder ${(colorTurn?'':'hidden')}`}>
        <div className='turnCounter'>
          {`Turn ${(currentTurn)}`}
        </div>
        <div className='turnColor'>
          {`It is ${(colorTurn)}'s turn`}
        </div>
      </div>
      <div className='everythingHolder'>
        <img 
          className='chessboard'
          src="/img/chessboard.jpg"
          alt="chessboard"
        />
        <div className='chessGrid'>
          {spaces.map (space => (
            <Piece 
              space={space}
              handleChoice={handleChoice}
              choiceOne={choiceOne}
              redSpaces={potentialSpaces}
            />
          ))}
        </div>
        <div className='pieceHolder'>
          <div className='pieceHolderdrawing'>
            <div className='blackSide holderside'>
              <div className='pieceGrid'>
                {whiteCapturedBirds.map (piece => (
                  <Captured
                  space={piece}
                  />
                ))}
              </div>
            </div>
            <div className='whiteSide holderside'>
              <div className='pieceGrid'>
                {blackCapturedBirds.map (piece => (
                  <Captured
                  space={piece}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
