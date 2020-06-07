#include <ESP8266WiFi.h>          //ESP8266 Core WiFi Library (you most likely already have this in your sketch)
#include <DNSServer.h>            //Local DNS Server used for redirecting all requests to the configuration portal
#include <ESP8266WebServer.h>     //Local WebServer used to serve the configuration portal
#include <WiFiManager.h>          //https://github.com/tzapu/WiFiManager WiFi Configuration Magic
#include <FirebaseArduino.h>
#include <ArduinoJson.h>
#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11
#define FIREBASE_HOST "thecookingbot.firebaseio.com"
#define FIREBASE_AUTH "vOeCjt60zxBdUQ8y0VXYai4j4a7vXEw5Gn9XFj0y"
#define CHIP_ID ESP.getChipId()

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);     // Initialize the LED_BUILTIN pin as an output
  digitalWrite(LED_BUILTIN, LOW);
  connectToWifi();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  dht.begin();
  Serial.println("Reached end");
}

// the loop function runs over and over again forever
void loop() {
  getSensorData();
}

void getSensorData(){
  double distance = 0;
  double distance2 = 0;
  double temp = 0;
  double humidity = 0;
  DynamicJsonBuffer jb;
  JsonObject& obj = jb.createObject();
  obj["type"] = "request";

  obj.printTo(Serial);
  
  boolean messageReady = false;
  String message = "";
  while(!messageReady){
    if(Serial.available()){
      message = Serial.readString();
      messageReady = true;
    }
  }

  JsonObject& retobj = jb.parseObject(message);
  if(!retobj.success()){
    Serial.println("");
    return;
  }

  distance = retobj["distance"];
  distance2 = retobj["distance2"];
  temp = dht.readTemperature(true);
  humidity = dht.readHumidity();
  String path = CHIP_ID+"/";
  Firebase.setString("distance/", path+distance);
  Firebase.setString("distance2/", path+distance2);
  Firebase.setString("temp/", path+temp);
  Firebase.setString("humidity/", path+humidity);
//  Serial.println(distance);
}

void connectToWifi(){
  // WiFi Portal opens with sign in required data
  WiFiManager wifiManager;
  WiFiManagerParameter custom_text("<p>ESP needs to connect to WiFi to send data.</p>");
  wifiManager.addParameter(&custom_text);
  wifiManager.startConfigPortal("OnDemandAP");

  // Upon success, show IP Address
  Serial.println();
  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());
  digitalWrite(LED_BUILTIN, HIGH);
}
