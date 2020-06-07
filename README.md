![CookingBotLogo](/assets/images/CookingBotLogo.png)

The Cooking Bot is an inexpensive yet powerful device that aids as both a Cook Book and kitchen safety device.
With a multitude of sensors that monitor temperature, humidity, and distance, the Cooking Bot sends you a notification
if you are away from the cooking station for too long, detects an alarming drop in humidity or alarming rise in temperature,
or if it detects liquid overflow in your pots and pans! In addition, our unique timestamp|temperature software
allows you to create recipes with careful, reproducible accuracy. The notion of a "bad cook" would become delightfulyl impossible! 
Not to mention, these extraordinarily precise recipes are in a compressible, easy-to-use format that makes sharing across many platforms as easy as pie!

## Inspiration
Our parents (mothers) often scold us for not appreciating home-made food while we still have it. We wanted a way to enjoy the delicacy
of home-cooked food from our own kitchens, while also encouraging our more experienced counter-parts to be more mindful, and responsible
in the kitchen. According to the NFPA, cooking was the leading cause of reported home fires and home fire injuries. With the ideas of 
protecting those we love and spreading happiness in mind, The Cooking Bot was born.

## How We Built It

### Hardware: 
We wired together an ESP8266 with ultrasonic sensors, a humidity sensor, and a temperature sensor
in different directions to get many different datapoints at once. We used C++ to code the arduino that served as the controller for the 
ESP8266 and sensors. 

![Diagram](/assets/images/CookingBotDiagrampng.png)

### Software:
Both the front and backend were done with React-Native and Node.js, but all the sensor data was managed through firebase and
firebase APIs. We used Expo CLI to create Android and iOS apps simultaneously.

## Challenges we Ran Into

We built our project using  for React-Native. 

In this directory,  `npm test` to get our system working for both Android and IOS Apps.


Libraries Used:
- react-native
- react-native-firebase
- react-native-svg-charts
- @expo/vector-icons
- react-navigation
- expo
- moment
- react-native-stopwatch-timer



