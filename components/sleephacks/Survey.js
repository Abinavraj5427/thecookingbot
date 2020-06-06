import * as React from 'react';
import { Text, View, StyleSheet, Image, Picker, Button, Platform, ActionSheetIOS } from 'react-native';
//import {Storage} from 'aws-amplify';

export default class Survey extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      q1: questions[0].a[1],
      q2: questions[1].a[1],
      q3: questions[2].a[1],
    };
  }

  render() {
    return (
<View style={{flex: 1, flexDirection:"column",justifyContent:"space-around", backgroundColor: "#2C2F33"}}>
        {Platform.OS === 'android' &&
         questions.map((question) =>
            <View style={{alignItems: 'center'}}>
              <Text style ={{textAlign:'center', color: "white"}}> {question.q} </Text>
              <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
                <View>
                  <Picker 
                  style={{ height: 50, width: 100, color: "white" }} 
                  selectedValue = {this.state["q"+question.id]}
                  onValueChange={(ans, ansind) => 
                  {
                    this.setState({["q"+question.id]: ans});
                  }
                  }>
                    {
                      Object.keys(question.a).map(function(k, i){
                        return <Picker.Item label = {question.a[k]} value = {question.a[k]}/>;
                      })
                    }
                  </Picker>
                </View>
              </View>
            </View>
           )
          
        }
        
        {  Platform.OS === 'ios' &&
          
          questions.map((question) =>
            <View style={{alignItems: 'center'}}>
                <Text style ={{textAlign:'center', color: "white"}}> {question.q}</Text>
                <Button title = {this.state["q"+ question.id.toString()]} onPress = {() => {
                  ActionSheetIOS.showActionSheetWithOptions({
                    options: anslist(question.id-1),
                    cancelButtonIndex: 0,
                  },
                    (buttonIndex) => {
                      if(buttonIndex !== 0)
                      this.setState({["q"+question.id.toString()]: questions[question.id-1].a[buttonIndex]});
                    }
                  );
                }}/>
            </View>
          )
        }
  
        <Button title = "Submit" onPress = {() => {this.props.updateSurvey(false); saveAnsToBucket(this.state.q1, this.state.q2, this.state.q3)}}/>
      </View>
    );
  }
}

function anslist(key){
  var list = ["cancel"]
  for(var i = 0; i < Object.keys(questions[key].a).length; i++){
    if(questions[key].a[i] !== undefined)
      list.push(questions[key].a[i]);
  }
  return list;
}

function format(key){
  return "q"+key;
}
const questions = [
  { id:1,
    q: "How did you feel after you woke up?",
    a:{
      1: "energetic",
      2: "neutral",
      3: "tired",
      4: "dizzy",
    }
  },
  { id:2,
    q: "How were you woken up this morning?",
    a:{
      1: "alarm",
      2: "other person",
      3: "other",
    }
  },
  { id: 3,
    q: "I woke up _____ the alarm time.",
    a:{
      1: "before",
      2: "at",
      3: "after",
    }
  },
]

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});

function saveAnsToBucket(a1,a2,a3){
  var s = "a1: "+a1+"\na2: "+a2+"\na3: "+a3;
  // Storage.put(new Date().toISOString() + '.txt', s)
  // .then (result => console.log(result))
  // .catch(err => console.log(err));
}
