import React from "react";
import './CreateRestaurant.css'

const CreateRestaurant = ()=>{
    return (
        <div class="d-flex flex-column justify-content-center align-content-center">
            <h1 class="mt-5 mb-5 text-center">Create Your Restauraunt</h1>
            <div class="align-self-center d-flex flex-column">
                <img src="../images/24865250.jpg" class = "rounded-3 border border-2 border-dark align-self-center" style="width:20rem;height:20rem;"></img>
                <div class="align-self-center mt-2 mb-2">
                    <label for ="imageFile">Upload logo: </label>
                    <input type="file" id="imageFile" accept="image/*"></input>
                </div>
                <div class="input-group mb-3 modal_container">
                    <span class="input-group-text w-100" id="restaurant_name">Restaurant Name</span>
                    <input type="text" class="form-control w-100" aria-describedby="restaurant_name"></input>
                </div>
                <div class="input-group mb-3 modal_container">
                    <span class="input-group-text w-100" id="restaurant_address">Address</span>
                    <input type="text" class="form-control w-100" aria-describedby="restaurant_address"></input>
                </div>
                <div class="input-group mb-3 modal_container">
                    <span class="input-group-text w-100" id="postal_code">Postal Code</span>
                    <input type="text" pattern="[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d"class="form-control w-100" aria-describedby="postal_code"></input>
                </div>
                <div class="input-group mb-3 modal_container">
                    <span class="input-group-text w-100" id="email_address">Email Address</span>
                    <input type="email" class="form-control w-100" aria-describedby="email_address"></input>
                </div>
            </div>
            <button class="btn btn-primary mt-3 align-self-center mb-3">Submit</button>
        </div> 
    )
}

export default CreateRestaurant;