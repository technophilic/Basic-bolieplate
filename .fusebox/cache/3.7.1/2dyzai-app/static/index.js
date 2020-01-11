module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nrequire(\"./index.css\");\nconst agora_rtc_sdk_1 = require(\"agora-rtc-sdk\");\n/**\n * @name handleFail\n * @param err - error thrown by any function\n * @description Helper function to handle errors\n */\nlet handleFail = function (err) {\n    console.log(\"Error : \", err);\n};\n// Queries the container in which the remote feeds belong\nlet remoteContainer = document.getElementById(\"remote-container\");\n/**\n * @name addVideoStream\n * @param streamId\n * @description Helper function to add the video stream to \"remote-container\"\n */\nfunction addVideoStream(streamId) {\n    let streamDiv = document.createElement(\"div\"); // Create a new div for every stream\n    streamDiv.id = streamId; // Assigning id to div\n    streamDiv.style.transform = \"rotateY(180deg)\"; // Takes care of lateral inversion (mirror image)\n    remoteContainer.appendChild(streamDiv); // Add new div to container\n}\n/**\n * @name removeVideoStream\n * @param evt - Remove event\n * @description Helper function to remove the video stream from \"remote-container\"\n */\nfunction removeVideoStream(evt) {\n    let stream = evt.stream;\n    stream.stop();\n    let remDiv = document.getElementById(stream.getId());\n    remDiv.parentNode.removeChild(remDiv);\n    console.log(\"Remote stream is removed \" + stream.getId());\n}\ndocument.getElementById(\"start\").onclick = function () {\n    // Client Setup\n    // Defines a client for RTC\n    let client = agora_rtc_sdk_1.default.createClient({\n        mode: 'live',\n        codec: \"h264\"\n    });\n    // Client Setup\n    let appid = document.getElementById(\"app-id\").value;\n    let channelid = \"any-channel\";\n    let userid;\n    // Defines a client for Real Time Communication\n    client.init(appid, () => console.log(\"AgoraRTC client initialized\"), handleFail);\n    // The client joins the channel\n    client.join(null, channelid, String(Date.now()).substr(7), (uid) => {\n        var localStream = agora_rtc_sdk_1.default.createStream({\n            video: true,\n            audio: false,\n        });\n        localStream.init(function () {\n            localStream.play('me');\n            client.publish(localStream); // Publish it to the channel\n        });\n        console.log(`App id : ${appid}\\nChannel id : ${channelid}\\nUser id : ${uid}`);\n    }, handleFail);\n    //When a stream is added to a channel\n    client.on('stream-added', function (evt) {\n        client.subscribe(evt.stream, handleFail);\n    });\n    //When you subscribe to a stream\n    client.on('stream-subscribed', function (evt) {\n        let stream = evt.stream;\n        addVideoStream(stream.getId());\n        stream.play(stream.getId());\n    });\n    //When a person is removed from the stream\n    client.on('stream-removed', removeVideoStream);\n    client.on('peer-leave', removeVideoStream);\n};\n",
dependencies: ["./index.css","agora-rtc-sdk"],
sourceMap: {},
headerContent: undefined,
mtime: 1578778390448,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
