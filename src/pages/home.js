import React,{useState,useEffect} from 'react';
import {Row,Col,Container} from 'react-bootstrap';
import {CategoryList,Result,Menus} from '../components/index';
import {API_URL} from '../utils/constants';
import swal from 'sweetalert'

const Home = () =>{
  const [menus,setMenu] = useState([]);
  const [cart,setCart] = useState([]);
  
  const [category,setCategory] = useState("Makanan");

  useEffect(() => {
    API_URL.get("products?category.nama="+category)
    .then((res) => { 
      const data_menu = res.data;
      setMenu(data_menu)
    })
    .catch((error) =>{
      console.log("errornya adalah :",error)
    })
    
    API_URL.get("keranjangs")
    .then((res) => {
      const data_cart = res.data;
      setCart(data_cart)
    }).catch((error) => {
      console.log("errornya adalah :",error.response)
    });

  },[category]);

  
  const ChangeCategory = (value) => {
      setCategory(value);
      setMenu([]);

      API_URL.get("products?category.nama="+value)
      .then(res => {
        const data_menu = res.data;
        setMenu(data_menu)
      })
      .catch(error =>{
        console.log("error ya adalah : ",error)
      })
  }


  const InsertCart = (value) =>{
    API_URL.get("keranjangs?product.id="+value.id)
    .then(res => {
      if(res.data.length === 0 ){
        const keranjang = {
          jumlah:1,
          total_harga:value.harga,
          product:value,
        }
        API_URL.post("keranjangs",keranjang)
          .then(res => {
            swal({
              title: "Sukses",
              text: value.nama+" Telah Dimasukkan",
              icon: "success",
              button: false,
              timer:2000,
            });
            API_URL.get("keranjangs")
            .then((res) => {
              const data_cart = res.data;
              setCart(data_cart)
            }).catch((error) => {
              console.log("errornya adalah :",error.response)
            });
          })
          .catch(error =>{
            console.log("error ya adalah : ",error)
          })
      }else{
        const keranjang = {
          jumlah:res.data[0].jumlah+1,
          total_harga:res.data[0].total_harga+value.harga,
          product:value,
        }
        API_URL.put("keranjangs/"+res.data[0].id,keranjang)
          .then(res => {
            swal({
              title: "Sukses",
              text: value.nama+" Telah Ditambahkan",
              icon: "success",
              button: false,
              timer:2000,
            });
            API_URL.get("keranjangs")
            .then((res) => {
              const data_cart = res.data;
              setCart(data_cart)
            }).catch((error) => {
              console.log("errornya adalah :",error.response)
            });
          })
          .catch(error =>{
            console.log("error ya adalah : ",error)
          })
      }
    })
    .catch(error =>{
      console.log("error ya adalah : ",error)
    })

    
  } 

  return (
        <div className="mt-3">
          <Container fluid>
            <Row>
              <CategoryList event={ChangeCategory} category={category}/>
              <Col className="mt-3">
                <h4><strong>Daftar Produk</strong></h4>
                <hr />
                <Row className="overflow-auto menu">
                  {menus.map((menu) => {
                    return <Menus 
                      data={menu}
                      key={menu.id}
                      insertcart={InsertCart}
                    />
                  })}
                </Row>
              </Col>
              <Result className="mb-2" cart={cart} setCart={setCart}/>
            </Row>
          </Container>
        </div>
  );
}

export default Home;
