import React, { useEffect, useState } from "react";
import instance from "../utils/axios/axios";
import Room from "../components/Room/Room";
import Loading from "../components/Loading/Loading";
import Error from "../components/Error/Error";
import messages from "../components/Messages/Messages.json";
import { useParams } from "react-router-dom";
import Success from "../components/Success/Success";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography, Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));
export default function HomeScreen() {
  const [roomsData, setRoomsData] = useState([]);
  const [duplicateRooms, setduplicateRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);

  let params = useParams();
  console.log(params);
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await instance.get(`/api/rooms/getallrooms`);
      const rooms = data.data.rooms;
      if (rooms) {
        setRoomsData(rooms);
        setduplicateRooms(rooms)
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
      console.log(e);
    }
  };
  const filterDates = () => {
    let tempRooms = [];
    let avaliability = false;
    setStartValue(dayjs(startValue).format("YYYY-MM-DD"));
    setEndValue(dayjs(endValue).format("YYYY-MM-DD"));
    for (const room of duplicateRooms) {
      if (room.currentbookings.length > 0) {
        for (let booking of room.currentbookings) {

          console.log(dayjs(startValue)
          .isBetween(booking.fromDate, dayjs(booking.toDate), "day"),'1')
          console.log(dayjs(endValue)
          .isBetween(booking.fromDate, dayjs(booking.toDate), "day"),'1')
          if (
            !dayjs(startValue)
              .isBetween(booking.fromDate, dayjs(booking.toDate), "day") &&
            !dayjs(endValue)
              .isBetween(booking.fromDate, dayjs(booking.toDate), "day")
          ) {
            if (
              startValue !== booking.toDate &&
              endValue !== booking.fromDate &&
              endValue !== booking.toDate &&
              startValue !== booking.fromDate
            ) {
              avaliability = true;
            }
          }
        }
      }
      if (avaliability === true || room.currentbookings.length !== 0) {
        tempRooms.push(room);
      }
      setRoomsData(tempRooms)
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  return (
    <div className="container">
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          >
            <Grid item xs={4}>
              <Item>
                <DatePicker
                  label="Check-in"
                  value={startValue}
                  onChange={(newValue) => {
                    setStartValue(newValue);
                  }}
                  renderInput={(params) => (
                    <>
                      <TextField {...params} />
                    </>
                  )}
                />
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>
                <Box component="span" sx={{ p: 1 }}>
                  <Typography>To</Typography>
                </Box>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <DatePicker
                  label="Check-out"
                  value={endValue}
                  onChange={(newValue) => {
                    setEndValue(newValue);
                  }}
                  renderInput={(params) => (
                    <>
                      <TextField {...params} />
                    </>
                  )}
                />
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item>
                <Button variant="dark" onClick={filterDates}>Filter</Button>
              </Item>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </div>
      <div className="row justify-content-center mt-5">
        <div>
          {loading ? (
            <Loading color="#000" loading={loading} />
          ) : error ? (
            <Error description={messages.messages.homeErrorMessage} />
          ) : (
            <React.Fragment>
              <Success description={""} />
              {roomsData &&
                roomsData.map((room, index) => {
                  return (
                    <div
                      className="col-md-9 col-lg-11 mt-5 text-end"
                      key={index}
                    >
                      <Room
                        room={room}
                        startDate={startValue}
                        endDate={endValue}
                      />
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
