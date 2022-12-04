import create from "zustand";

import { MessageType, ConversationType, ParticipantType } from "@/types";

type ChatStoreType = {
  loadingGetMessages: boolean;
  setLoadingGetMessages: (_loading: boolean) => void;
  loadingGetConversations: boolean;
  setLoadingGetConversations: (_loading: boolean) => void;
  conversationId: string;
  setConversationId: (_conversationId: string) => void;
  senderParticipant: ParticipantType | null;
  setSenderParticipant: (_senderParticipant: ParticipantType) => void;
  receiverParticipant: ParticipantType | null;
  setReceiverParticipant: (_receiverParticipant: ParticipantType) => void;
  conversations: ConversationType[];
  setConversations: (_conversations: ConversationType[]) => void;
  messages: MessageType[];
  setMessages: (_messages: MessageType[]) => void;
};

const useChatStore = create<ChatStoreType>((set) => ({
  loadingGetMessages: false,
  setLoadingGetMessages: (loading) => set({ loadingGetMessages: loading }),
  loadingGetConversations: false,
  setLoadingGetConversations: (loading) => set({ loadingGetConversations: loading }),
  conversationId: "",
  setConversationId: (conversationId) => set((state) => ({ ...state, conversationId })),
  senderParticipant: null,
  setSenderParticipant: (senderParticipant) => set((state) => ({ ...state, senderParticipant })),
  receiverParticipant: null,
  setReceiverParticipant: (receiverParticipant) =>
    set((state) => ({ ...state, receiverParticipant })),
  messages: [],
  setMessages: (messages) => set((state) => ({ ...state, messages })),
  conversations: [],
  setConversations: (conversations) => set((state) => ({ ...state, conversations })),
}));

export default useChatStore;
