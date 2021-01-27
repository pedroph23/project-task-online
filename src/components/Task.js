import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react';
import CommonStyle from '../CommonStyle.js'
import moment from 'moment';
import 'moment/locale/pt-br';
import Swipeable from 'react-native-swipeable';

export default props => {

    let check = null;

    if (props.doneAt) {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20}
                    color={ CommonStyle.colors.secondary } />
            </View>
        );
    } else {
        check = <View style={ styles.pending } />
    }

    const descStyle = props.doneAt !== null ?  { textDecorationLine: 'line-through'} : {};


    const leftContent = (
        <View style={ styles.exclude }>
            <Icon name="trash" size={ 20 } color='#FFF' />
            <Text style={ styles.excludeText }> Excluir </Text>
        </View>
    );
    return (
        <Swipeable 
            leftActionActivationDistance={ 200 } 
            onLeftActionRelease={() => props.onDelete(props.id)} 
            leftContent={ leftContent } 
        >
            <View style={ styles.container }>
                <TouchableWithoutFeedback 
                    onPress={ () => props.toggleTask(props.id)}> 
                    <View style= { styles.checkContainer }> 
                        { check } 
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.description, descStyle]}>
                        { props.desc }
                    </Text>
                    <Text style={ styles.date }>
                        { 
                            moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')
                        }
                    </Text>
                </View>
            </View>
        </Swipeable>
        
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
    },
    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555',
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontFamily: CommonStyle.fontFamily,
        color: CommonStyle.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: CommonStyle.fontFamily,
        color: CommonStyle.colors.subText,
        fontSize: 12,
    },
    exclude: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    excludeText: {
        fontFamily: CommonStyle.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10,
        fontSize: 12
    }
});
