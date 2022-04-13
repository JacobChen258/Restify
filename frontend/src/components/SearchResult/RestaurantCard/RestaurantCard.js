import React from "react";
import './RestaurantCard.css';
import { Card, Nav} from "react-bootstrap";

const RestaurantCard = (props)=>{
    return (
        <Card id="res_card" className="p-2 m-3 card_width">
            <Nav.Link href={`/restaurant/${props.Restaurant.id}`}>
                <Card.Img variant="top res_logo" src={props.Restaurant.logo} />
                <Card.Body>
                    <h4 className="res_title">{props.Restaurant.name}</h4>
                    <Card.Text>
                    Likes: {props.Restaurant.num_likes}
                    </Card.Text>
                </Card.Body>
            </Nav.Link>
        </Card>
    )
}

export default RestaurantCard;