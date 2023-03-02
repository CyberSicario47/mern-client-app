import React from 'react';

function Profile(props) {
    let user = JSON.parse(window.localStorage.getItem('user'))

    return (
        <div className="row bs">
            <h3>My Profile</h3>
            {user && Object.entries(user).map(([key,val],index)=>(
                <div key={index}>
                    <h5>{key.toString()} : {val.toString().toUpperCase()}</h5>
                </div>
            ))}
        </div>
    );
}

export default Profile;