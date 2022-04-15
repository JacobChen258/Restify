import React from "react";
import { Card } from "react-bootstrap";
import "./Item.css"
const Item = (props) =>{
    return (
        <Card className="item_bg item_container m-2 p-2">
            <Card.Body>
                <Card.Title className="text-center">{props.Item.name}</Card.Title>
                <Card.Subtitle className="text-center">$ {props.Item.price}</Card.Subtitle>
                <Card.Text>
                {props.Item.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default Item;