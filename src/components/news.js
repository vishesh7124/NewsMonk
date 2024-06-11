import React, { Component } from "react";
import NewsItem from "./newsItem";
import Spinner from "./spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class news extends Component {

  static defaultProps ={
    country : 'in',
    pageSize : 8,
    category : 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      // totalArticles:0
    };
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonk`
  }


  async componentDidMount() {
    // console.log("cdm");
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    // this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(30)
    console.log(parsedData.totalResults);
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      totalPage: Math.ceil(this.state.totalResults / this.props.pageSize),
      // loading:false
      });
    this.props.setProgress(100)
  }

  // handlePrev = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}&category=${this.props.category}`;

  //   this.setState({
  //     loading: true
  //   })

  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   // console.log(parsedData.articles)
  //   this.setState({
  //       page: this.state.page - 1,
  //       articles: parsedData.articles,
  //       loading: false
  //     });
  //     console.log(this.state.page);
  // };
  // handleNext = async () => {
    
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}&category=${this.props.category}`;

  //   this.setState({
  //     loading: true
  //   })

  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   // console.log(parsedData.articles)
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading:false
  //   });
  //   console.log(this.state.page);
  // };

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page +1
    })

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    // this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.totalResults);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      totalPage: Math.ceil(this.state.totalResults / this.props.pageSize),
      // loading:false
    });

  };

  render() {
    // console.log("render");
    return (
      <>
        <h2 className="text-center" style={{margin:'4vh 0'}}>Top Headlines - {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}</h2>
        {/* {this.state.loading && <Spinner />}  */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

            <div className="row">
            {/* !this.state.loading && this.state.articles.map((element) Use this to hide current articles while loading new  */}
              {this.state.articles.map((element) => {
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
}

export default news;
