import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

function App() {
  const [inputData, setInputData] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = "http://localhost:5000/bfhl";

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const jsonInput = JSON.parse(inputData);
      const response = await axios.post(backendUrl, jsonInput);
      setResponseData(response.data);
      setFilteredData(null);
    } catch (error) {
      alert("Invalid JSON input or API error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (selectedOptions) => {
    setFilterOptions(selectedOptions);
    if (!responseData) return;

    const filtered = {};
    selectedOptions.forEach((option) => {
      filtered[option.value] = responseData[option.value];
    });
    setFilteredData(filtered);
  };

  return (
    <div className="app-container">
      <h1 className="title">Bajaj Finserv Challenge - Nishchal Vyas</h1>
      <div className="card">
        <div className="input-group">
          <textarea
            className="form-control"
            placeholder='Enter JSON input (e.g., { "data": ["A", "1", "z"] })'
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <span
            className="info-icon"
            title="Enter JSON data in the specified format (e.g., { 'data': ['A', '1', 'z'] })"
          >
            ℹ️
          </span>
        </div>
        <button
          className="btn btn-primary submit-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>

      {responseData && (
        <>
          <h2>Filter Response</h2>
          <Select
            className="dropdown"
            isMulti
            options={[
              { value: "numbers", label: "Numbers" },
              { value: "alphabets", label: "Alphabets" },
              { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
            ]}
            onChange={handleFilterChange}
          />
          <div className="response-container">
            <h3>Response Data</h3>
            <pre>{JSON.stringify(filteredData || responseData, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}

export default App;