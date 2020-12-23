import React, { Component } from "react";
import DataModelService from "../services/dataset.service";
import Pagination from "@material-ui/lab/Pagination";
import {  Table } from 'reactstrap';

export default class DataSetsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveDataSets = this.retrieveDataSets.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      dataSets: [],
      currentDataSet: null,
      currentIndex: -1,
      searchField: "",

      page: 1,
      count: 0,
      pageSize: 5,
    };

    this.pageSizes = [5, 10, 20];
  }

  formatter = new Intl.DateTimeFormat("en-GB",{dateStyle: 'short', timeStyle: 'short', hour12:true })

  componentDidMount() {
    this.retrieveDataSets();
  }

  onChangeSearchTitle(e) {
    const searchField = e.target.value;

    this.setState({
      searchField: searchField,
    });
  }

  getRequestParams(searchField, page, pageSize) {
    let params = {};

    if (searchField) {
      params["invoiceNo"] = searchField;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveDataSets() {
    const { searchField, page, pageSize } = this.state;
    const params = this.getRequestParams(searchField, page, pageSize);

    DataModelService.getAll(params)
      .then((response) => {
        const { dataSets, totalPages } = response.data;
        this.setState({
          dataSets: dataSets,
          count: totalPages,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDataSets();
    this.setState({
      currentDataSet: null,
      currentIndex: -1,
    });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveDataSets();
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
        this.retrieveDataSets();
      }
    );
  }

  render() {
    const {
      searchField,
      dataSets,
      currentDataSet,
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
              placeholder="Search by Invoice No."
              value={searchField}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrieveDataSets}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div>
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
                            <td>
                                {this.formatter.format(Date.parse(dataSet.invoiceDate))}
                            </td>
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