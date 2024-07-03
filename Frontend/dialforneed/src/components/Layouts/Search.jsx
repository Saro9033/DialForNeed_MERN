import React, { useEffect, useState, useContext } from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarContext } from '../../context/SidebarContext'
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { keywordQuery } = useContext(SidebarContext);
  const [placeholderIndex, setPlaceholderIndex] = useState(0); // State to track current placeholder index

  const placeholderTexts = [
    'Computers',
    'Laptops',
    'Printer',
    'Mobile phones',
    'Electronics',
    // Add more placeholders as needed
  ];

  useEffect(() => {
    // Function to cycle through placeholders every 5 seconds
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/products/search/${encodeURIComponent(trimmedQuery)}`); // Navigate to products page with encoded query parameter
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith('/products/search/')) {
      setQuery('');
    } else {
      const searchQuery = decodeURIComponent(location.pathname.replace('/products/search/', ''));
      setQuery(searchQuery);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/products/search/')) {
      setQuery(keywordQuery);
    }
  }, [keywordQuery, location.pathname]);

  return (
    <Form inline className="d-flex" onSubmit={handleSubmit}>
      {/* <InputGroup size="md" className=" w-100 mx-0 ">
        <Form.Control
          aria-label="Small"
          value={query}
          type="text"
          className="px-3 rounded-5 custom-input-search"
          style={{ transition: 'all .5s ease-in-out', boxShadow: 'none', outline: 'none', marginRight: window.innerWidth < 990 ? '' : '10px', padding: '20px 0px' }}
          placeholder={placeholderTexts[placeholderIndex]}
          onChange={(e) => setQuery(e.target.value)}
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup> */}

      <div class="form-group has-search mb-0 w-100" style={{marginRight: window.innerWidth < 990 ? '' : '10px'}}>
        <span class="fa fa-search form-control-feedback"></span>
        <input
          aria-label="Small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ border:'1px solid black',transition: 'all .5s ease-in-out', boxShadow: 'none', outline: 'none', padding: '5px  0px 5px 30px ' }}
          placeholder={placeholderTexts[placeholderIndex]}

          type="text" className=" rounded-5 custom-input-search w-100" />
      </div>


      {window.innerWidth < 990 ? '' : (
        <Button variant="outline-success" className="rounded-5" type="submit" style={{ background: 'white', outline: 'none', border: '1px solid #1BA786' }}>
          <i style={{ color: '#1BA786' }} className="fa fa-search" aria-hidden="true"></i>
        </Button>
      )}
    </Form>
  );
};

export default Search;
