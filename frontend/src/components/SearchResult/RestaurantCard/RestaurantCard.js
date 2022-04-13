import React from "react";
import './RestaurantCard.css';
import { Card } from "react-bootstrap";

const RestaurantCard = (restaurant)=>{
    return (
        <Card className="p-2">
            <Card.Img variant="top" src="#" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default RestaurantCard;