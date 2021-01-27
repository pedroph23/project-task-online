import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, ImageBackground , Text, FlatList, Modal, Button } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/today.jpg';
import CommonStyle from '../../src/CommonStyle.js';
import Task from '../../src/components/Task.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTask from '../components/AddTask';
import ActionButton from 'react-native-action-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
 

export default class Agenda extends Component {

    constructor(props) {
        super(props);
    }
    
        
    state = {
        tasks: [
        {
            id: Math.random(),
            desc: 'Tarefa Pedente',
            estimateAt: new Date(),
            doneAt: null
        },
        {
            id: Math.random(),
            desc: 'Tarefa Concluido',
            estimateAt: new Date(),
            doneAt: new Date()
        },
        {
            id: Math.random(),
            desc: 'Tarefa Pedente',
            estimateAt: new Date(),
            doneAt: null
        },
        {
            id: Math.random(),
            desc: 'Tarefa Concluido',
            estimateAt: new Date(),
            doneAt: new Date()
        }],
        viewTasks: [],
        showAllTasks: true,
        showDoneTask: true,
        showAddTaskModal: false
    }

    // inicia aqui apos montado o componente e resolvido as childs
    componentDidMount = async () => {
        const data = await AsyncStorage.getItem('tasks');
        const tasks = JSON.parse(data) || [];
 
        this.setState({ tasks }, this.filterDoneTasks());
    }
   
    toggleTask = (id) => {
        const tasks = this.state.tasks.map( task => {
            if(task.id === id) {
                task =  {...task}
                task.doneAt = task.doneAt ? null : new Date();
            }
                return task;
            });

        this.setState({ tasks }, this.filterDoneTasks);
    };

    toggleEye = () => {
        this.setState({ showDoneTask: !this.state.showDoneTask }, this.filterDoneTasks);
    };

    filterDoneTasks = () => {
        
        if(this.state.showDoneTask) {
            this.setState({ viewTasks: [...this.state.tasks]});
        } else {
            this.setState({ viewTasks: this.state.tasks.filter(t => t.doneAt == null) });
        }
        AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    };

    onSave = (data) => { 
        this.setState({ ...this.state.tasks.push({ id: Math.random(), estimateAt: data.date, desc: data.text, doneAt: null }) });
        this.setState({viewTasks: this.state.tasks});
    }

    onDelete = (id) => {
        const state = {...this.state };
        state.tasks.map(task => {
            if (task.id === id) {
                state.tasks.pop(id);
            }
        });
        this.setState({ tasks: state.tasks }, this.filterDoneTasks);
    }

    exitModal = (exit) => {
        this.setState({showAddTaskModal: exit}, this.filterDoneTasks);
    }


    render() {
        return (
            <View style={ styles.container }>
                <ImageBackground source= { todayImage } style={ styles.background }>
                    <TouchableOpacity
                        style={ styles.iconCointainer }
                        onPress={ this.toggleEye }
                    >
                        <Text>
                            <Icon name={ this.state.showDoneTask ? 'eye' : 'eye-slash' } size={ 18 } color="#FFF" />
                        </Text>
                    </TouchableOpacity>
                    <View style={ styles.titleBar }>
                        <Text style={ styles.title }> Hoje </Text>
                        <Text style={ styles.subtitle }> 
                            { moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={ styles.taskContainer }>
                    <FlatList 
                        data={ this.state.viewTasks } 
                        renderItem={({ item }) => {
                            return <Task { ...item } toggleTask={ this.toggleTask } onDelete={ this.onDelete }/>
                        }}
                    >
                    </FlatList>
                    <Text> { this.state.showAddTaskModal }</Text>
                    <ActionButton
                        buttonColor="rgba(231,76,60,1)"
                        onPress={ () => { this.setState({ showAddTaskModal: true }) } }
                    />
                </View>
                <View>
                    <AddTask onSave={ this.onSave } showModal={ this.state.showAddTaskModal } exitModal={ this.exitModal } ></AddTask>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: CommonStyle.fontFamily,
        color: CommonStyle.colors.secundary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: CommonStyle.fontFamily,
        color: CommonStyle.colors.secundary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    taskContainer: {
        flex: 7
    },
    iconCointainer: {
        flex: 1,
        alignItems: 'flex-end',
        margin: 15
    },
    button: {
        borderRadius: 100,
        padding: 20,
        width: 100,
        flex: 1,
        flexDirection: 'column'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});
