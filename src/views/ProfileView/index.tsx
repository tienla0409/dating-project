import classNames from "classnames/bind";

import styles from "./ProfileView.module.scss";
import UserBasicInfo from "./UserBasicInfo";
import UserPhotos from "./UserPhotos";
import UserBio from "./UserBio";
import MoreInformation from "./MoreInformation";
import UserPassword from "./UserPassword";

const cln = classNames.bind(styles);

const ProfileView = () => {
  return (
    <div className={cln("custom__scroll", "custom__scroll--tiny", "wrapper")}>
      <UserPhotos />

      <UserBio />

      <UserBasicInfo />

      <UserPassword />

      <MoreInformation />
    </div>
  );
};

export default ProfileView;
