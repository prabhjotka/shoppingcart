import React from 'react'
import {
    Badge, CardText, Button,
    Container, Dropdown, FormControl, Navbar,
} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';
import '../styles/style.css';

function Header() {
    const { state: { cart },
        dispatch,
        productDispatch,
    } = CartState();
    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{ height: 80 }}>

            <Container>
                <Navbar.Brand>
                    <Nav.Link as={Link} to="/">
                        Shopping Cart
                    </Nav.Link>
                </Navbar.Brand>
                {useLocation().pathname.split("/")[1] !== "cart" && (
                    <Navbar.Text className='search'>
                        <FormControl
                            style={{ width: 500 }}
                            type="search"
                            placeholder='Search a product'
                            className='m-auto'
                            aria-label='Search'
                            onChange={(e) => {
                                productDispatch({
                                    type: "FILTER_BY_SEARCH",
                                    payload: e.target.value,
                                });
                            }} />
                    </Navbar.Text>
                )}
                <Dropdown align="end">
                    <Dropdown.Toggle variant='success'>
                        <FaCartShopping color="white" fontSize="25px" />
                        <Badge>
                            {cart.length}
                        </Badge>

                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ minWidth: 370 }}>
                        {cart.length > 0 ? (
                            <>
                                {cart.map((prod) => (
                                    <span className="cartitem" key={prod.id}>
                                        <img
                                            src={prod.image}
                                            className="cartItemImg"
                                            alt={prod.name}
                                        />
                                        <div className="cartItemDetail">
                                            <span>{prod.name}</span>
                                            <span>$ {prod.price.split(".")[0]}</span>
                                        </div>
                                        <AiFillDelete
                                            fontSize="20px"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                dispatch({
                                                    type: "REMOVE_FROM_CART",
                                                    payload: prod,
                                                })
                                            }
                                        />
                                    </span>
                                ))}
                                <Link to="/cart">
                                    <Button style={{ width: "95%", margin: "0 10px" }}>
                                        Go To Cart
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <span style={{ padding: 10 }}>
                                Cart is empty
                            </span>
                        )}

                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>

    )
}

export default Header
