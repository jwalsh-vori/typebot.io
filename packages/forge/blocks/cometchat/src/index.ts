import { createBlock } from "@typebot.io/forge";
import { openChatWidget } from "./actions/openChatWidget";
import { auth } from "./auth";
import { CometchatLogo } from "./logo";

export const cometchatBlock = createBlock({
  id: "cometchat",
  name: "CometChat",
  tags: ["chat"],
  LightLogo: CometchatLogo,
  auth,
  actions: [openChatWidget],
});
