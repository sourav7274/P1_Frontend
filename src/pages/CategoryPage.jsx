import { products } from "./home";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Category = () =>{
    const { category } = useParams();
    const filteredProducts = products.filter(product => product.category === category);

    return (
        <div className="bg-info-subtle">
        <Header />
        <Container className="py-4 my-5">
            <h1>Category: {category}</h1>
            <Row>
                {filteredProducts.map(product => (
                    <Col key={product.id} md={4}>
                        <Card>
                            <Card.Img src={product.image} alt={product.name} />
                            <Card.Body>
                                <Card.Title>Name: {product.name}</Card.Title>
                                <Card.Text>Price: {product.price}</Card.Text>
                                <Card.Text>Rating: {product.rating}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        <Footer />
        </div>
    );
}
export default Category;