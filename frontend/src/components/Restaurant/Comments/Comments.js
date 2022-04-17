import "./Comments.css"
import Comment from "./Comment/Comment";
import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
const Comments = (props) =>{
    const params = useParams();
    const [comments,setComments] = useState([]);
    const [show,setShow] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    useEffect(()=>{
        axios.get(`/comment/${params.id}/`)
        .then((res)=>{
            setComments(res.data.results);
            setNext(res.data.next)
        })
        .catch((e)=>{
            alert(e);
        })
    },[params.id])
    const handleClose = ()=>{
        setShow(false);
    }
    const handleShow = ()=>{
        setShow(true);
    }
    const handleModalInfo = (comment)=>{
        setModalInfo(comment)
    }
    const [next,setNext] = useState(null);
    const fetchData = ()=>{
        if (next != null){
            axios.get(next)
            .then((res)=>{
                console.log(res)
                setComments(comments.concat(res.data.results));
                setNext(res.data.next);
            })
            .catch((e)=>{
                alert(e);
            })
        }
    }
    return (
        <div>
            <h1>Comment</h1>
            <InfiniteScroll
                dataLength={comments.length} //This is important field to render the next data
                next={fetchData}
                hasMore={(next !== null)}
                className="d-flex flex-wrap w-100 justify-content-center"
                >
                {
                    comments.map((comment)=>(
                        <Comment key={comment.id} Comment={comment} ShowModal={handleShow}
                        SetModalInfo={handleModalInfo}
                        ></Comment>
                    ))
                }
            </InfiniteScroll>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>{modalInfo.full_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalInfo.content}</Modal.Body>
            </Modal>
        </div>
    )
}
export default Comments;
