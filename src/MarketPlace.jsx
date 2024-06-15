import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Pagination,
  Spinner,
} from "react-bootstrap";
import "./MarketPlaceStyles.css";
import { CiSearch } from "react-icons/ci";
import CardBg from './assects/Card bg.png'
import OneStar from "./assects/oneStar.png";
import TwoStar from "./assects/twoStar.png";
import ThreeStar from "./assects/threeStar.png";
import FourStar from "./assects/fourStar.png";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
function MarketPlace() {
  const [filterValues, setFilterValues] = useState({
    selectedDeveloper: '',
    rating_by: 'All',
    application_type: '',
    sort_by: '1' 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  

  const handleChange = (field, value) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));
  };


  const developedBy = [
    { id: 1, label: "All" },
    { id: 2, label: "Evoque Innovative Lab" },
    { id: 3, label: "Lorem Ipsum" },
    { id: 4, label: "Lorem Ipsum" },
    { id: 5, label: "Lorem Ipsum" },
  ];

  const applicationType = [
    { id: 1, label: "All" },
    { id: 2, label: "Web based applications" },
    { id: 3, label: "Mobile applications" },
  ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://18ebbuf8l8.execute-api.ap-south-1.amazonaws.com/demo/api/v3/user/marketplace/filter',
                    {
                        page_num: 1,
                        filter_id: null,
                        segment_id: null,
                        price_type: null,
                        rating_by: filterValues.rating_by,
                        application_type: filterValues.application_type,
                        min_price_limit: 0,
                        max_price_limit: 29500000,
                        min_investment_limit: 0,
                        max_investment_limit: 100000000,
                        sort_by: filterValues.sort_by,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Token': 'eyJhbGciOiJIUzUxMiIsImlhdCI6MTYwODEwMDI4MCwiZXhwIjoxNjE1ODc2MjgwfQ.eyJ0eXBlIjozLCJpZCI6MTQ5MzMsImNyZWF0ZWQiOiIyMDIwLTEyLTE2IDA2OjMxOjIwLjczMTk2NiJ9.Ef001xBUX_ZPsgvGWCou9sUa6Q2BV9jvPWZZsnwE8qB3_IDTGaSNV0d0lmcuWab2FwEUQ3GouA9LVdd7ExmkvQ',
                        },
                    }
                );
               
                setData(response?.data?.data?.products);
               
               
            } catch (err) {
         console.log(err);
            }
        };

        fetchData();
    }, [filterValues]);
    const itemsPerPage = 4;

    if (!data || data.length === 0) {
      return    <div className="d-flex align-items-center justify-content-center full-screen">
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
            </Spinner>
      </div>;
    }
  
    const handleClick = (number) => {
      setCurrentPage(number);
    };
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
  return (
    <div>
      <Container>
        {/* Header */}
        <Header />

       {/* Body */}
        <Container fluid>
          <div className="banner">
            <h2>
              Welcome to <span>marketplace!</span>
            </h2>
            <p>
              India’s first products marketplace with
              <br />
              advanced tools & apps to empower your every trade!
            </p>
          </div>
        </Container>

        <Container className="mt-4" fluid>
          <Row>
            <Col lg={3} md={4}>
              <div className="Search-div">
                <div className="input-wrapper">
                  <input type="search" placeholder="Search for products" />
                  <div className="search-icon">
                    <CiSearch />
                  </div>
                </div>
              </div>
              <div className="mt-4 filters-div">
      <div>
        <h2>Developed by</h2>
        <Form>
          {developedBy.map((option) => (
            <Form.Check
              key={option.id}
              type="radio"
              value={option.label}
              name="developer"
              label={<span className="label">{option.label}</span>}
              onChange={() => handleChange('selectedDeveloper', option.label)}
              checked={filterValues.selectedDeveloper === option.label}
            />
          ))}
        </Form>
      </div>

      <div>
        <h2>Rating by</h2>
        <Form>
          <div>
            <Form.Check
              key="all"
              type="radio"
              value="All"
              name="Rating"
              onChange={() => handleChange('rating_by', 'All')}
              checked={filterValues.rating_by === 'All'}
              label={<span className="label">All</span>}
            />
          </div>
          <div>
            <Form.Check
              key="fourStar"
              type="radio"
              value="FourStar"
              name="Rating"
              onChange={() => handleChange('rating_by', 'FourStar')}
              checked={filterValues.rating_by === 'FourStar'}
              label={
                <span className="d-flex gap-2">
                  <div className="rating-container">
                    <img src={FourStar} alt="" />
                  </div>
                  <span className="label">& above</span>
                </span>
              }
            />
          </div>

          <div className="d-flex gap-2">
            <Form.Check
              key="threeStar"
              type="radio"
              value="ThreeStar"
              name="Rating"
              onChange={() => handleChange('rating_by', 'ThreeStar')}
              checked={filterValues.rating_by === 'ThreeStar'}
            />
            <div className="rating-container">
              <img src={ThreeStar} alt="" />
            </div>
            <p className="label">& above</p>
          </div>

          <div className="d-flex gap-2">
            <Form.Check
              key="twoStar"
              type="radio"
              value="TwoStar"
              name="Rating"
              onChange={() => handleChange('rating_by', 'TwoStar')}
              checked={filterValues.rating_by === 'TwoStar'}
            />
            <div className="rating-container">
              <img src={TwoStar} alt="" />
            </div>
            <p className="label">& above</p>
          </div>

          <div className="d-flex gap-2">
            <Form.Check
              key="oneStar"
              type="radio"
              value="OneStar"
              name="Rating"
              onChange={() => handleChange('rating_by', 'OneStar')}
              checked={filterValues.rating_by === 'OneStar'}
            />
            <div className="rating-container">
              <img src={OneStar} alt="" />
            </div>
            <p className="label">& above</p>
          </div>
        </Form>
      </div>

      <div>
        <h2>Application type</h2>
        <Form>
          {applicationType.map((option) => (
            <Form.Check
              key={option.id}
              type="radio"
              value={option.label}
              name="applicationType"
              label={<span className="label">{option.label}</span>}
              onChange={() => handleChange('application_type', option.label)}
              checked={filterValues.application_type === option.label}
            />
          ))}
        </Form>
      </div>
    </div>
            </Col>
            <Col lg={9} md={8}>
<Row className="justify-content-end">
<div className="sortby-div d-flex gap-2">
        <label htmlFor="sort_by">Sort by:</label>
        <Form.Select
          aria-label="Default select example"
          className="sortby-input"
          value={filterValues.sort_by}
          onChange={(e) => handleChange('sort_by', e.target.value)}
        >
          <option value="1">Newly added</option>
          <option value="2">Top Rated</option>
          <option value="3">Top Performing</option>
          <option value="4">Name</option>
          <option value="5">Price Low to High</option>
          <option value="6">Price High to Low</option>
        </Form.Select>
      </div>
</Row>


<Row xs={1} md={2} className="g-4 mt-3">
        {currentItems.map((item) => (
          <Col key={item.id}>
            <Card className="main-card">
              <div
                className="card-banner"
                style={{
                  background: `linear-gradient(45deg, ${item.gradient_1}, ${item.gradient_2})`,
                }}
              >
               <img src={CardBg} alt="" />
               <span className="badge bg-danger position-absolute top-3 end-0 m-2">Free</span>
               <div className="d-flex align-items-center mb-2 position-absolute bottom-0 start-0 m-2">
                  <div className="rating-stars">
                    {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                  </div>
                  <span className="ms-2">({item.reviews} reviews)</span>
                </div>
              </div>
              <Card.Body>
                <Card.Title className="card-title">{item.title}</Card.Title>
                <Card.Text className="card-text">{item.description}</Card.Text>
                <p className="price mb-1">Price: ₹{item.price} <span>{item.price_validity_text}</span></p>
                <p className="offer-price">Offer Price:  <span style={{color:"green"}}>₹{item.offer_text}</span>  <b>for customers</b></p>
                
                <div className="d-flex gap-3">
                  <Button variant="primary">View More Details</Button>
                  <Button variant="outline-primary">Open an Account</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="mt-3">
        <Pagination.Prev 
          onClick={() => setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item 
            key={index + 1} 
            active={index + 1 === currentPage} 
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next 
          onClick={() => setCurrentPage(currentPage + 1)} 
          disabled={currentPage === totalPages}
        />
      </Pagination>
            
            
            </Col>
          </Row>
        </Container>
      </Container>

{/* footer */}
      <Footer />
    </div>
  );
}

export default MarketPlace;
