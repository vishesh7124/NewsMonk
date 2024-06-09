import React, { Component } from "react";
import NewsItem from "./newsItem";
import Spinner from "./spinner";
import PropTypes from 'prop-types'


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

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      // totalArticles:0
    };
  }
  async componentDidMount() {
    // console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=e714d7e094ef4606a10969e6cca6c7e4&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.totalResults);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      totalPage: Math.ceil(this.state.totalResults / this.props.pageSize),
    });
  }

  handlePrev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=e714d7e094ef4606a10969e6cca6c7e4&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}&category=${this.props.category}`;

    this.setState({
      loading: true
    })

    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData.articles)
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    });
    console.log(this.state.page);
  };
  handleNext = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=e714d7e094ef4606a10969e6cca6c7e4&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}&category=${this.props.category}`;

    this.setState({
      loading: true
    })

    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData.articles)
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    });
    console.log(this.state.page);
  };

  render() {
    // console.log("render");
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin:'4vh 0'}}>Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div key={element.url} className="col-md-4">
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  newsUrl={element.url}
                  imgUrl={element.urlToImage}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex align-items-center justify-content-between">
          <button
            disabled={this.state.page === 1}
            className="btn my-3 btn-dark"
            onClick={this.handlePrev}
          >
            &larr;
          </button>
          <h4>Page: {this.state.page}</h4>
          <button
            disabled={this.state.totalPage === this.state.page}
            className="btn my-3 btn-dark"
            onClick={this.handleNext}
          >
            &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default news;
