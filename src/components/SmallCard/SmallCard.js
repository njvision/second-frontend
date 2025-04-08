import morty from '../../images/morty.png'
import "./SmallCard.css"

function SmallCard () {
    return (
        <div className='small-card'>
            <div className='small-card-image'>
                <img src={morty} alt='Rick Sanchez' />
            </div>
            <div className='small-card-info'>
                <h1 className='card-title'>Rick Sanchez</h1>
                    <ul className='card-details'>
                        <li><span>species: </span><span className='detail'>Human</span></li>
                        <li><span>gender: </span><span className='detail'>Male</span></li>
                        <li><span>status: </span><span className='detail'>Alive</span></li>
                    </ul>
                <div className='card-button'>
                    <a href='/charachter/1'>LEARN MORE</a>
                </div>
            </div>
        </div>
    )
}

export default SmallCard;