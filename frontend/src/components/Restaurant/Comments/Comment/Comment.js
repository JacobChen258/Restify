import React from 'react';
import { Card, Button } from 'react-bootstrap';
const Comment = (props)=>{
    const handleModal = ()=>{
        props.ShowModal(true);
        props.SetModalInfo(props.Comment);
    }
    return (
        <Card className="p-2 content_width mb-2 blog_bg justify-content-center" id="res_cmt">
            <Card.Title>{props.Comment.full_name}</Card.Title>
            <Card.Body className="preview_text m-1">
                {props.Comment.content}asnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfsasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfasnfdddvdfvdfvdfs
            </Card.Body>
            <div className="d-flex flex-row">
                <p className='time_text_color mt-auto mb-auto'>{props.Comment.creation_time.slice(0,10)}</p>
                <Button variant='secondary' className="ms-auto me-3" onClick={handleModal}> View </Button>
            </div>

        </Card>
    )
}

export default Comment;