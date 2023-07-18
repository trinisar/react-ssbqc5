import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://stockradars.co/assignment/data.php');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return item.N_COMPANY_E.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatMarketCap = (value) => {
    if (value) {
      return value.toLocaleString();
    }
    return '-';
  };

  return (
    <div>
      <h1>Stock Data</h1>
      <div>
        <input
          type="text"
          placeholder="Search by Company Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Company Name (Thai)</th>
            <th>Company Short Name (Thai)</th>
            <th>Market Cap</th>
            <th>Company Name (English)</th>
            <th>Company URL</th>
            <th>Financial Type</th>
            <th>Business Type (Thai)</th>
            <th>Business Type (English)</th>
            <th>Full Company Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.N_name}>
              <td>{item.N_name}</td>
              <td>{item.N_shortname}</td>
              <td>{formatMarketCap(item.marketcap)}</td>
              <td>{item.N_COMPANY_E}</td>
              <td>
                <a href={item.N_URL} target="_blank" rel="noopener noreferrer">
                  {item.N_URL}
                </a>
              </td>
              <td>{item.F_TYPE}</td>
              <td>{item.N_BUSINESS_TYPE_T}</td>
              <td>{item.N_BUSINESS_TYPE_E}</td>
              <td>{item.N_fullname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
