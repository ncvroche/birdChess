import "./captured.css"

export default function captured({space}) {

    return(
        <div className='space'>
            {space.src !== "none" ? <img src={space.src} alt='piece' className='chesspiece'/> : <img />}
        </div>
    )
}