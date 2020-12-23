import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import DataSetsList from "./components/dataset-list.component.js"
import UploadFiles from "./components/upload-files.component";

function App() {
  return (
    <div className="container" style={{ width: "1000px" }}>
        <div classname="App">
            <div className="App-intro">
              <h2>Ecommerce Data Set</h2>
            </div>
          <UploadFiles />
        </div>
        <DataSetsList />
    </div>
  );
}

export default App;
