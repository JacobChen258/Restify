import "./Comments.css"
import Comment from "./Comment/Comment";
import React,{useState,useEffect,useContext} from "react";
import { useParams } from "react-router-dom";
import { Modal,Button } from "react-bootstrap";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFormik, Form } from "formik";
import * as Yup from "yup";
import AuthContext from "../../Context/AuthContext";

const Comments = (props) =>{
    const params = useParams();
    const [comments,setComments] = useState([]);
    const [show,setShow] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [showComment,setShowComment] = useState(false);
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
            <div className="d-flex flex-row">
            <h1>Comments</h1>
            <Button className = 'mt-auto mb-auto ms-auto me-3' onClick={()=>{
                setShowComment(true);
            }}>Comment</Button>
            </div>
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
            <AddComment CommentShow={showComment} SetCommentShow={setShowComment} SetComment={setComments} Comment={comments}/>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title>{modalInfo.full_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalInfo.content}</Modal.Body>
            </Modal>
        </div>
    )
}

const AddComment = (props)=>{
    const {user,authTokens} = useContext(AuthContext);
    const params = useParams();
    const validation = Yup.object({
        content: Yup.string()
          .required("Content is required")
          .max(300, "Content must be less than 300 characters"),
      });
      const formik = useFormik({
        initialValues: {
          content: "",
        },
        validationSchema: validation,
        onSubmit: (values)=>{
            console.log("hello")
            var bodyFormData = new FormData();
            bodyFormData.append("content", values.content);
            bodyFormData.append("restaurant",params.id);
            const options = {
                headers: { "Content-Type": "multipart/form-data" ,
                "Authorization": "Bearer " + String(authTokens.access)},
            };
            
            axios
            .post("/comment/create/", bodyFormData, options)
            .then((res) => {
                // close modal
                let temp = [res.data].concat(props.Comment)
                console.log(res.data);
                console.log(temp);
                props.SetComment(temp)
                props.SetCommentShow(false);
                alert('comment created');
            })
            .catch((err) => {
            console.log(err.response);
        })}
        })
    return (
        <Modal show={props.CommentShow} onHide={()=>(props.SetCommentShow(false))} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Comment</Modal.Title>
            </Modal.Header>
            <form onSubmit={formik.handleSubmit} className='d-flex flex-column'>
                {formik.errors.content && formik.touched.content ? (
                    <div className="alert alert-danger " role="alert">
                    {formik.errors.content}
                    </div>
                ) : null}
                <div className="d-flex p-2">
                    <textarea id="txtArea" rows="8" cols="100" className="w-100" {...formik.getFieldProps("content")}></textarea>
                </div>
                <Button type='submit' className="ms-auto me-auto mb-1">Submit</Button>
            </form>
        </Modal>
    )
}
export default Comments;
