import classNames from "classnames/bind";
import { ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";

import styles from "./SettingContainer.module.scss";
import useSettingContainer from "./SettingContainerHook";
import { When } from "react-if";

const cln = classNames.bind(styles);

type SettingContainerProps = {
  children: ReactNode;
  title: string;
  subTitle?: string;
};

const SettingContainer = (props: SettingContainerProps) => {
  const { children, title, subTitle } = props;

  const { open, handleToggleOpen } = useSettingContainer();

  return (
    <div className={cln("wrapper", { "is-open": open, "has-sub-title": subTitle })}>
      <div className={cln("header", { "has-sub-title": subTitle })} onClick={handleToggleOpen}>
        <div>
          <h3 className={cln("title")}>{title}</h3>
          <When condition={subTitle}>
            <p className={cln("sub-title")}>{subTitle}</p>
          </When>
        </div>
        <div
          className={cln("icon", {
            "is-open": open,
          })}
        >
          <IoIosArrowDown size={22} />
        </div>
      </div>

      <div className={cln("body")}>{children}</div>
    </div>
  );
};

export default SettingContainer;
