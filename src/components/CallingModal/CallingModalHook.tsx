import { HandleCallType } from "@/types";
import { useAuthStore, useCallStore, useSocketStore } from "@/store";
import { ON_VIDEO_CALL_ACCEPTED, ON_VIDEO_CALL_REJECTED } from "@/configs/socket-events";

const useCallingModal = () => {
  const receiver = useAuthStore((state) => state.profile);
  const socket = useSocketStore((state) => state.socket);
  const callStatus = useCallStore((state) => state.callStatus);
  const caller = useCallStore((state) => state.caller);

  const handleCall = (type: HandleCallType) => () => {
    switch (type) {
      case "accept":
        socket?.emit(ON_VIDEO_CALL_ACCEPTED, { caller });
        break;
      case "reject":
        socket?.emit(ON_VIDEO_CALL_REJECTED, { caller });
        break;
    }
  };

  return {
    callStatus,
    caller,
    handleCall,
  };
};

export default useCallingModal;