import { useCallStore, useSocketStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { VIDEO_CALL_HANG_UP } from "@/configs/socket-events";

const useVideoCall = () => {
  const socket = useSocketStore((state) => state.socket);
  const remoteStream = useCallStore((state) => state.remoteStream);
  const localStream = useCallStore((state) => state.localStream);
  const call = useCallStore((state) => state.call);
  const isZoom = useCallStore((state) => state.isZoom);
  const caller = useCallStore((state) => state.caller);
  const receiver = useCallStore((state) => state.receiver);
  const setIsZoom = useCallStore((state) => state.setIsZoom);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [enableMic, setEnableMic] = useState(true);
  const [enableCamera, setEnableCamera] = useState(true);

  const handleToggleMic = () => {
    localStream &&
      setEnableMic((prevState) => {
        localStream.getAudioTracks()[0].enabled = !prevState;
        return !prevState;
      });
  };

  const handleToggleCamera = () => {
    localStream &&
      setEnableCamera((prevState) => {
        localStream.getVideoTracks()[0].enabled = !prevState;
        return !prevState;
      });
  };

  const handleCloseCall = () => {
    if (call) {
      socket?.emit(VIDEO_CALL_HANG_UP, { caller, receiver });
    }
  };

  const handleToggleZoom = () => {
    setIsZoom(!isZoom);
  };

  useEffect(() => {
    (async () => {
      if (localVideoRef.current && localStream) {
        localVideoRef.current.srcObject = localStream;
        await localVideoRef.current.play();
      }
    })();
  }, [localStream]);

  useEffect(() => {
    (async () => {
      if (remoteVideoRef.current && remoteStream) {
        remoteVideoRef.current.srcObject = remoteStream;
        await remoteVideoRef.current.play();
      }
    })();
  }, [remoteStream]);

  return {
    localVideoRef,
    remoteVideoRef,
    isZoom,
    enableCamera,
    enableMic,
    handleToggleZoom,
    handleToggleMic,
    handleToggleCamera,
    handleCloseCall,
  };
};

export default useVideoCall;