import React, { useEffect, useReducer, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import DoneIcon from '../assets/SVG/done.svg';
import CircularIcon from '../components/CircularIcon/CircularIcon';
import NumbersPad from '../components/Numberpad/NumbersPad';
import { TRANSACTION_TYPES } from '../utils/CONSTANTS';

interface ExpenseEntryProps {
}

const expenseCategories = TRANSACTION_TYPES;

const expenseAmount = { amount: '0' }

const amountReducer = ({ amount }: typeof expenseAmount, { payload, type }) => {
    switch (type) {
        case 'delete':
            return { amount: amount.slice(0, amount.length - 1) };

        case 'dot':
            return { amount: `${amount}${amount.includes('.') ? '' : '.'}` };

        default:
            return { amount: `${amount === '0' ? '' : amount}${payload}` };
    }
}

const ExpenseEntry = ({ navigation }) => {
    const [state, dispatch] = useReducer(amountReducer, expenseAmount);
    const [selectedCategory, setSelectedCategory] = useState<string>(expenseCategories[0].type);

    const onHeaderRightPress = () => {
        console.log('herer');
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable style={{ paddingHorizontal: 10 }} onPress={onHeaderRightPress}>
                    <DoneIcon fill={'green'} width={30} height={30} />
                </Pressable>
            )
        })
    }, []);

    const onNumberPress = (id: string) => {
        dispatch({ type: id, payload: id });
    }

    const onCategorySelect = (index: string) => {
        setSelectedCategory(index);
    }

    const renderCategories = () => {
        return expenseCategories.map(({ icon: Icon, type }, i, arr) => {
            return (
                <Pressable style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    backgroundColor: "green",
                    marginRight: i === arr.length - 1 ? 0 : 10
                }}
                    key={`${type}-${i}`}
                    onPress={() => onCategorySelect(type)}>
                    <CircularIcon
                        icon={Icon}
                        backgroundColor={'green'}
                        fillColor={'white'}
                        iconHeight={35}
                        iconWidth={35}
                    />
                </Pressable>
            )
        })
    }

    const renderSelectedCategory = () => {
        const { type, icon: Icon } = expenseCategories.find(x => x.type === selectedCategory);
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CircularIcon
                    icon={Icon}
                    backgroundColor={'white'}
                    fillColor={'green'}
                    iconHeight={35}
                    iconWidth={35}
                />
                <View style={{ marginHorizontal: 10, flex: 1 }}>
                    <Text style={[styles.offWhiteText, { fontSize: 16 }]}>Category</Text>
                    <Text style={[styles.whiteText, { fontSize: 22 }]}>{type}</Text>
                </View>
            </View>
        );
    }

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'green',
                padding: 15,
                paddingBottom: 0,
                justifyContent: 'flex-end'
            }}>
                <Text style={[styles.dateString, styles.whiteText]}>
                    {new Date().toDateString()}
                </Text>
                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                    <Text style={[styles.offWhiteText, { fontSize: 28, marginTop: 10 }]}>
                        Enter Amount:
                    </Text>
                    <View style={{ height: 35, flexDirection: 'row' }}>
                        <Text style={[styles.amount, styles.whiteText, { flexBasis: 20 }]}>&#8377;</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <Text style={[styles.amount, styles.whiteText]}>{state.amount}</Text>
                        </ScrollView>
                    </View>
                </View>
                <View style={{
                    justifyContent: 'flex-end',
                    marginVertical: 20,
                }}>
                    {renderSelectedCategory()}
                </View>
            </View>
            <View style={{
                flex: 1.2,
            }}>
                <View style={{
                    height: 75
                }}
                >
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{
                            backgroundColor: 'white',
                            padding: 10,
                        }}>
                        {renderCategories()}
                    </ScrollView>
                </View>
                <View style={{ flex: 1 }}>
                    <NumbersPad onNumberPress={onNumberPress} />
                </View>
            </View>
        </View >
    )
}

export default ExpenseEntry

const styles = StyleSheet.create({
    amount: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    whiteText: {
        color: 'white'
    },
    offWhiteText: {
        color: '#dbdbdb'
    },
    dateString: {
        fontSize: 32
    }
})
