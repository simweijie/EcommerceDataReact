import React, { Component } from "react";
import UploadService from "../services/upload-files.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { Button, Col, Row, Table } from 'reactstrap';

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      dataSets: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",

      page: 1,
      count: 0,
      pageSize: 3,
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  getRequestParams(searchTitle, page, pageSize) {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveTutorials() {
    const { searchTitle, page, pageSize } = this.state;
    const params = this.getRequestParams(searchTitle, page, pageSize);

    UploadService.getAll(params)
      .then((response) => {
        const { dataSets, totalPages } = response.data;
        console.log(response.data.dataSets[0].invoiceNo);
        console.log(dataSets)
        console.log(totalPages)
        this.setState({
          dataSets: dataSets,
          count: totalPages,
        });
        console.log('hi');
//        console.log(response.data);
        console.log(this.state.dataSets[0].invoiceNo)
        console.log(this.state.count)
        console.log('hi2');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeAllTutorials() {
    UploadService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveTutorials();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveTutorials();
      }
    );
  }

  render() {
    const {
      searchTitle,
      dataSets,
      currentTutorial,
      currentIndex,
      page,
      count,
      pageSize,
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrieveTutorials}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div>
          <h4>Tutorials List</h4>

          <div>
            {"Items per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <div className="table-responsive">
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="hand">
                        Invoice No
                      </th>
                      <th className="hand">
                        Stock Code
                      </th>
                      <th className="hand">
                        Description
                      </th>
                      <th className="hand" >
                        Quantity
                      </th>
                      <th className="hand">
                        Invoice Date
                      </th>
                      <th className="hand">
                        Unit Price
                      </th>
                      <th className="hand">
                        Customer ID
                      </th>
                      <th className="hand">
                        Country
                      </th>
                      <th />
                    </tr>
                  </thead>
                    <tbody>
                {dataSets &&
                  dataSets.map((dataSet, index) => (
                  <tr>
                    <td>{dataSet.invoiceNo}</td>
                    <td>{dataSet.stockCode}</td>
                    <td>{dataSet.description}</td>
                    <td>{dataSet.quantity}</td>
                    <td>{dataSet.invoiceDate}</td>
                    <td>{dataSet.unitPrice}</td>
                    <td>{dataSet.customerID}</td>
                    <td>{dataSet.country}</td>
                  </tr>
                  ))}
                    </tbody>
                </Table>
            </div>
            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}