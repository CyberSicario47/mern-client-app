import React, { useEffect, useState } from "react";
import instance from "../utils/axios/axios";
import { useParams, Link } from "react-router-dom";
export default function RoomScreen() {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let { roomId } = useParams();
  console.log(roomId);
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await instance.get(`/api/rooms/${roomId}`);
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
            <h1>Loading...</h1>
          ) : error ? (
            <h1>Error...</h1>
          ) : (
            <div className="row">
              <div className="col-md-4">
                <img
                  className="small-img"
                  src={roomData.imageurls[0]}
                  alt="room"
                />
              </div>
              <div className="col-md-7" style={{ textAlign: 'right' }}>
                <h3>{roomData.name}</h3>
                <b>
                  <p>Max Count: {roomData.maxcount}</p>
                  <p>Phone Number: {roomData.phonenumber}</p>
                  <p>Type: {roomData.type}</p>
                </b>
                <div>
                    <Link to={`/room/${roomData._id}`}>
                      <button className="btn btn-dark">View Details</button>
                    </Link>
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
