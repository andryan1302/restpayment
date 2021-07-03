import React from 'react'
import {useHistory}  from 'react-router-dom'
import { Row, Col , Button} from 'react-bootstrap';
import {FormatNumber} from '../utils/FormatNumbers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../utils/constants';


const TotalPrice = (props) => {
        const router = useHistory();
        const SubmitTotalBayar = (total) => {
            const data = {
                total_bayar:total,
                menus:props.cart
            }
            API_URL.post("pesanans",data)
            .then(res => {
                router.push('/success');
            })
            .catch(error => {
                console.log("errornya adalah : ", error)
            })
        }
        var total = props.cart.reduce(function(previous,current){
            return previous + current.total_harga;
        },0);
    
    return (
        <>
        {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
            <Row>
                <Col md={{span:3,offset:9}} className="px-4">
                    <h4>Total Harga : <strong className="float-right mr-3">Rp.{FormatNumber(total)}</strong></h4>
                    <Button 
                    variant="primary" 
                    block className="mt-3 mb-2 btn-success mr-2" 
                    size="lg"
                    onClick={() =>{
                        SubmitTotalBayar(total);
                    }}>
                        <FontAwesomeIcon icon={faShoppingCart}  /> Bayar
                    </Button>
                </Col>
            </Row>
        </div>
        
        {/* Mobile */}
        <div className="d-sm-block d-md-none">
            <Row>
                <Col md={{span:3,offset:9}} className="px-4">
                    <h4>Total Harga : <strong className="float-right mr-3">Rp.{FormatNumber(total)}</strong></h4>
                    <Button 
                    variant="primary" 
                    block className="mt-3 mb-2 btn-success mr-2" 
                    size="lg"
                    onClick={() =>{
                        SubmitTotalBayar(total);
                    }}>
                        <FontAwesomeIcon icon={faShoppingCart}  /> Bayar
                    </Button>
                </Col>
            </Row>
        </div>
        </>
       
    )
}

export default TotalPrice;

