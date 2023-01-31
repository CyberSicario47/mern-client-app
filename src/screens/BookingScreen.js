import React, { useEffect, useState } from "react";
import instance from "../utils/axios/axios";
import Error from "../components/Error/Error"
import messages from "../components/Messages/Messages.json";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Loading from "../components/Loading/Loading";
import dayjs from "dayjs";
import swal from "sweetalert"
import StripeCheckout from "react-stripe-checkout";
export default function BookingScreen() {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0)

  let { bookId, startDate, endDate } = useParams();

  startDate = dayjs(startDate).format("YYYY-MM-DD");
  endDate = dayjs(endDate).format("YYYY-MM-DD");

  const dateVal = dayjs(endDate);
  let totalDays = dateVal.diff(startDate, "day")+1;

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await instance.get(`/api/rooms/${bookId}`);
      const room = data.data.room;
      if (room) {
        setTotalAmount(room.rentperday * totalDays)
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
  const onToken=async (token)=>{
    setLoading(true)
  console.log(token)
    const bookingDetails = {
      roomData,
      userId: window.localStorage.getItem('user')._id,
      fromDate: startDate,
      toDate: endDate,
      totalAmount,
      totalDays,
      token
    }
    try {
      const result = await instance.post("/api/bookings/bookroom",bookingDetails)
      console.log(result,'this is the result')
      setLoading(false)
      await swal("Configurations","You have booked the room ", "success")
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(true)
      await swal("Ops!!","Something went wrong ", "error")
    }

  }
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div>
          {loading ? (
            <Loading color="#1F3748" loading={loading} />
          ) : roomData ? (
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
                    <p>Name: {JSON.parse(localStorage.getItem('user')).name}</p>
                    <p>Max Count: {roomData.maxcount}</p>
                    <p>To Date: {endDate}</p>
                    <p>From Date: {startDate}</p>
                  </b>
                </div>
                <div>
                  <h4>Amount</h4>
                  <hr />
                  <b>
                    <p>Total days: {totalDays}</p>
                    <p>Rent per day: {roomData.rentperday}</p>
                    <p>
                      Total Amount: {totalAmount}
                    </p>
                  </b>
                </div>
                <StripeCheckout
                    token={onToken}
                    amount={totalAmount * 100}
                    currency="USD"
                    stripeKey='pk_test_51MVqAsHdZ9WM6lOl3HigZyAf5l1oxNViWlrenJN1MwgB8kCKdgbPBSrnuGOQOP6bSfK6ZSm83E6TMcEl0Z6F1Bxc009zYuHGHs'
                        >
                  <div>
                    <Button variant="dark"> Book Now </Button>
                  </div>
                </StripeCheckout>
              </div>
            </div>
          ) : (
            <Error description={messages.messages.bookingScreenErrorMessage}/>
          ) }
        </div>
      </div>
    </div>
  );
}
