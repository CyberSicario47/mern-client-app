import React, { useEffect, useState } from "react";
import instance from "../utils/axios/axios";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loading from '../components/Loading/Loading'
export default function BookingScreen() {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let { bookId } = useParams();
  console.log(bookId);
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await instance.get(`/api/rooms/${bookId}`);
      const room = data.data.room;
      if (room) {
        setRoomData(room);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
      console.log(e);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div>
          {loading ? (
            <Loading color="#1F3748" loading={loading}/>
          ) : error ? (
            <h1>Error...</h1>
          ) : (
            <div className="row bs">
              <div className="col-md-5 col-lg-6">
                <h4 className="mb-3">
                  {roomData.name.length > 40
                    ? `${roomData.name.substring(0, 40)}...`
                    : roomData.name}
                </h4>
                <img
                  className="big-img"
                  src={roomData.imageurls[0]}
                  alt="room"
                />
              </div>
              <div className="col-md-5 col-lg-6" style={{ textAlign: "right" }}>
                <h4>Booking Details</h4>
                <hr />

                <div>
                  <b>
                    <p>Name: {roomData.maxcount}</p>
                    <p>Max Count: {roomData.maxcount}</p>
                    <p>To Date: {roomData.maxcount}</p>
                    <p>From Date: {roomData.maxcount}</p>
                  </b>
                </div>
                <div>
                  <h4>Amount</h4>
                  <hr />
                  <b>
                    <p>Total days: {roomData.maxcount}</p>
                    <p>Rent per day: {roomData.rentperday}</p>
                    <p>
                      Total Amount: {roomData.rentperday * roomData.maxcount}
                    </p>
                  </b>
                </div>
                <div>
                  <Button variant="dark"> Book Now </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
