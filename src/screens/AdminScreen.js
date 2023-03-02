import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import instance from "../utils/axios/axios";
import Loading from "../components/Loading/Loading";
import Error from "../components/Error/Error";
import messages from "../components/Messages/Messages.json";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function AdminScreen(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Box sx={{ width: '100%' }} className="mt-3 ml-3 bs">
                <Typography sx={{ width: '100%', textAlign: "center", fontSize: "30px"}}> Admin Panel</Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Bookings" {...a11yProps(0)} />
                        <Tab label="Rooms" {...a11yProps(1)} />
                        <Tab label="Add Rooms" {...a11yProps(2)} />
                        <Tab label="Users" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Bookings/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Rooms
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Add Rooms
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Users
                </TabPanel>
            </Box>
        </div>
    );
}

export default AdminScreen;


const Bookings =()=>{
    const [roomData, setRoomData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const fetchRooms = async () => {
        try {
            setLoading(true);
            const data = await instance.get(`/api/bookings/allbookings/`);
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

    return(
        <div>
            {loading ? (
                <Loading color="#1F3748" loading={loading} />
            ) : roomData ? (
                <div className="row bs">
                    <div className="col-md-5 col-lg-6" style={{ textAlign: "right" }}>
                        <h4>Booking Details</h4>
                        <hr />

                        <div>
                            <b>
                                <p>Max Count: {roomData.maxcount}</p>
                            </b>
                        </div>
                    </div>
                </div>
            ) : (
                <Error description={messages.messages.bookingScreenErrorMessage}/>
            ) }
        </div>
    )
}