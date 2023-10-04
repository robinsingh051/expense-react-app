import React from "react";
import { BsCheck } from "react-icons/bs";
import { Image } from "react-bootstrap";

const ProfileData = (props) => {
  let verified = "";
  if (props.isVerified)
    verified = (
      <>
        <BsCheck size={24} color="blue" />
      </>
    );
  return (
    <div className="text-center">
      <Image
        src={props.photoUrl}
        alt="Profile Photo"
        roundedCircle
        style={{ width: "150px", height: "150px" }}
      />
      <h1>
        {props.name} {verified}
      </h1>
    </div>
  );
};

export default ProfileData;
