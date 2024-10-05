import { createBlock } from "@typebot.io/forge";
import { openChatWidget } from "./actions/openChatWidget";
import { auth } from "./auth";
import { CometChatLogo } from "./logo";

export const cometChatBlock = createBlock({
  id: "comet-chat",
  name: "CometChat",
  tags: ["chat"],
  LightLogo: CometChatLogo,
  auth,
  actions: [openChatWidget],
});
