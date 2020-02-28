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
  _isMounted = false;

  constructor(props) {
    super(props)

    this.state = {
      message: '',
      messages: [],
      posts: [],
      post: '',
    }

    this.writeUserData = this.writeUserData.bind(this)
    this.postView = this.postView.bind(this)
    
  }

  componentDidMount() {
    this._isMounted = true;

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
      .child("posts")
      .on("child_changed", snapshot => {
        const data = snapshot.val();
        var newState = {}
        if (data) {
          for (var i in this.state.posts) {
            if(data.title === this.state.posts[i].title) {
              newState = this.state
              newState.posts[i] = data
            }
          }
          console.log("This is the new state", newState.posts)
          this.setState({posts: newState.posts})
        }
      })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }



  writeUserData(postID, time, title, likes, dislikes) {
    var newLikes = likes + 1
    firebase.database().ref('posts/' + time).set({
      time: time,
      title: title,
      likes: newLikes,
      dislikes : dislikes,
    });
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

    postView = (time) => {
      this.props.postV(time);
    }

    render() {
      console.log('Posts state: ', this.state.posts);
        return (
            
            <SafeAreaView style={styles.container}>
            <Header
                title="Main Activity"
            />

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
              <TouchableOpacity onPress={() => this.postView(item.time)}>
              <View style={styles.card}>
                <Text style={styles.listItemTime}>
                  {item.time}
                </Text>
                <Text style={styles.listItem}>
                  {item.title}
                </Text>
                <Text style={styles.listItemLikes}>
                  Likes: {item.likes}
                </Text>
                <Text style={styles.listItemDislikes}>
                  Dislikes: {item.dislikes}
                </Text>
              </View>
              </TouchableOpacity> 

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
  listItemTime: {
    fontSize: 7,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  listItemLikes: {
    fontSize: 7,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  listItemDislikes: {
    fontSize: 7,
    padding: 5,
    marginHorizontal: 10,
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
