import React,{useEffect,useState} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
  const [articles, setArticles] = useState([0])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

 const updateNews= async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=30eaa75b36684fd4b32a6a46123bf09d&page=${page}&pageSize=${props.pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(parsedData.loading)
    props.setProgress(100);
  }
   
  useEffect(() => {
    document.title = `NewsMonkey-${capitalizeFirstLetter(props.category)}`;    //like Fevicon
    updateNews();
    // eslint-disable-next-line padded-blocks 
  })
  
 const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=30eaa75b36684fd4b32a6a46123bf09d&page=${page+1}&pageSize=${props.pagesize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  };

    return (
      <>
        <div className="container my-3">
          <h2 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>
          NewsMonkey-Top {capitalizeFirstLetter(props.category)}{" "}
            headlines
          </h2>
          {loading &&<Spinner />}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length!==totalResults}
            loader={<Spinner/>}
          >
                  <div className="container">
                    <div className="row">
                      {
                        articles.map((element) => {
                          return (
                            <div className="col-md-4 my-2" key={element.url}>
                              <Newsitem
                                title={element.title}
                                description={element.description ? element.description : ""}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                              />
                            </div>
                          );})
                          }
                    </div>
                  </div>
          </InfiniteScroll>
        </div>
      </> 
    );
}

News.defaultProps = {
  country: "in",
  pagesize: 8,
  category: "health",
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};

export default News