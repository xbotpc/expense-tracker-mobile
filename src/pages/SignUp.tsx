import React from 'react'
import { useState } from 'react'
import { Button } from 'react-native'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const SignUp = ({ navigation }) => {

    const [OTPCalled, setOTPCalled] = useState(false);

    const onSendOTPClick = () => {
        // Sign up API Call
        if (OTPCalled) {
            // go to dashboard
            navigation.navigate('ExpenseList');
        } else {
            setOTPCalled(true);
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: '20%' }}>
            <Text style={{
                fontSize: 34,
                fontWeight: 'bold',
                color: 'green'
            }}>Expense Tracker</Text>
            <View style={{ marginVertical: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Track your expenses with your family.</Text>
                <Text style={{ fontSize: 20 }}>Decide your family budget</Text>
            </View>

            <View style={{ marginTop: 60, marginBottom: 40, alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Enter your mobile number</Text>
                <Text style={{ color: '#7e7e7e' }}>You will receive a four digit code</Text>
            </View>
            <TextInput placeholder={OTPCalled ? 'Enter OTP' : 'Enter your number'} />
            <Button title={OTPCalled ? 'Verify OTP' : 'SEND OTP'} onPress={onSendOTPClick} />
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({})
