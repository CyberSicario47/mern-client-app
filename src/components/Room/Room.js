import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Room({ room }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img
          className="small-img"
          onClick={handleShow}
          src={room.imageurls[0]}
          alt="room"
        />
      </div>
      <div className="col-md-8">
        <h3>{room.name}</h3>
        <b>
          <p>Max Count: {room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          <Link to={`/book/${room._id}`}>
            <button className="btn btn-dark">Book Now</button>
          </Link>
          &nbsp;
          <Button variant="dark" onClick={handleShow}>View Details</Button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel=" " nextLabel=" ">
            {room.imageurls.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 rounded-3"
                  src={image}
                  alt={`${index}-room`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <h5 className="mt-5">{room.description}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
