import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {Form,Modal,Button} from 'react-bootstrap'
import {FormatNumber} from '../utils/FormatNumbers'

const ModalEdit = (props) => {
        return (
            <Modal show={props.modal} onHide={props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{props.data.product.nama}<strong> ( Rp.{FormatNumber(props.data.product.harga)})</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={props.handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Harga : </Form.Label>
                            <p className="ml-1"><strong>Rp.{FormatNumber(props.allPrice)}</strong></p>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Jumlah : </Form.Label>
                            <br />
                            <Button variant="primary" size="sm" className="mr-2" onClick={ () => {
                                props.minus()
                            }}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </Button>
                            <strong>
                                {props.amount}
                            </strong>
                            <Button variant="primary" size="sm" className="ml-2" onClick={ () => {
                                props.plus()
                            }}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows="3" 
                                name="keterangan" 
                                placeholder="contoh : Pedas, Pake Kecap" 
                                value={props.detail}
                                onChange={(event)=>{
                                    props.changeHandler(event)
                                }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Simpan</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={ () => {
                    props.deleteOrder(props.data.id)
                } } variant="danger">
                    <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
                </Button>
                </Modal.Footer>
            </Modal>
        )   
}

export default ModalEdit;
