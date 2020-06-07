![CookingBotLogo](/assets/images/CookingBotLogo.png)

The Cooking Bot is an inexpensive yet powerful device that aids as both a Cook Book and kitchen safety device.
With a multitude of sensors that monitor temperature, humidity, and distance, the Cooking Bot sends you a notification
if you are away from the cooking station for too long, detects an alarming drop in humidity or alarming rise in temperature,
or if it detects liquid overflow in your pots and pans! In addition, our unique timestamp|temperature software
allows you to create recipes with careful, reproducible accuracy. The notion of a "bad cook" would become delightfully impossible! 
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
Our biggest challenge was having two new members to Hackathons (out of 3). Our most experienced member spent most of his time on the hardware and both of the new members had no experience with Firebase, IOT, Hackathons, React, React-Native, or 
Expo CLI. We spent the better part of 8 hours just trying to figure out what was going on and maintaining calm as we attempted navigating through an environment (literally) that was extraordiarily daunting. New language, new APIs, new to such extensive virtual collaboration, the list goes on... It's safe to say we walked away learning a lot.

## Accomplishments that we're proud of
We were really happy to pull something together despite all the panic, confusion, and frenzy. All of us fell in love with the project that we were cultivating throughout the Hackathon, and it evolved into something that we felt could really help the world. It was interesting to see the interplay between hardware and software come to life in the form of an IOT App that could be downloaded across all platforms, and the journey helped us become better engineers as a whole.

## What we Learned
Throughout our research on the project, we learned how serial communication works, the nuances of power distribution among sensors, and organization schematics for hardware systems. In software, we learned how to utilize libraries and APIs that can be found online, and we learned how to approach app development from the lens of a full-stack developer. React-Native was very difficult to grab ahold of, but well worth it in the end as our ability to use Frameworks to create broad-reaching applications greatly increased.

## What is Next
The wonderful thing about this idea is that it can go in so many more directions. We could use networks to communicate with emergency services in the case of emergency situations faster than fire-detectors and faster than people. We have the ability to gamify our device by awarding those who stay in the cooking station more frequently. We could create a community system that allows everyone to share their wonderful recipes across the globe. We could add increased data analysis with machine learning that tells us more than the eye can meet about the sensor readings and its impact on food and safety. We could add calorie tracking, ingredient tracking, and grocery shopping into our app, and this is all just the tip of the iceberg lettuce.  

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



