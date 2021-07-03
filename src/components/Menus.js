import React from 'react';
import {Col,Card,Button} from 'react-bootstrap';
import {FormatNumber} from '../utils/FormatNumbers';

const Menus = (props) => {
    return (
        <Col md={4} sm={6} xs={12} className="mb-4">
            <Card className="shadow" onClick={()=>{
                props.insertcart(props.data);
            }}>
                <Card.Img variant="top" src={"/assets/images/"+ props.data.category.nama.toLowerCase() + "/" + props.data.gambar} />
                <Card.Body>
                    <Card.Title>{props.data.nama} <strong>({props.data.kode})</strong></Card.Title>
                    <Card.Text>
                        Rp. {FormatNumber(props.data.harga)}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body> 
            </Card>
        </Col>
    )
}

export default Menus;
