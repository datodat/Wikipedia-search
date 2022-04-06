import React, { useState } from 'react';
// Css
import './app.css';
// Axios
import axios from 'axios';

const App = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState('');

  const handleSearch = e => {
    e.preventDefault();

    if(search === '') return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&
    prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    axios.get(endpoint)
      .then(res => {
        setTotal(res.data.query.searchinfo.totalhits);
        setResults(res.data.query.search);
        setSearch('');
      })
      .catch(error => console.log(error))
  }

  return (
    <div className='container'>
      {/* Search box */}
      <div className='search-container'>
        <h1>WIKI SEARCH</h1>
        <form onSubmit={handleSearch}>
          <input
            type='text'
            placeholder='Search'
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
          <i 
            className="fa-solid fa-magnifying-glass"
            onClick={handleSearch}  
          ></i>
        </form>
        {total ?
          <p>Search result: {total}</p> :
          ''}
      </div>
      {/* Results */}
      {results.length !== 0 ? (
        <div className='results-container'>
          {results.map((res, i) => {
            const url = `https://en.wikipedia.org/?curid=${res.pageid}`

            return (
              <div key={i}>
                <h2>{res.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: res.snippet }}></p>
                <a href={url} target='_blank' rel='noreferrer'>Read</a>
              </div>
            )
          })}
        </div>
      ) : ('')}
    </div>
  );
}

export default App;