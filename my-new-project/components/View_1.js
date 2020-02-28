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

    this.addItem = this.addItem.bind(this)
    this.addPost = this.addPost.bind(this)
    this.likeAction = this.likeAction.bind(this)
    this.dislikelikeAction = this.dislikelikeAction.bind(this)
    this.writeUserData = this.writeUserData.bind(this)
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("messages")
      .once("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initMessages = [];
          Object
            .keys(data)
            .forEach(message => initMessages.push(data[message]));
          this.setState({
            messages: initMessages
          })
        }
      });

      firebase
      .database()
      .ref()
      .child("posts")
      .once("value", snapshot => {
        const dat = snapshot.val()
        if (snapshot.val()) {
          const initPosts = [];
          Object
            .keys(dat)
            .forEach(post => initPosts.push(dat[post]));
          this.setState({
            posts: initPosts
          })
        }
      });

    firebase
      .database()
      .ref()
      .child("messages")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            messages: [data, ...prevState.messages]
          }))
        }
      })


      firebase
      .database()
      .ref()
      .child("posts")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            posts: [data, ...prevState.posts]
          }))
        }
      })
      

  }


  writeUserData(postID, title, likes, dislikes) {
    console.log("This is where the like goes")
  }

    handleClick = () => {
        console.log('I want to go pack a page');
    }

    nextS = () => {
        this.props.nextStep();
    }

    previousS = () => {
        this.props.prevStep();
    }

    addItem () {
      //if the message is empty, then don't do anything
      if(!this.state.message) return

      //It seems like you say where you intend to send the data first
      const newMessage = firebase.database().ref()
      .child("messages")
      .push();

      //then you actually send the data, which is from the state, and you then set the state to empty
      newMessage.set(this.state.message, () => this.setState({message: ''}))
    }

    likeAction () {
      return 0;

    }


    dislikelikeAction () {
      return 0;

    }

    addPost () {
      //If there is nothing in the posts state, then return
      if(!this.state.posts) return

      let d = new Date()
      let timestamp = Date.now()
      console.log(timestamp)
      //Set the destination of the new post
      const newPost = firebase.database().ref()
      .child("posts")
      .push();

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

    render() {
      try{
        console.log("This is the post object", this.state.posts)
        console.log("This is the messages object", this.state.messages)
      }
      catch(TypeError) {
        console.log("This is the post object", this.state.posts)
      }
        return (
            
            <SafeAreaView style={styles.container}>
            <Header
                title="Main Activity"
            />

            <View style={styles.msgBox}>
              <TextInput placeholder="Enter your message"
              value={this.state.message}
              onChangeText={(text) => this.setState({message: text})}
                style={styles.txtInput}
              />
              <Button title="Send" onPress={this.addPost}/>
            </View> 
            <FlatList data={this.state.messages}
            renderItem={
              ({item}) => 
              <View style={styles.card}>
                <Text style={styles.listItem}>
                  {item}
                </Text>

              </View>
              }
            />
            <FlatList data={this.state.posts}
            renderItem={
              ({item}) => 
              <View style={styles.card}>
                <Text style={styles.listItem}>
                  {item.time}
                </Text>
                <Text style={styles.listItem}>
                  {item.title}
                </Text>
                <Text style={styles.listItem}>
                  {item.likes}
                </Text>
                <Text style={styles.listItem}>
                  {item.dislikes}
                </Text>
                <Button title="Like" onPress={() => this.writeUserData("1234", item.title, item.likes, item.dislikes)}/>
                <Button title="Dislike" onPress={this.dislikeAction}/>
              </View>
              }
            />

            <TouchableOpacity onPress={this.nextS}>
              <Text style={styles.newPost}>
                  Create New Post
                  </Text>
                      <Ionicons name="ios-add-circle" size={72} color="#ff5757" style={styles.icon} />
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
