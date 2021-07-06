import React, { Component } from 'react'
import { ColorValue } from 'react-native'
import { StyleSheet, View } from 'react-native'

type CircularIconProps = {
    icon: typeof Component,
    backgroundColor: ColorValue,
    fillColor: ColorValue,
    width?: number,
    height?: number,
    iconHeight: number,
    iconWidth: number
}

const CircularIcon = ({ icon: Icon, backgroundColor, fillColor, width = 40, height = 40, iconWidth, iconHeight, }: CircularIconProps) => {
    return (
        <View style={[styles.style, { backgroundColor, width, height }]}>
            <Icon fill={fillColor} height={iconHeight} width={iconWidth} />
        </View>
    )
}

export default CircularIcon

const styles = StyleSheet.create({
    style: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        padding: '8%',
    }
})
