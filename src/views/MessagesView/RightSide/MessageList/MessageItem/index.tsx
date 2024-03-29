import { memo } from "react";
import { Else, If, Then } from "react-if";
import { Avatar, Tooltip } from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GoReply } from "react-icons/go";
import classNames from "classnames/bind";
import { VscLoading } from "react-icons/vsc";

import styles from "./MessageItem.module.scss";
import { MessageType, ParticipantType } from "@/types";
import useMessageItem from "./MessageItemHook";
import Image from "next/image";

const cln = classNames.bind(styles);

export type MessageItemProps = {
  message?: MessageType;
  _participantTyping?: ParticipantType | null;
};

const MessageItem = (props: MessageItemProps) => {
  const { message, _participantTyping } = props;

  const {
    messageDelete,
    senderParticipant,
    avatar,
    createdAtStr,
    handleDeleteMessage,
    handleEditMessage,
    handleReply,
    handleScrollMessageReplied,
  } = useMessageItem(props);

  return (
    <div
      id={message?.id}
      className={cln("wrapper", {
        "is-sender": message?.participant?.id === senderParticipant?.id,
      })}
    >
      <div>
        <Avatar className={cln("avatar")} src={avatar} />
      </div>

      <Tooltip title={createdAtStr}>
        <div className={cln("content")}>
          <If condition={!!message?.replyTo}>
            <Then>
              <div className={cln("message__reply")} onClick={handleScrollMessageReplied}>
                <div className={cln("message__reply-mark")}>&nbsp;</div>

                <div
                  className={cln("message__reply-main", {
                    "in-active": !message?.replyTo?.active,
                    "is-sender": message?.participant?.id === senderParticipant?.id,
                  })}
                >
                  <If condition={message?.replyTo?.active}>
                    <Then>
                      <h5 className={cln("message__reply-main-fullName")}>
                        {message?.replyTo?.participant?.user?.fullName}
                      </h5>
                    </Then>
                  </If>
                  <p className={cln("message__reply-main-content")}>
                    <If condition={message?.replyTo?.active}>
                      <Then>{message?.replyTo?.content}</Then>
                      <Else>Message has been deleted</Else>
                    </If>
                  </p>
                </div>
              </div>
            </Then>
          </If>

          <If condition={!!_participantTyping}>
            <Then>
              <div className={cln("typing")}>
                <div className={cln("typing__dot")}></div>
                <div className={cln("typing__dot")}></div>
                <div className={cln("typing__dot")}></div>
              </div>
            </Then>

            <Else>
              <div>
                <If condition={message?.attachments?.length}>
                  <Then>
                    <div className={cln("attachment__list")}>
                      {message?.attachments?.map((attachment) => (
                        <div key={attachment?.id} className={cln("attachment__item")}>
                          <Image
                            src={attachment.link}
                            alt={"abc"}
                            width={100}
                            height={100}
                            objectFit="cover"
                          />
                        </div>
                      ))}
                    </div>
                  </Then>
                </If>

                <span
                  className={cln("text__content", {
                    "in-active": !message?.active,
                  })}
                >
                  {message?.active ? message?.content : "Message has been deleted"}
                </span>
              </div>
            </Else>
          </If>
        </div>
      </Tooltip>

      <If condition={!_participantTyping && messageDelete?.id === message?.id}>
        <Then>
          <div className={cln("message__deleting")}>
            <VscLoading size={15} />
          </div>
        </Then>
        <Else>
          <If condition={message?.active}>
            <Then>
              <div className={cln("message__actions")}>
                <If condition={message?.participant?.id === senderParticipant?.id}>
                  <Then>
                    <AiFillEdit size={17} cursor="pointer" onClick={handleEditMessage} />
                    <AiFillDelete size={17} cursor="pointer" onClick={handleDeleteMessage} />
                  </Then>
                </If>
                <GoReply size={17} cursor="pointer" onClick={handleReply} />
              </div>
            </Then>
          </If>
        </Else>
      </If>
    </div>
  );
};

export default memo(MessageItem);
