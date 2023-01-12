import React, { useEffect, useState } from "react";
import instance from "../utils/axios/axios";
import Room from "../components/Room/Room";
import Loading from "../components/Loading/Loading";
export default function HomeScreen() {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await instance.get(`/api/rooms/getallrooms`);
      const rooms = data.data.rooms;
      if (rooms) {
        setRoomsData(rooms);
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
            <Loading color='#000' loading={loading}/>
          ) : error ? (
            <h1>Error...</h1>
          ) : (
            roomsData &&
            roomsData.map((room, index) => {
              return (
                <div className="col-md-9 col-lg-11 mt-5 text-end" key={index}>
                  <Room room={room} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
