import React, {useState,useEffect,useRef} from "react";
import NewsItem from "./newsItem";
import Spinner from "./spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {

  const [articles, setArticles] = useState([]);
  // const[loading,setLoading] = useState(false);
  const[page,setPage] = useState(1);
  const[totalResults,setTotalResults] = useState(0);
  document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonk`



  const updtNews = async()=>{
    props.ref.current.staticStart(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
    // this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    // props.setProgress(30)

    // props.setProgress(70)
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);

    props.ref.current.complete()
  }

  useEffect(()=>{
    updtNews()
  },[])

  const fetchMoreData = async () => {
    setPage(page+1);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}&category=${props.category}`;
    // this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.totalResults);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    // this.setState({
    //   articles: articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   // loading:false
    // });

  };

    // console.log("render");
    return (
      <>
        <h2 className="text-center" style={{margin:'4vh 0'}}>Top Headlines - {props.category.charAt(0).toUpperCase() + props.category.slice(1)}</h2>
        {/* {loading && <Spinner />}  */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

            <div className="row">
            {/* !loading && articles.map((element) Use this to hide current articles while loading new  */}
              {articles.map((element) => {
                return (
                  <div key={element.url} className="col-md-4">
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description ? element.description.slice(0, 88) : ""
                      }
                      newsUrl={element.url}
                      imgUrl={element.urlToImage}
                      author = {element.author ? element.author : "Unknown"}
                      date = {element.publishedAt}
                      source = {element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

      </>
    );
}

News.defaultProps ={
  country : 'in',
  pageSize : 8,
  category : 'general'
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}

export default News;
