# Dummy Whatsapp Clone

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Project Overview

This is a WhatsApp clone application where the data is just dummy. In the application, an api call has been implemented to the Bluprint Api created on apiary.io which you can see at https://whatsappclone.docs.apiary.io/. To test and run the application on your machine, see the guide here [`Getting Started`](https://github.com/tri-hariyadi/DummyWhatsappClone/tree/master#getting-started). If you want to test your application and don't want to bother running it on your machine, you can download the apk file at this link to test it on your Android device.
[`Download DummyWhatsappClone`](https://drive.google.com/file/d/1m1yEAtjDEzpfCTsHJ9eawRvDURSHY3UB/view?usp=sharing)

### List Of Chat
Displays user chat with other users.

<img src="https://raw.githubusercontent.com/tri-hariyadi/DummyWhatsappClone/master/Documentation/home.png" width="250"> <br/>

### List of Groups/DMs
Click the group button in bottom navigation to see list of Group chat

<img src="https://raw.githubusercontent.com/tri-hariyadi/DummyWhatsappClone/master/Documentation/list_of_group_chat.png" width="250"> <br/>

### Setting Profile
Click the setting button in bottom navigation to see setting profile

<img src="https://raw.githubusercontent.com/tri-hariyadi/DummyWhatsappClone/master/Documentation/setting_profile.png" width="250"> <br/>

### Chat screen with chat view, input box, and header
In first of list chat screen is use long list of dummy data for messages. You can see to stress test render and scroll performance.

<img src="https://raw.githubusercontent.com/tri-hariyadi/DummyWhatsappClone/master/Documentation/chat_screen.png" width="250"> <br/>

### Each message have message options/reaction bubble.
In Each message you can give a reaction with emoji

<img src="https://raw.githubusercontent.com/tri-hariyadi/DummyWhatsappClone/master/Documentation/buble_chat_reaction.png" width="250"> <br/>

### Able to send and see the message immediately using input box.
In chat screeen you can see and send message immediately using input box.

<img src="https://raw.githubusercontent.com/tri-hariyadi/DummyWhatsappClone/master/Documentation/send_message.png" width="250"> <br/>

### Able to click on the chat header to open user/group information.
To see detail contact, you can click the header chat.

<img src="https://raw.githubusercontent.com/tri-hariyadi/DummyWhatsappClone/master/Documentation/contact_info.png" width="250"> <br/>

### Ability to search messages content inside any chat screen.
If you want to search any message content in the chat screen you must click the header chat first an you will navigating to the detail user and can click search button for search the message content.

<img src="https://raw.githubusercontent.com/tri-hariyadi/DummyWhatsappClone/master/Documentation/search_message_content.png" width="250"> <br/>

### Ability to search a messages inside any list of chat screen.
Can search a message with friend or another person in list of chat screen.

<img src="https://raw.githubusercontent.com/tri-hariyadi/DummyWhatsappClone/master/Documentation/search_a_message_of_list_screen.png" width="250"> <br/>

# Getting Started

Running the project in your machine

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
