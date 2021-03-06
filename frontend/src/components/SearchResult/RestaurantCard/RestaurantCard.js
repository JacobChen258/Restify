import React from "react";
import './RestaurantCard.css';
import { Card, Nav} from "react-bootstrap";

const RestaurantCard = (props)=>{
    return (
        <Card id="res_card" className="p-1 m-3 card_width">
            <Nav.Link href={`/restaurant/${props.Restaurant.id}/`}>
                <Card.Img variant="top res_logo" src={props.Restaurant.logo} />
                {console.log(props.Restaurant)}
                <Card.Body>
                    <h4 className="res_title">{props.Restaurant.name}</h4>
                    <Card.Text>
                    Likes: {props.Restaurant.num_likes}
                    </Card.Text>
                    <Card.Text>
                    Followers: {props.Restaurant.num_followers}
                    </Card.Text>
                </Card.Body>
            </Nav.Link>
        </Card>
    )
}

export default RestaurantCard;