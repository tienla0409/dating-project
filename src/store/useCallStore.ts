import create from "zustand";
import { DataConnection, MediaConnection } from "peerjs";

import { useAuthStore } from "@/store";
import { CallStatusType, UserAuthType } from "@/types";

type CallStoreType = {
  peer?: any;
  initPeer: () => void;
  call?: MediaConnection;
  setCall: (_call?: MediaConnection) => void;
  connection?: DataConnection;
  setConnection: (_connection?: DataConnection) => void;
  caller?: UserAuthType;
  setCaller: (_caller?: UserAuthType) => void;
  callStatus: CallStatusType;
  setCallStatus: (_status: CallStatusType) => void;
  localStream?: MediaStream;
  setLocalStream: (_stream?: MediaStream) => void;
  remoteStream?: MediaStream;
  setRemoteStream: (_stream?: MediaStream) => void;
};

const useCallStore = create<CallStoreType>((setState) => ({
  peer: undefined,
  initPeer: () => {
    (async () => {
      const profile = useAuthStore.getState().profile;
      if (profile?.id && typeof window !== "undefined") {
        const { Peer } = await import("peerjs");
        const peer = new Peer(profile?.id);
        setState((state) => ({ ...state, peer }));
      }
    })();
  },
  call: undefined,
  setCall: (call?: MediaConnection) => setState((state) => ({ ...state, call })),
  connection: undefined,
  setConnection: (connection?: DataConnection) => setState((state) => ({ ...state, connection })),
  callStatus: "idle",
  setCallStatus: (status) => setState((state) => ({ ...state, callStatus: status })),
  caller: undefined,
  setCaller: (caller) => setState((state) => ({ ...state, caller })),
  localStream: undefined,
  setLocalStream: (stream) => setState((state) => ({ ...state, localStream: stream })),
  remoteStream: undefined,
  setRemoteStream: (stream) => setState((state) => ({ ...state, remoteStream: stream })),
}));

export default useCallStore;
