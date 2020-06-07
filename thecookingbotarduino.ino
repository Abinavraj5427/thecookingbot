#include <NewPing.h>
#include <ArduinoJson.h>
#define ULTRA_TRIGGER 10
#define ULTRA_RECEIVE 11
#define ULTRA2_POWER 3
#define ULTRA2_TRIGGER 5
#define ULTRA2_RECEIVE 4
#define ESP_POWER 6
#define MAX_DIST 100
NewPing sonar (ULTRA_TRIGGER, ULTRA_RECEIVE, MAX_DIST);
NewPing sonar2 (ULTRA2_TRIGGER, ULTRA2_RECEIVE, MAX_DIST);
String data;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(ULTRA2_POWER, OUTPUT);
//  pinMode(ESP_POWER, OUTPUT);
  
  digitalWrite(ULTRA2_POWER, HIGH);
//  digitalWrite(ESP_POWER, HIGH);
  
}

void loop() {
  // put your main code here, to run repeatedly:
//  Serial.print("The distance is: ");
//  Serial.println(sonar.ping_cm());
//  delay(1000);

  sendSensorData();
}

void sendSensorData(){
  bool messageReady = false;
  String message = "";
  while(Serial.available()){
    message = Serial.readString();
    messageReady = true;
  }

  if(messageReady){
//    Serial.print("B");
    DynamicJsonBuffer jb;
    JsonObject& retobj = jb.parseObject(message);
    if(!retobj.success()){
      Serial.println("");
      messageReady = false;
      return;
    }

    if(retobj["type"] == "request"){
      retobj["type"] = "response";
      retobj["distance"] = sonar.ping_cm();
      retobj["distance2"] = sonar2.ping_cm();
      retobj.printTo(Serial);
    }

    messageReady = false;
  }
}
