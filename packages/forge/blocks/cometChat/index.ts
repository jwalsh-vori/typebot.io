import { createBlock } from "@typebot.io/forge";
import { auth } from "./auth";
import { CometChatLogo } from "./logo";
import { openChatWidget } from "./actions/openChatWidget";

export const cometChatBlock = createBlock({
  id: "comet-chat",
  name: "CometChat",
  tags: ["chat"],
  LightLogo: CometChatLogo,
  auth,
  actions: [openChatWidget],
});
