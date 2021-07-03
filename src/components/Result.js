import React,{useState} from 'react'
import {Col,ListGroup,Row,Badge, Card} from 'react-bootstrap'
import {FormatNumber} from '../utils/FormatNumbers'
import TotalPrice from './TotalPrice'
import ModalEdit from './ModalEdit'
import swal from 'sweetalert'
import {API_URL} from '../utils/constants'


const Result = (props) => {
    
    const [modals, setModal] = useState(false);
    const [cartDetail,setCartDetail] = useState(false);
    const [detail,setDetail] = useState("");
    const [amount,setAmount] = useState(0);
    const [allPrice,setAllPrice] = useState(0);
    
    const handleClose = () =>{
        setModal(false);
    } 

    const handleShow = (data) => {
        setCartDetail(data);
        setModal(true);
        setDetail(data.keterangan);
        setAmount(data.jumlah);
        setAllPrice(data.total_harga);
    }

    const Plus = () => {
        setAmount(amount + 1);
        setAllPrice(cartDetail.product.harga * (amount + 1));
    }

    const Minus = () => {
        if(amount <= 1){
            setAmount(1);
            setAllPrice(cartDetail.product.harga);
        }else{
            setAmount(amount - 1)
            setAllPrice(cartDetail.product.harga * (amount - 1));
        }
    }

    const changeHandler = (event) => {
        setDetail(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleClose();

        const data = {
            jumlah:amount,
            total_harga:allPrice,
            product:cartDetail.product,
            keterangan:detail,
          }
          API_URL.put("keranjangs/"+cartDetail.id,data)
            .then((res) => {
                swal({
                    title: "Sukses",
                    text: cartDetail.product.nama+" Telah Di Update",
                    icon: "success",
                    button: false,
                    timer:2000,
                });
                API_URL.get("keranjangs")
                .then((res) => {
                const data_cart = res.data;
                props.setCart(data_cart)
                }).catch((error) => {
                console.log("errornya adalah :",error.response)
                });
            })
            .catch((error) => {
              console.log("errornya adalah :",error.response)
            });
    }

    const deleteOrder = (id) => {
        swal({
            title: "Peringatan!!",
            text: "Apakah Anda Yakin Ingin Menghapus Pesanan",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                API_URL.delete("keranjangs/"+id)
                .then((res) => {
                    swal({
                        title: "Sukses",
                        text: "Pesanan Telah Dihapus",
                        icon: "success",
                        button: false,
                        timer:2000,
                    });
                    API_URL.get("keranjangs")
                    .then((res) => {
                    const data_cart = res.data;
                    props.setCart(data_cart)
                    }).catch((error) => {
                    console.log("errornya adalah :",error.response)
                    });
                })
                .catch((error) => {
                  console.log("errornya adalah :",error.response)
                });
                handleClose();
            }else{
                swal({
                    title: "Sukses",
                    text: "Berhasil Membatalkan",
                    icon: "success",
                    button: false,
                    timer:1000,
                });
            }
          });
        
        
    }
    
    return(
        <Col md={3} className="mt-3">
            <h4><strong>Hasil</strong></h4>
            <hr />
            {props.cart !== 0?
            <Card className="overflow-auto hasil">
            <ListGroup variant="flush" > 
                {props.cart.map((data) => {
                    return(
                        <ListGroup.Item key={data.id} onClick={() => {
                            handleShow(data)}
                            }>
                            <Row>
                                <Col md={2}>
                                    <h4>
                                        <Badge pill variant="success">
                                            {data.jumlah}
                                        </Badge>
                                    </h4>
                                </Col>
                                <Col md={6}>
                                    <h5>{data.product.nama}</h5>
                                    <p>Rp. {FormatNumber(data.product.harga)}</p>
                                </Col>
                                <Col md={4}>
                                    <strong className="float-right">Rp. {FormatNumber(data.total_harga)}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ) 
                })}
                {cartDetail? 
                
                <ModalEdit 
                handleClose={handleClose} 
                data={cartDetail} 
                modal={modals} 
                detail={detail} 
                amount={amount}
                plus={Plus}
                minus={Minus}
                changeHandler={changeHandler}
                handleSubmit={handleSubmit}
                allPrice={allPrice}
                deleteOrder={deleteOrder}
                />
                :null}
               
                
            </ListGroup>
            </Card>:null
            }
            <TotalPrice cart={props.cart}/>
            
        </Col> 
    );
}

export default Result;