import { Modal, Text, View, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, Button } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import CommonStyle from "../CommonStyle";
import moment from 'moment';
import 'moment/locale/pt-br';
import React, { Component } from "react";

const initialState = { text: '', date:  new Date(), showDtePicker: false };

export default class AddTask extends Component {

  constructor(props) {
    super(props);
  }

   state = { ...initialState };

  openDatePicker = () => {
    this.state.showDtePicker = true;
    this.setState({ ...this.state.showDtePicker });
  }

  save = () => {
    const data = { ...this.state };
    
    this.props.onSave(data);
    this.exitModal();
    this.setState({ ...initialState });
  }

  setDate = (event, date) => {
    if (date) {
      this.setState({ date });
      this.setState({ showDtePicker: false });
    }
    this.setState({ showDtePicker: false });
  };

  exitModal = () => {
    this.props.exitModal(false);
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={ true }
        visible={ this.props.showModal }
      >
        <View style={styles.modal}
        >
          <View style={styles.cardModal}
          >
            <Text style={styles.modalText}>Nova tarefa!</Text>
            <View style={{
              padding: 20
            }}>
              <TextInput
                onChangeText={text => this.setState({ text })}
                value={ this.state.text }
                placeholder="Descrição..."
                style={ styles.inputModal }
              ></TextInput>
              <TouchableOpacity onPress={this.openDatePicker}>
                <Text style={{ color: 'skyblue' }}>
                  Clique para selecionar uma data
                </Text>
              </TouchableOpacity>
              {
                this.state.date ?
                  <View style={{ marginTop: '20%' }} >
                      <Text>
                        Data selecionada: { moment(this.state.date.toDateString()).locale('pt-br').format('ddd, D [de] MMMM') }
                      </Text>
                    <View style={ styles.contentCardButton }>
                      <TouchableOpacity onPress={this.save }>  
                        <View >
                          <Text style={ styles.styleButton }>Salvar</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={ this.exitModal }>  
                        <View >
                          <Text style={ styles.styleButton }>Cancelar</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                : 'null'
              }
            </View>
            {
              this.state.showDtePicker ? <RNDateTimePicker mode="calendar" value={ new Date() } onChange={ this.setDate } /> : null
            }
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: CommonStyle.fontFamily,
    color: CommonStyle.colors.secundary,
    backgroundColor: 'blue',
    padding: 15
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  cardModal: {
    width: 300,
    height: initialState ? 390 : 300,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  inputModal: {
    width: '100%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: '20%'
  },
  contentCardButton: {
    flexDirection: 'row-reverse', 
    marginTop: 20
  },
  styleButton: {
    padding: 12, 
    color: 'blue'
  }
});