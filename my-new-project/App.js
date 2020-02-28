import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Header from './components/header'
import Loading_Page from './components/Loading_Page'
import View_1 from './components/View_1';
import View_2 from './components/View_2';
import View_3 from './components/View_3';
import View_1_1 from './components/View_1_1';
import View_2_1 from './components/View_2_1';

export class AppLayout extends Component {
  state = {
      step: 1,
      postWeView: '',
  }

  //Procedd to next step
  nextStep = () => {
      //We are pulling the step out of the state
      const { step } = this.state;
      this.setState({
          step: step + 1 //Increment by 1 to get to the next step
      })
  }


  nextestFunction = () => {
    console.log("this is the test");
  }

  //Go back to previous step
  prevStep = () => {
      //We are pulling the step out of the state
      const { step } = this.state;
      this.setState({
          step: step - 1 //Increment by 1 to get to the next step
      })
  }

  postV = (props) =>{
      //We are pulling the step out of the state
      const { step } = this.state;
      this.setState({
          step: 4, 
          postWeView: props,
      })
      console.log("This is thing: ", props)
  }

  timeLine = () => {
    //We are pulling the step out of the state
    const { step } = this.state;
    this.setState({
        step: 2 
    })
}

  searchPage = () => {
      const { step } = this.state;
      this.setState({
          step: 1
      })
  }

  render() {
      const { step } = this.state;
      const { postWeView } = this.state;
      
      switch(step) {
        case 1:
          return (
            <Loading_Page
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            />

          )
          case 2:
              return (
                <View_1_1
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                postV={this.postV}
                timeLine={this.timeLine}
                />

              )
          case 3:
              return (
                <View_2_1
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                />
              )
          case 4:
              return (
                  <View_3
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  postWeView={postWeView}
                  timeLine={this.timeLine}
                  />
              )
      }
  }
}

export default AppLayout