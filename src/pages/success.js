import React,{useEffect} from 'react'
import {Button,Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { API_URL } from '../utils/constants';

const Success = () => {
    useEffect(() => {
        API_URL.get("keranjangs")
        .then(res => {
            const data_cart = res.data;
            data_cart.map( (data) =>
                API_URL.delete("keranjangs/"+data.id)
                .then((res) => console.log(res))
                .catch((error) => console.log(error))
            )
        })
        .catch(error =>{
        console.log(error)
        })
    },[]);

    return (
        <div className="mt-5 text-center">
            <Image src="assets/images/sukses.png" width="500"/>
            <h2>Pesanan Sukses</h2>
            <p>Terima Kasih Telah Memesan</p>
            <Button variant="primary" className="btn-success" as={Link} to="/">
                Kembali
             </Button> 
        </div>
    )
}

export default Success;