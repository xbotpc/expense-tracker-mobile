import React, { Component } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import CircularIcon from '../components/CircularIcon/CircularIcon';
import COMMON_STYLES from '../styles/textStyles';
import { CAR, FOOD, MEDICAL, MOBILE_RECHARGE, PET, SALARY, TRANSACTION_TYPES } from '../utils/CONSTANTS';

const data = [
    {
        sectionHeader: 'Today',
        data: [
            {
                categoryName: CAR,
                amount: 2000,
            },
            {
                categoryName: PET,
                amount: 8000,
            },
            {
                categoryName: MOBILE_RECHARGE,
                amount: 400,
            },
        ]
    },
    {
        sectionHeader: 'Yesterday',
        data: [
            {
                categoryName: SALARY,
                amount: 40000,
            },
            {
                categoryName: MEDICAL,
                amount: 470,
            },
            {
                categoryName: FOOD,
                amount: 10,
            },
            {
                categoryName: MEDICAL,
                amount: 470,
            },
            {
                categoryName: FOOD,
                amount: 10,
            },
            {
                categoryName: MEDICAL,
                amount: 470,
            },
            {
                categoryName: FOOD,
                amount: 10,
            },
            {
                categoryName: MEDICAL,
                amount: 470,
            },
            {
                categoryName: FOOD,
                amount: 10,
            },
            {
                categoryName: MEDICAL,
                amount: 470,
            },
            {
                categoryName: FOOD,
                amount: 10,
            },
            {
                categoryName: MEDICAL,
                amount: 470,
            },
            {
                categoryName: FOOD,
                amount: 10,
            },
            {
                categoryName: MEDICAL,
                amount: 470,
            },
            {
                categoryName: FOOD,
                amount: 10,
            },
            {
                categoryName: MEDICAL,
                amount: 470,
            },
            {
                categoryName: FOOD,
                amount: 10,
            },
        ]
    },
]

const renderExpenseItem = (item, Icon: typeof Component, isExpense: boolean) => {
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
    const onActionButtonPress = () => {
        navigation.navigate('ExpenseEntry');
    }

    return (
        <View style={{ position: 'relative' }}>
            <SectionList
                renderItem={({ item }) => {
                    const { isExpense, icon: Icon } = TRANSACTION_TYPES.find(x => x.type === item.categoryName);
                    return renderExpenseItem(item, Icon, isExpense);
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
            />
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
        </View >
    )
}

export default ExpenseList

const styles = StyleSheet.create({
    horizontalSpacing: {
        paddingHorizontal: 20
    }
})
