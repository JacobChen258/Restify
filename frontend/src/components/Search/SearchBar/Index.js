import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { DropdownButton,Dropdown, Form, Button} from "react-bootstrap";
import "./Index.css";


const SearchBar = ()=>{
    const nav = useNavigate();
    const [searchInfo, setSearchInfo] = useState({
        "method" : "name",
        "field" : ""
    })
    const [category,setCategory] = useState("Name");
    const [active, setActive] = useState({
        "name": true,
        "address":false,
        "item": false
    })
    const handleSelect = (e)=>{
        setCategory(e.target.textContent);
        setSearchInfo({...searchInfo,method:e.target.id})
        var activeState = {
            "name": false,
            "address":false,
            "item": false
        }
        activeState[e.target.id] = true;
        setActive(activeState)
    }
    const handleTextInput = (e)=>{
        setSearchInfo({...searchInfo,"field":e.target.value})
    }
    const handleSubmit = (e)=>{
        nav(`/search/${searchInfo.method}/${searchInfo.field}`);
    }
    return (
        <div className="d-flex flex-row justify-content-center search_bar align-content-center search_area">
            <DropdownButton
                id="method"
                variant="secondary category_container dd_border h-100"
                menuVariant="dark"
                title={<span className="dropdown_title">Search By: {category}</span>}
                className="h-100"
            >
                <Dropdown.Item id="name" onClick={handleSelect} active={active.name}>Name</Dropdown.Item>
                <Dropdown.Item id="address" onClick={handleSelect} active={active.address}>Address</Dropdown.Item>
                <Dropdown.Item id="item" onClick={handleSelect} active={active.item}>Menu Item</Dropdown.Item>
            </DropdownButton>
            <Form className = "justify-content-center">
                    <Form.Control id="field" type="field" placeholder="Search Restaurant" className = "form_border form_width h-100"
                        value = {searchInfo.field} onChange={handleTextInput}
                    />
            </Form>
            <Button variant="secondary" className="search_btn" onClick={handleSubmit}> Search </Button>
        </div>
    )
}

export default SearchBar;