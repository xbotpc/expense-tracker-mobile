import React, { Component, useEffect, useState } from 'react';
import { Modal, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { getTransactions } from '../api/expenseList';
import RefreshIcon from '../assets/SVG/refresh.svg';
import CircularIcon from '../components/CircularIcon/CircularIcon';
import COMMON_STYLES from '../styles/textStyles';
import { TRANSACTION_TYPES } from '../utils/CONSTANTS';
import isEmpty from '../utils/isEmpty';

const renderTransaction = (item, Icon: typeof Component, isExpense: boolean) => {
    return (
        <View style={[
            styles.horizontalSpacing,
            {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 8
            }
        ]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CircularIcon
                    icon={Icon}
                    backgroundColor={'green'}
                    fillColor={'white'}
                    iconHeight={25}
                    iconWidth={25}
                />
                <Text style={
                    [
                        COMMON_STYLES.blackText,
                        COMMON_STYLES.capitalize,
                        { marginLeft: 10 }
                    ]}>
                    {item.categoryName}
                </Text>
            </View>
            <Text style={{
                color: isExpense ? 'red' : 'green',
                fontSize: 18
            }}>
                {isExpense ? '-' : '+'} &#8377;{item.amount}
            </Text>
        </View>
    );
}

const ExpenseList = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // getTransactions()
        //     .then((x) => {
        //         setData(x);
        //         setIsLoading(false);
        //     })
        //     .catch((x) => {
        //         setIsLoading(false);
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     })
    }, []);

    useEffect(() => {
        // const subscribe = navigation.addListener('focus', () => {
        //     setIsLoading(true);
        //     getTransactions()
        //         .then((x) => {
        //             setData(x);
        //             setIsLoading(false);
        //         })
        //         .catch((err) => {
        //             setIsLoading(false);
        //         })
        // });
        // return subscribe;
    }, [navigation])

    const onActionButtonPress = () => {
        navigation.navigate('ExpenseEntry');
    }

    return (
        <View style={{ position: 'relative', flex: 1, paddingBottom: 65 }}>
            {!isEmpty(data.length) ? <SectionList
                renderItem={({ item }) => {
                    const { isExpense, icon: Icon } = TRANSACTION_TYPES.find(x => x.type === item.categoryName);
                    return renderTransaction(item, Icon, isExpense);
                }}
                sections={data}
                renderSectionHeader={({ section }) => {
                    return (
                        <Text style={[
                            {
                                paddingVertical: 12,
                                color: 'green',
                                backgroundColor: '#efefef',
                            },
                            styles.horizontalSpacing
                        ]}>
                            {section.sectionHeader}
                        </Text>
                    )
                }}
                keyExtractor={(item, index) => item.categoryName + item.amount + index}
                stickySectionHeadersEnabled
            /> : null}
            <Pressable style={{ position: 'absolute', bottom: '2%', right: '4%' }} onPress={onActionButtonPress}>
                <View style={{
                    backgroundColor: 'green',
                    borderRadius: 50,
                    width: 60,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={[COMMON_STYLES.whiteText, { fontSize: 48, lineHeight: 55 }]}>+</Text>
                </View>
            </Pressable>
            {isLoading && (
                <Modal
                    transparent
                    animationType={'fade'}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <RefreshIcon width={48} height={48} fill={'#22d336'} />
                    </View>
                </Modal>
            )}
        </View >
    )
}

export default ExpenseList

const styles = StyleSheet.create({
    horizontalSpacing: {
        paddingHorizontal: 20
    }
})
