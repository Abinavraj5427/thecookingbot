import React, {Component} from 'react';
import { ScrollView, FlatList, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

class ListComponent extends Component {
    constructor(props){
        super(props);
    }

    onPressTimeStamp(){
        this.props.navigation.navigate("Status");
    }
    render() {
        return (
            <ScrollView style={styles.scroll}>
                <FlatList
                    data={this.props.lap}
                    renderItem={({item, index}) => {
                        return(
                        <TouchableOpacity onPress={this.props.timeStamp}>
                            <Text key={index} style={styles.item}>
                                {`#${index+1}            `}{padToTwo(item.min)}:{padToTwo(item.sec)}
                            </Text>
                        </TouchableOpacity> 
                        )
                    }
                }
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        maxHeight: "63%",
        backgroundColor: "#C89933",
    },

    item: {
        padding: 10,
        fontSize: 23,
        height: 44,
        color: "#5C415D",
        textAlign: "center",
        backgroundColor: "#fff",
        marginBottom: 1
    },
})


export default ListComponent;