import React from "react";
import { BsCheck } from "react-icons/bs";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProfileData = (props) => {
  const isPremium = useSelector((state) => state.auth.isPremium);
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
      {isPremium && <h2>(Premium User)</h2>}
    </div>
  );
};

export default ProfileData;
