import "./piece.css"

export default function piece({piece, src, color, col, row}){

    return(
        <div className='space'>
            {src != "none"?<img src={src} alt='piece' className='chesspiece'/>:<div/>}
        </div>
    )
}