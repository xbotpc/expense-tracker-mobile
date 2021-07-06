import React from 'react';
import { Pressable, StyleSheet, Text, Vibration } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

type NumbersPadProps = {
    onNumberPress: (id: string | number) => void
}

const numberPad = [
    {
        id: '1',
        title: '1'
    },
    {
        id: '2',
        title: '2'
    },
    {
        id: '3',
        title: '3'
    },
    {
        id: '4',
        title: '4'
    },
    {
        id: '5',
        title: '5'
    },
    {
        id: '6',
        title: '6'
    },
    {
        id: '7',
        title: '7'
    },
    {
        id: '8',
        title: '8'
    },
    {
        id: '9',
        title: '9'
    },
    {
        id: 'dot',
        title: '.'
    },
    {
        id: '0',
        title: '0'
    },
    {
        id: 'delete',
        title: 'Delete'
    },
];

const renderNumberPad = (item, index: number, onNumberPress) => {
    return (
        <Pressable style={[
            {
                flex: 1,
                borderBottomColor: 'green',
                borderBottomWidth: index > 8 ? 0 : 1,
                borderTopWidth: 0
            },
            [1, 4, 7, 10].includes(index)
                ? {
                    borderLeftWidth: 1, borderLeftColor: 'green',
                    borderRightWidth: 1, borderRightColor: 'green',
                }
                :
                {}
        ]}
            onPress={() => {
                Vibration.vibrate(4, false);
                onNumberPress(item.id)
            }}
        >
            <Text style={styles.numberStyle}>
                {item.title}
            </Text>
        </Pressable>
    )
}

const NumbersPad = ({ onNumberPress }: NumbersPadProps) => {
    return (
        <FlatList
            data={numberPad}
            renderItem={({ item, index }) => renderNumberPad(item, index, onNumberPress)}
            numColumns={3}
            keyExtractor={(item) => item.id}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flex: 1
            }}
        />
    )
}

export default NumbersPad;

const styles = StyleSheet.create({
    numberStyle: {
        textAlign: 'center',
        fontSize: 24,
        padding: '20%',
        color: 'green',
        fontWeight: '900',
        backgroundColor: 'white',
        textAlignVertical: 'center'
    }
})
