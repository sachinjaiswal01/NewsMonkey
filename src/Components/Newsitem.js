import React from 'react'

const Newsitem =(props)=> {
    let {title,description,imageUrl,newsUrl,author,date,source}=props;
    return (
      <div className="container my-3">
        <div className="card">
          <img className="card-img-top" src={!imageUrl?"https://wealthfirst.co.in/wp-content/plugins/blog-designer-pro/public/images/No_available_deport.gif":imageUrl} alt="Card img cap"/>
          <div className="card-body">
            <h5 className="card-title">{title}...<span className="badge bg-secondary rounded-pill ">{source}</span></h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary text-danger  fst-italic">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-primary ">Read more..</a>
          </div>
        </div>
      </div>
    )
}
export default Newsitem;