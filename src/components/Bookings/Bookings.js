import React, {useEffect, useState} from 'react';
import instance from "../../utils/axios/axios";
import {Button} from "react-bootstrap";
import swal from "sweetalert";
import {Chip} from "@mui/material"
import Loading from "../Loading/Loading";

function Bookings() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const fetchBookings = async () => {
        setLoading(true)
        try {
            const bookingsData = await instance.get(`/api/bookings/user/${user._id}`)
            setBookings(bookingsData.data.bookings)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(error)
            setError(true)
            await swal("Ops!!", "Something went wrong while fetching the bookings ", "error")
        }

    }

    let user = JSON.parse(window.localStorage.getItem('user'))

    useEffect(() => {
        fetchBookings()
    }, [])

    const handleClick = async (bookingId, roomId) => {
        setLoading(true)
        console.log(bookingId, roomId)
        const data = {
            bookingId,roomId
        }
        try{
            const cancel = await instance.post(`/api/bookings/cancel`,data)
            setLoading(false)
            await swal("Congratulations!!", "You have successfully cancelled the booking", "success")
            if(cancel){
                window.location.reload()
            }

        }catch (e) {
            setLoading(false)
            console.log(error)
            setError(true)
            await swal("Ops!!", "Something went wrong while canceling the booking ", "error")
        }

    }
    return (<>

            {loading ? <Loading color="#1F3748" loading={loading}/> :
                <div className="row bs">
                    <h2>My Bookings</h2>
                    {bookings && bookings.map((value, index) =>
                        <div className="bs" key={index}>
                            <h3><b>{value.roomName}</b></h3>
                            <h3><b>Status:</b> <Chip label={value.status} variant="outlined" color="success" /></h3>
                            <h3><b>From Date:</b> {value.fromDate}</h3>
                            <h3><b>TO Date:</b> {value.toDate}</h3>
                            <h3><b>Total Days:</b> {value.totalDays}</h3>
                            <h3><b>Total Amount:</b> {value.totalAmount}</h3>
                            <h3><b>Transaction Id:</b> {value.transactionId}</h3>
                            {value.status !== 'cancelled' ?<Button variant='dark' type='button' onClick={() => handleClick(value._id, value.roomId)}>Cancel
                                Booking</Button>:""}
                        </div>
                    )}
                </div>
            }</>
    );
}

export default Bookings;