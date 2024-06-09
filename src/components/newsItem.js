import React, { Component } from 'react'

export class newsItem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl} = this.props
    return (
      <div className='my-3'>
        <div className="card" >
            <img src={!imgUrl?"https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg":imgUrl} className="card-img-top" alt="..."/>

            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}..</p>
                <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">Go somewhere</a>
            </div>
        </div>
      </div>
    )
  }
}

export default newsItem
