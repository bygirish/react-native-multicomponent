
import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import EwFloatingLabel from '../ewfloatinglabel/ewfloatinglabel';

export default class Test extends Component<Props> {

  constructor(props, context) {

      super(props, context);

      this.initialState = {

            textInputValue: this.props.initialState == null ? '' : this.props.initialState.textInputValue,

      };

        this.state = this.initialState;


  }

  componentWillMount() {

     console.log("Inside componentWillMount");

     if(this.props.initialState == null) {

       this.props.updateParentState(this.getClientStateObject());

     }

  }

  componentWillReceiveProps(nextProps) {

    console.log( "In componentWillReceiveProps");
    console.log("New Props are - ", nextProps);

    /* Screen Pre-loading Data */

    if(this.isStateChanged(nextProps.initialState)) {

    //  console.log("Inside is State changed travel client account ",nextProps.initialState);

      this.setState({

        textInputValue: nextProps.initialState.textInputValue

      });


    }



  }

  render() {

    let { textInputValue } = this.state;

    return (
      <EwFloatingLabel

        label = "Dummy text"
        placeholderLabel = "Enter dummy text"
        autoCorrect = { false }
        onChangeText = {(textInputValue) => this.setState({ textInputValue })}
        value = { textInputValue }

      />

    );
  }

  componentDidUpdate() {

    console.log("Inside componentDidUpdate");

    if(this.isStateChanged(this.props.initialState) ) {

      console.log("updating master screen",this.getClientStateObject());

      this.props.updateParentState(this.getClientStateObject());

    }

  }

  isStateChanged(initialState) {

    if(JSON.stringify(initialState) != JSON.stringify(this.getClientStateObject()))
      return true;

    return false;

  }

  getClientStateObject() {

    var testObject = {

      textInputValue: this.state.textInputValue,

    };

    return testObject;


  }
}
