import React, { useState, useEffect } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { API_URL } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons';


const Icon = (props) => {
    if (props.nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="ml-1 mr-2" />
    if (props.nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-1" />
    if (props.nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />

    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
}

const CategoryList = (props) => {
    const [categories, setCategory] = useState([]);

    useEffect(() => {
        API_URL.get("categories")
            .then(res => {
                const data_category = res.data;
                setCategory(data_category)
            })
            .catch(error => {
                console.log("errornya adalah : ", error)
            })
    }, []);

    return (
        <Col md={2} className="mt-3">
            <h4><strong>Daftar Kategori</strong></h4>
            <hr />
            <ListGroup>
                {categories.map((data) => {
                    return (
                        <ListGroup.Item
                            key={data.id}
                            onClick={() => {
                                props.event(data.nama)
                            }}
                            className={props.category === data.nama ? "category-active" : null}
                            style={{ cursor: 'pointer' }}>
                            <h5>
                                <Icon nama={data.nama} /> {data.nama}
                            </h5>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </Col>
    );
}

export default CategoryList;