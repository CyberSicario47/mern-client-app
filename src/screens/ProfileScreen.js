import React from 'react';
import {Box, Tabs, Tab, Typography, Grid, Paper} from "@mui/material"
import SwipeableViews from 'react-swipeable-views';
import Profile from "../components/Profile/Profile";
import Bookings from "../components/Bookings/Bookings";
import {styled, useTheme} from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none",
}));
function ProfileScreen(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
const  theme = useTheme()
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
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


    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered textColor="inherit"
                  indicatorColor="secondary">
                <Tab label="Profile"/>
                <Tab label="Bookings"/>
            </Tabs>
            <Grid>
                <Grid item xs={4} style={{marginTop:"5%"}}>
                    <Item/>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <SwipeableViews
                            sx={{ width: '100%'}}
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <Profile/>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <Bookings/>
                            </TabPanel>
                        </SwipeableViews>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProfileScreen;