import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Item from "./Item/Item";
import InfiniteScroll from "react-infinite-scroll-component";
const Menu = (props) => {
  const params = useParams();
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get(`/menu_item/restaurant/${params.id}/`)
      .then((res) => {
        setItems(res.data.results);
        setNext(res.data.next);
      })
      .catch((e) => {
        alert(e);
      });
  }, [params.id]);
  const [next, setNext] = useState(null);
  const fetchData = () => {
    if (next != null) {
      axios
        .get(next)
        .then((res) => {
          setItems(items.concat(res.data.results));
          setNext(res.data.next);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div>
      <h1>Menu</h1>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={next !== null}
        className="d-flex flex-wrap w-100 ps-5"
      >
        {items.map((item) => (
          <Item key={item.id} Item={item}></Item>
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default Menu;
