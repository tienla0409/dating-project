import { Form, Input } from "antd";
import classNames from "classnames/bind";
import dynamic from "next/dynamic";
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";

import styles from "./MessageForm.module.scss";
import useMessageForm from "./MessageFormHook";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });
const cln = classNames.bind(styles);

const MessageForm = () => {
  const { inputRef, visibleEmoji, form, handleEmojiClick, handleToggleVisibleEmoji, handleFinish } =
    useMessageForm();

  return (
    <div className={cln("wrapper")}>
      <Form
        className={cln("form")}
        form={form}
        initialValues={{ content: "" }}
        name={"messageForm"}
        onFinish={handleFinish}
      >
        <div className={cln("form__item-wrapper")}>
          <Form.Item noStyle name="content">
            <Input
              className={cln("input")}
              size="large"
              placeholder="Your message..."
              ref={inputRef}
            />
          </Form.Item>
          <div className={cln("icon__suffix")}>
            <GrAttachment size={20} cursor="pointer" />
            <BsEmojiSmile
              id="emoji__btn"
              size={20}
              cursor="pointer"
              onClick={handleToggleVisibleEmoji}
            />

            <div
              id="message__emoji-wrapper"
              className={cln("emoji", {
                visible: visibleEmoji,
              })}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default MessageForm;