import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";

export const openChatWidget = createAction({
  auth,
  name: "Open Comet Chat Widget",
  options: option.object({
    useGroup: option.boolean.layout({
      label: "Group Chat",
      defaultValue: true,
    }),
    groupId: option.string.layout({
      label: "Group ID",
    }),
    userId: option.string.layout({
      label: "User ID",
    }),
    chatWidgetKey: option.string.layout({
      label: "Chat Widget Key",
      helperText:
        "[Finding chat widget key](https://docs.typebot.io/editor/blocks/integrations/zendesk#open-web-widget)",
    }),
  }),
  run: {
    web: {
      parseFunction: ({
        credentials: { appId, appRegion, authKey },
        options: { useGroup, groupId, userId, chatWidgetKey },
        variables,
        logs,
      }) => {
        console.log("appId: " + appId);
        console.log("userId: " + userId);
        logs.add({ status: "info", description: "in parse function" });
        return {
          args: {
            appId: appId ?? "",
            appRegion: appRegion ?? "",
            authKey: authKey ?? "",
            useGroup: "false",
            groupId: groupId ?? "",
            userId: userId ?? "",
            widgetKey: chatWidgetKey ?? "",
          },
          content: parseOpenChat(),
        };
      },
    },
  },
});

const parseOpenChat = () => {
  console.log("parsing chat function");

  return `(function (d, t) {
    var CC_URL = "https://widget-js.cometchat.io/v3/cometchatwidget.js";

    console.log("opening chat widget");

    var cc_script = d.createElement(t);
    var s = d.getElementsByTagName(t)[0];

    cc_script.id="cometchat";
    cc_script.src = CC_URL;
    s.parentNode.insertBefore(cc_script, s);

    cc_script.onload = function () {
      console.log("initializing chat widget");

      CometChatWidget.init({
        "appID": appId,
        "appRegion": appRegion,
        "authKey": authKey
      }).then(response => {
        console.log("Initialization completed successfully");
        // You can now call login function.
        CometChatWidget.login({
          "uid": "cometchat-uid-5"
        }).then(response => {
          console.log("launching chat widget");
          CometChatWidget.launch({
            "widgetID": widgetKey,
            "target": "#cometchat",
            "roundedCorners": "true",
            "height": "600px",
            "width": "800px",
            "defaultID": userId, //default UID (user) or GUID (group) to show,
            "defaultType": 'user' //user or group
          });
        }, error => {
          console.log("User login failed with error:", error);
          //Check the reason for error and take appropriate action.
        });
      }, error => {
        console.log("Initialization failed with error:", error);
        //Check the reason for error and take appropriate action.
      });
    };
    
  })(document, "script");
  `;
};
