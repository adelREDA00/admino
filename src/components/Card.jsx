import React from 'react'

const Card = () => {
  return (
    <div className="card_container">

    
    <div className="drop">
    <div className="drop__container" id="drop-items">
        <div className="drop__card">
            <div className="drop__data">
                <img src="https://cdn.sportmonks.com/images/soccer/teams/23/407.png" alt="" className="drop__img"/>
                <div>
                    <h1 className="drop__name">Clay</h1>
                    <span className="drop__profession">Web developer</span>
                </div>
            </div>

            <div>
                <a href="#" className="drop__social"><i className='bx bxl-instagram'></i></a>
                <a href="#" className="drop__social"><i className='bx bxl-facebook'></i></a>
                <a href="#" className="drop__social"><i className='bx bxl-twitter'></i></a>
            </div>
        </div>
    </div>
</div>



</div>
  )
}

export default Card