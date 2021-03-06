import React, { useCallback, useEffect, useRef } from "react";

import { setRoomIdToUrl } from "../utils/url";
import { useFaceImages } from "../hooks/useFaceImages";
import "./SingleRoom.css";

const BLANK_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";

type Props = {
  roomId: string;
  userId: string;
};

const SingleRoom: React.FC<Props> = ({ roomId, userId }) => {
  const nicknameRef = useRef("");
  const messageRef = useRef("");
  useEffect(() => {
    setRoomIdToUrl(roomId);
  }, [roomId]);

  const getFaceInfo = useCallback(
    () => ({
      nickname: nicknameRef.current,
      message: messageRef.current,
    }),
    []
  );
  const { myImage, roomImages, networkStatus } = useFaceImages(
    roomId,
    userId,
    getFaceInfo
  );

  return (
    <>
      <div className="SingleRoom-status">{JSON.stringify(networkStatus)}</div>
      <div className="SingleRoom-room-info">
        <div>
          <a href={window.location.href}>Link to this room</a> (Share this with
          your colleagues)
        </div>
        <div>
          Your Name:{" "}
          <input
            onChange={(e) => {
              nicknameRef.current = e.target.value;
            }}
          />
        </div>
      </div>
      <div>
        <div className="SingleRoom-card">
          <img
            src={myImage || BLANK_IMAGE}
            className="SingleRoom-photo"
            alt="myself"
          />
          <div className="SingleRoom-name">{nicknameRef.current}</div>
          <div className="SingleRoom-mesg">
            <form>
              <input
                onChange={(e) => {
                  messageRef.current = e.target.value;
                }}
              />
            </form>
          </div>
        </div>
        {roomImages.map((item) => (
          <div
            key={item.userId}
            className="SingleRoom-card"
            style={{ opacity: item.obsoleted ? 0.2 : 1 }}
          >
            <img src={item.image} className="SingleRoom-photo" alt="friend" />
            <div className="SingleRoom-name">{item.info.nickname}</div>
            <div className="SingleRoom-mesg">{item.info.message}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleRoom;
