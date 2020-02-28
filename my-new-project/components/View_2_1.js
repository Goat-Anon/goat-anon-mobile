import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import Header from './header';
import Card from './Post';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase'

function Separator() {
  return <View style={styles.separator} />;
}



var firebaseConfig = {
  apiKey: "AIzaSyA5WCvDnyPY1Z7q_n4GSKWqFZlQ3lag9jQ",
  authDomain: "goat-anon-mobile.firebaseapp.com",
  databaseURL: "https://goat-anon-mobile.firebaseio.com",
  projectId: "goat-anon-mobile",
  storageBucket: "goat-anon-mobile.appspot.com",
  messagingSenderId: "147469837556",
  appId: "1:147469837556:web:1050dcef55c4a22de36aa1",
  measurementId: "G-4XBLCGQR5J"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
}



export class View_1_1 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      message: '',
      messages: [],
      posts: [],
      post: '',
    }

    this.addPost = this.addPost.bind(this)
  }

    nextS = () => {
        this.props.nextStep();
    }

    previousS = () => {
        this.props.prevStep();
    }

    addPost () {
      //If there is nothing in the posts state, then return
      if(!this.state.posts) return

      let d = new Date()
      let timestamp = Date.now()
      console.log(timestamp)
      //Set the destination of the new post
      const newPost = firebase.database().ref()
      .child("posts").push();

      console.log("This is the data:", d)
      var postData = {
        "title": this.state.message,
        "time": d.toString(),
        "likes": 0,
        "dislikes": 0,
      }
      //Send the post
      newPost.set(postData)
    }

    writeUserData() {
        let d = new Date()
        let timestamp = Date.now()
        firebase.database().ref('posts/' + d.toString()).set({
          title: this.state.message,
          time: d.toString(),
          likes: 0,
          dislikes : 0,
        });
        this.previousS()
      }

    render() {
        return (
            
            <SafeAreaView style={styles.container}>
            <Header
                title="Create New Post"
            />
            <Text style={styles.sub1}>
                Enter a New Post! (Max Size: 200 characters)
            </Text>

            <View>
              <TextInput placeholder="Enter your message"
              value={this.state.message}
              onChangeText={(text) => this.setState({message: text})}
              multiline={true}
                maxLength={200}
                style={{ height: 250, borderColor: 'gray', borderWidth: 0.5, marginTop: 10 }}
              />
            </View> 

 
            <TouchableOpacity onPress={() => this.writeUserData()}>
            <View style={styles.midBar}>
            <Text style={styles.text1}>
                    Add to Timeline
                </Text>
                </View>
                    <Ionicons name="ios-add-circle" size={50} color="#fff" style={styles.icon} />
                
            </TouchableOpacity>
            
            </SafeAreaView>
          );

    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  back_icon: {
      marginTop: 10,
  },
  sub1: {
    color: '#ff5757',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  midBar: {
    height: 50,
    backgroundColor: '#ff5757',
    width: 400,
    marginLeft: -20,
  },
  text1: {
    marginTop: 10,
    marginLeft: 20,
    color: '#fff',
    fontSize: 23,
    textAlign: 'left',
    fontFamily: 'Futura',
    fontWeight: 'bold',
  },
  icon: {
      position: 'absolute',
      left: 210,
      top: 375,
  },
  txtInput: {
    flex: 1
  },
  msgBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
  },
  listItemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 5
  },
  listItem: {
    fontSize: 20,
    padding: 10,
    marginHorizontal: 18,
    marginVertical: 10,
  },    
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6

  },
  newPost: {
    color: '#ff5757',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default View_1_1;
