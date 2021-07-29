import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useReducer, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { addExpense } from '../api/addExpense';
import DoneIcon from '../assets/SVG/done.svg';
import ExpandIcon from '../assets/SVG/expand.svg';
import UploadFileIcon from '../assets/SVG/upload_file.svg';
import CircularIcon from '../components/CircularIcon/CircularIcon';
import NumbersPad from '../components/Numberpad/NumbersPad';
import { TRANSACTION_TYPES } from '../utils/CONSTANTS';
import isEmpty from '../utils/isEmpty';

interface ExpenseEntryProps {
    navigation?: any
}

const expenseCategories = TRANSACTION_TYPES;

const initialState = { amount: '0', selectedCategory: expenseCategories[0].type, date: new Date() }

const amountReducer = ({ amount, ...state }: typeof initialState, { payload, type }) => {
    switch (type) {
        case 'delete':
            return { ...state, amount: amount.slice(0, amount.length - 1) };

        case 'dot':
            return { ...state, amount: `${amount}${amount.includes('.') ? '' : '.'}` };

        case 'category':
            return { ...state, amount, selectedCategory: payload };

        case 'date':
            return { ...state, amount, date: payload };

        default:
            return { ...state, amount: `${amount === '0' ? '' : amount}${payload}` };
    }
}

const ExpenseEntry = ({ navigation }: ExpenseEntryProps) => {
    const [state, dispatch] = useReducer(amountReducer, initialState);

    const [show, setShow] = useState(false);
    const [imageData, setImageData] = useState({ uri: null, fileName: '' });
    const [showNumbersPad, setShowNumbersPad] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            headerRight: renderTickButton
        })
    }, [state]);

    const isValid = () => {
        const errors = []
        if (isEmpty(state.amount) || state.amount === '0') {
            errors.push('amount');
        }
        console.log('errors', errors)
        return errors;
    }

    const onHeaderRightPress = () => {
        if (isEmpty(isValid().length)) {
            console.log('herer')
            addExpense({
                categoryName: state.selectedCategory,
                isExpense: true,
                amount: state.amount,
                transactionDate: state.date
            }).then(([res, error]) => {
                if (error) {
                    console.log('error', error);
                } else {
                    console.log('res', res);
                    navigation.goBack();
                }
            }).catch(([res, err]) => {
                console.log('err', err);
            });
        } else {
            ToastAndroid.showWithGravity('Please enter amount', 200, ToastAndroid.BOTTOM);
        }
    }

    const renderTickButton = () => {
        return (
            <Pressable style={{ paddingHorizontal: 10 }} onPress={onHeaderRightPress}>
                <DoneIcon fill={'green'} width={30} height={30} />
            </Pressable>
        )
    }

    const onNumberPress = (value: string) => {
        dispatch({ type: value, payload: value });
    }

    const onCategorySelect = (type: string) => {
        dispatch({ type: 'category', payload: type });
    }

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || state.date;
        setShow(Platform.OS === 'ios');
        dispatch({ type: 'date', payload: currentDate })
    };

    const onExpandPress = () => {
        setShowNumbersPad((_state) => !_state);
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
        const { type, icon: Icon } = expenseCategories.find(x => x.type === state.selectedCategory);
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
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

    const onImagePickerPress = async () => {
        const { status, granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (granted) {
            let result: any = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                // allowsEditing: true,
                // aspect: [800, 800],
                quality: 0.5,
                exif: true
            });

            if (!result.cancelled) {
                const aa = result.uri.split('/');
                const extension = aa[aa.length - 1].split('.')[1];
                const fileName = `${state.selectedCategory}-${state.date.toISOString()}.${extension}`
                setImageData({ uri: result.uri, fileName: fileName.replace(/ /g, '-') });
            }
        } else if (status !== 'granted') {
            alert('We need media read permissions to upload images!');
        }
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
                <Text style={[styles.offWhiteText, { fontSize: 28, marginTop: 10 }]}>
                    Amount:
                </Text>
                <View style={{ height: 35, flexDirection: 'row' }}>
                    <Text style={[styles.amount, styles.whiteText, { flexBasis: 20 }]}>&#8377;</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Text style={[styles.amount, styles.whiteText]}>{state.amount}</Text>
                    </ScrollView>
                </View>
                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                    <Pressable onPress={() => setShow(true)}>
                        <Text style={[styles.dateString, styles.whiteText]}>
                            {state.date.toDateString()}
                        </Text>
                    </Pressable>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={state.date}
                            mode={'date'}
                            is24Hour={true}
                            display="calendar"
                            onChange={onDateChange}
                        />
                    )}
                </View>
                <View style={{
                    flexDirection: "row",
                    marginVertical: 20,
                }}>
                    {renderSelectedCategory()}
                    <Pressable onPress={onExpandPress}>
                        <ExpandIcon
                            fill={'white'}
                            width={48}
                            height={48}
                            marginTop={10}
                            transform={[{ rotate: showNumbersPad ? 0 : '180deg' }]}
                        />
                    </Pressable>
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
                <View style={{
                    flex: 1,
                    padding: showNumbersPad ? 0 : 20,
                }}>
                    {showNumbersPad ? (
                        <NumbersPad onNumberPress={onNumberPress} />
                    ) : (
                        <>
                            <TextInput
                                placeholder="Name"
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#bfbfbf',
                                    fontSize: 14,
                                    paddingBottom: 0
                                }}
                            />
                            <TextInput
                                placeholder="Description"
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#bfbfbf',
                                    fontSize: 14,
                                    paddingBottom: 0,
                                    marginTop: 20
                                }}
                                multiline
                                numberOfLines={5}
                            />
                            <Pressable onPress={onImagePickerPress}
                                style={{
                                    marginTop: 30,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#9a9a9a',
                                    padding: 5,
                                }}>
                                {/* <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}> */}
                                {!isEmpty(imageData.uri) ?
                                    <Image source={{ uri: imageData.uri }}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 8,
                                            backgroundColor: 'red'
                                        }}
                                    />
                                    : <UploadFileIcon fill={'green'} width={32} height={32} />
                                }
                                <Text style={{
                                    flex: 1,
                                    height: 20,
                                    fontSize: 18,
                                    marginLeft: 12,
                                    // backgroundColor: 'red',
                                }}
                                    ellipsizeMode='middle'
                                >
                                    {imageData.fileName ? imageData.fileName : 'Upload Image'}                                    </Text>
                                {/* </View> */}
                            </Pressable>
                        </>
                    )}
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
