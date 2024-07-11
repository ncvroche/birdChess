import "./piece.css"

export default function piece({space, handleChoice, choiceOne, redSpaces}) {

    const handleClick = () => {
        handleChoice(space)
    } 

    function highlighted(space) {
        if (choiceOne && (choiceOne.id===space.id)) {
            return 'selected'
        } else if (redSpaces) {
            for (var i=0; i <= redSpaces.length-1; i++) {
                //console.log(space.id)
                if (redSpaces[i]===space.id) {
                    if (space.src !== "none") return 'potential'
                    else return 'potentialblank'
                }
            }

        } else return ''
    }

    return(
        <div className='space' onClick={handleClick}>
            {space.src !== "none" ? <img src={space.src} alt='piece' className={`chesspiece ${highlighted(space)}`}/> : <img className={`${highlighted(space)}`}/>}
        </div>
    )
}