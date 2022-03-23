import React, { useState } from "react";
import '@nivo/colors';
import moment from 'moment';
import 'moment-timezone';
import Loading from "../components/Loading";
// import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import '../css/Profile.css';
import MyResponsiveLine from "../components/MyResponsiveLine";
import MyResponsiveCalendar from "../components/MyResponsiveCalendar";
import MyResponsivePie from "../components/MyResponsivePie";

export const ProfileComponent = () => {
  // const { user } = useAuth0();

  const dataLine=[
    {
      "id": "fake corp. A",
      "data": [
        // { "x": moment(new Date).format('YYYY-MM-DD'), "y": 7 },
        { "x": "2018-01-02", "y": 60 },
        { "x": "2018-01-03", "y": 11 },
        { "x": "2018-01-04", "y": 100 },
        { "x": "2018-01-05", "y": 76 },
        { "x": "2018-01-06", "y": 16 },
        { "x": "2018-01-07", "y": 54 },
        { "x": "2018-01-08", "y": 13 },
      ],
    },
  ];

  const dataCalendar = [
    {
      "value": 103,
      "day": "2021-07-10"
    },
    {
      "value": 233,
      "day": "2021-07-28"
    },
    {
      "value": 82,
      "day": "2021-09-27"
    },
    {
      "value": 99,
      "day": "2022-08-23"
    }
  ];

  const dataPie = [
    {
      "id": "make",
      "label": "make",
      "value": 273,
      "color": "hsl(65, 70%, 50%)"
    },
    {
      "id": "java",
      "label": "java",
      "value": 80,
      "color": "hsl(305, 70%, 50%)"
    },
    {
      "id": "python",
      "label": "python",
      "value": 231,
      "color": "hsl(219, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 377,
      "color": "hsl(256, 70%, 50%)"
    },
    {
      "id": "rust",
      "label": "rust",
      "value": 126,
      "color": "hsl(314, 70%, 50%)"
    }
  ];

  return (
    <div id="content" className="profile-page">

      <section className="profile__general-info">
        <div className="profile__generel-info__photo-block">
          <div className="profile__general-info__photo">
          {/* <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture"
          /> */}
          </div>
          <input type="file" name="PERSONAL_PHOTO" className="profile__general-info__file " accept="image/jpeg,image/png,image/webp" capture="" />
        </div>
        <div className="profile__general-info__name">email</div>
      </section> 


      <div className="nivo-block">
        <MyResponsiveLine data={dataLine}></MyResponsiveLine>
      </div>
      <div className="nivo-block">
        <MyResponsiveCalendar data={dataCalendar}></MyResponsiveCalendar>
      </div>
      <div className="nivo-block">
        <MyResponsivePie data={dataPie}></MyResponsivePie>
      </div>
    </div>
  );
};

export default ProfileComponent;
// export default withAuthenticationRequired(ProfileComponent, {
//   onRedirecting: () => <Loading />,
// });
