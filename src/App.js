//import React, { Component } from 'react';
//import { Button, Col, Row, Table } from 'reactstrap';
//import './App.css';
//import UploadFiles from "./components/upload-files.component";
//
//class App extends Component {
//  state = {
//    isLoading: true,
//    coffeeShops: []
//  };
//
//  async componentDidMount() {
//    const response = await fetch('/api/allDataSet');
//    const body = await response.json();
//    this.setState({dataset: body._embedded.dataset, isLoading: false});
//  }
//
//  render() {
//    const {dataset, isLoading} = this.state;
//
//    if (isLoading) {
//      return <p>Loading...</p>;
//    }
////  const { dataSetList, match, loading, totalItems } = props;
//    return (
////      <div className="App">
////        <header className="App-header">
////          <div className="App-intro">
////            <h2>Data Set</h2>
////            <Button color="link" size="sm">test</Button>
////            {dataset.map(dataset =>
////              <div key={dataset.invoiceNo}>
////                {dataset.stockCode} - {dataset.description}
////              </div>
////            )}
////          </div>
////        </header>
////      </div>
//      <div classname="App">
//          <div className="App-intro">
//            <h2>Data Set</h2>
//            <Button color="link" size="sm">test</Button>
//          </div>
//        <UploadFiles />
//        <div className="table-responsive">
//            <Table responsive>
//              <thead>
//                <tr>
//                  <th className="hand">
//                    Invoice No
//                  </th>
//                  <th className="hand">
//                    Stock Code
//                  </th>
//                  <th className="hand">
//                    Description
//                  </th>
//                  <th className="hand" >
//                    Quantity
//                  </th>
//                  <th className="hand">
//                    Invoice Date
//                  </th>
//                  <th className="hand">
//                    Unit Price
//                  </th>
//                  <th className="hand">
//                    Customer ID
//                  </th>
//                  <th className="hand">
//                    Country
//                  </th>
//                  <th />
//                </tr>
//              </thead>
//              <tbody>
//                  {dataset.map(dataset => (
//                  <tr>
//                    <td>{dataset.invoiceNo}</td>
//                    <td>{dataset.stockCode}</td>
//                    <td>{dataset.description}</td>
//                    <td>{dataset.quantity}</td>
//                    <td>{dataset.invoiceDate}</td>
//                    <td>{dataset.unitPrice}</td>
//                    <td>{dataset.customerID}</td>
//                    <td>{dataset.country}</td>
//                  </tr>
//                  ))}
//              </tbody>
//          </Table>
//        </div>
//      </div>
//    );
//  }
//}
////        {props.totalItems ? (
////          <div className={dataSetList && dataSetList.length > 0 ? '' : 'd-none'}>
////            <Row className="justify-content-center">
////              <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
////            </Row>
////            <Row className="justify-content-center">
////              <JhiPagination
////                activePage={paginationState.activePage}
////                onSelect={handlePagination}
////                maxButtons={5}
////                itemsPerPage={paginationState.itemsPerPage}
////                totalItems={props.totalItems}
////              />
////            </Row>
////          </div>
////        ) : (
////          ''
////        )}
//
//
//export default App;

import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Table } from 'reactstrap';

import TutorialsList from "./components/dataset-list.component.js"
import UploadFiles from "./components/upload-files.component";

function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
      <div style={{ margin: "20px" }}>
        <h3>bezkoder.com</h3>
        <h4>React upload Files</h4>
      </div>
      <UploadFiles />
        <div classname="App">
            <div className="App-intro">
              <h2>Data Set</h2>
            </div>
          <UploadFiles />
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
            </Table>
          </div>
        </div>
        <TutorialsList />
    </div>
  );
}

export default App;
