import React, { useEffect, useState } from "react";
import instance from "../utils/axios/axios";
import Room from "../components/Room/Room";
import Loading from "../components/Loading/Loading";
import Error from "../components/Error/Error";
import messages from "../components/Messages/Messages.json";
import { useParams } from "react-router-dom";
import Success from "../components/Success/Success";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export default function HomeScreen() {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(null);

  let params = useParams();
  console.log(params)
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
      <div>
      <LocalizationProvider 
      dateAdapter={AdapterDayjs}
      >
      <DatePicker
        label="Check-in"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <>{console.log(params)}
          <TextField {...params} />
          </>
          )}
      />
      <DatePicker
        label="Check-out"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <>{console.log(params)}
          <TextField {...params} />
          </>
          )}
      />
    </LocalizationProvider>
      </div>
      <div className="row justify-content-center mt-5">
        <div>
          {loading ? (
            <Loading color='#000' loading={loading}/>
          ) : error ? (
            <Error description={messages.messages.homeErrorMessage}/>
          ) : (
            <React.Fragment>
              <Success description={""}/>
              {roomsData &&
            roomsData.map((room, index) => {
              return (
                <div className="col-md-9 col-lg-11 mt-5 text-end" key={index}>
                  <Room room={room} />
                </div>
              );
            })}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
