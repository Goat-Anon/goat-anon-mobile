import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

function Separator() {
  return <View style={styles.separator} />;
}



const FadeInView1 = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0
  
    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 2000,
        }
      ).start();
    }, [])
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }

const FadeInView2 = (props) => {
const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

React.useEffect(() => {
    Animated.timing(
    fadeAnim,
    {
        toValue: 1,
        duration: 5000,
    }
    ).start();
}, [])

return (
    <Animated.View                 // Special animatable View
    style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
    }}
    >
    {props.children}
    </Animated.View>
);
}

const FadeInView3 = (props) => {
const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

React.useEffect(() => {
    Animated.timing(
    fadeAnim,
    {
        toValue: 1,
        duration: 5000,
    }
    ).start();
}, [])

return (
    <Animated.View                 // Special animatable View
    style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
    }}
    >
    {props.children}
    </Animated.View>
);
}

export class Loading_Page extends Component {
    state = {
        fadeAnim: new Animated.Value(0),
    }

    nextS = () => {
        this.props.nextStep();
    }

    aFunction() {
        this.nextS()
    }

    render() {


        return (
            <SafeAreaView style={styles.container}>
            <View>
            <TouchableOpacity onPress={this.nextS}>
            <FadeInView1>
            <Image style={styles.Img} source={require('../Images/Mobile_Loading_Screen.png')} />
            </FadeInView1>
            <FadeInView2>
                <Text style={styles.title1}>
                    AN ANONYMOUS SOCIAL MEDIA
                </Text>
                <Text style={styles.title2}>
                    DISCUSSION APPLICATION
                </Text>
            </FadeInView2>
  
            <FadeInView3>
                <Text style={styles.sub1}>
                    Created by:
                </Text>
                <Text style={styles.sub2}>
                    Fabian Gaziano, Leo Gonsalvez, and Alexander Rus
                </Text>
                <Text style={styles.cs1}>
                    CS-4518: Mobile and Ubiquitous Computing
                </Text>
            </FadeInView3>

            </TouchableOpacity>


            
            


            </View>
            </SafeAreaView>
          );

    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff5757',
  },
  title1: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 0,
    
    marginVertical: 8,
    color: 'white',
    fontFamily: 'Futura',
    fontWeight: 'bold',
  },
  title2: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 0,
    
    
    color: 'white',
    fontFamily: 'Futura',
    fontWeight: 'bold'
    
  },

  sub1: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 150,
    color: 'white',
    fontFamily: 'Futura',
  },
  sub2: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 5,
    color: 'white',
    fontFamily: 'Futura',
    
  },
  cs1: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 5,
    color: 'white',
    fontFamily: 'Futura',
    
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
  Img: {
    marginTop: -50,
    paddingTop: 10,
    marginLeft: 35,
    width: 300,
    height: 500,
    alignContent: 'center',
  }
});

export default Loading_Page;
