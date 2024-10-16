import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

export const products = [
    { id: 1, name: 'Product 1', category: 'Electronics', price: 199.99, image: 'https://via.placeholder.com/150?text=Product+1', rating: 4.5 },
    { id: 2, name: 'Product 2', category: 'Clothing', price: 49.99, image: 'https://via.placeholder.com/150?text=Product+2', rating: 3.8 },
    { id: 3, name: 'Product 3', category: 'Books', price: 14.99, image: 'https://via.placeholder.com/150?text=Product+3', rating: 4.2 },
    { id: 4, name: 'Product 4', category: 'Home & Garden', price: 79.99, image: 'https://via.placeholder.com/150?text=Product+4', rating: 4.0 },
    { id: 5, name: 'Product 5', category: 'Electronics', price: 299.99, image: 'https://via.placeholder.com/150?text=Product+5', rating: 4.7 },
    { id: 6, name: 'Product 6', category: 'Clothing', price: 99.99, image: 'https://via.placeholder.com/150?text=Product+6', rating: 3.5 },
    { id: 7, name: 'Product 7', category: 'Books', price: 24.99, image: 'https://via.placeholder.com/150?text=Product+7', rating: 4.1 },
    { id: 8, name: 'Product 8', category: 'Home & Garden', price: 119.99, image: 'https://via.placeholder.com/150?text=Product+8', rating: 3.9 },
];

const Home = ({addCart}) => {
    const [ratingFilter, setRatingFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden'];
    const ratings = [1, 2, 3, 4, 5];
 
    const filteredProducts = products.filter(product => 
        (categoryFilter === '' || product.category === categoryFilter) &&
        (ratingFilter.length === 0 || ratingFilter.includes(Math.floor(product.rating)))
    );

    const handleRatingChange = (rating) => {
        setRatingFilter(prev => 
            prev.includes(rating) 
                ? prev.filter(r => r !== rating) 
                : [...prev, rating]
        );
    };

    const handleCart = (product) => {
        addCart(product);
    };

    return (
        <div className='bg-info-subtle'>
             <Container className="py-4 ">
            <h1 className="text-center mb-5">Welcome to Our Store</h1>
            <Row className="mb-4">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Filter by Category:</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={categoryFilter} 
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Filter by Rating:</Form.Label>
                        <div>
                            {ratings.map(rating => (
                                <Form.Check
                                    key={rating}
                                    inline
                                    type="checkbox"
                                    id={`rating-${rating}`}
                                    label={`${rating}★`}
                                    checked={ratingFilter.includes(rating)}
                                    onChange={() => handleRatingChange(rating)}
                                />
                            ))}
                        </div>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                {filteredProducts.map(product => (
                    <Col key={product.id} md={3} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image} alt={product.name} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    Category: {product.category}<br />
                                    Price: ${product.price.toFixed(2)}<br />
                                    Rating: {product.rating.toFixed(1)}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleCart(product)}>Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </div>
       
    );
};

export default Home;
