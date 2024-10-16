import Header from "../components/Header";
import Footer from "../components/Footer";
import {Row,Col,Container,Card} from 'react-bootstrap';
import { pro } from "../App";


const Cart = () => {
    console.log("Cart",pro);
    return (
        <div>
            <Header />
            <Container className="py-4">
                <Row>
                  {pro.map(p => (
                    <Col md={4} key={p.id}>
                        <Card>
                            <Card.Img variant="top" src={p.image} />
                            <Card.Body>
                                <Card.Title>{p.name}</Card.Title>
                                <Card.Text>{p.category}</Card.Text>
                                <Card.Text>{p.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                  ))}
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Cart;    