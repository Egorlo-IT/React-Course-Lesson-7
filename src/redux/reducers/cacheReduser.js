const initialState = {
  count: 0,
  messageList: [],
  listChat: [],
  currentChatID: 1,
};

export const cacheReduser = (state = initialState, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "clear":
      return { ...state, count: 0 };
    case "incrementChatID":
      return {
        ...state,
        currentChatID: state.currentChatID + 1,
      };
    case "addChatList":
      return { ...state, listChat: [...state.listChat, action.payload] };
    case "addMessage":
      return { ...state, messageList: [...state.messageList, action.payload] };
    case "removeChat":
      return { ...state, listChat: action.payload };
    default:
      return state;
  }
};
