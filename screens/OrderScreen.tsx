import { View, Text } from 'react-native'
import React from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { useLayoutEffect } from 'react';
import DeliveryCard from '../components/DeliveryCard';

export type OrdersScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, 'Orders'>, NativeStackNavigationProp<RootStackParamList>>;

type OrdersScreenRouteProp = RouteProp<RootStackParamList, "Order">

const OrderScreen = () => {
    const navigation = useNavigation<OrdersScreenNavigationProp>();
    const { params: { order } } = useRoute<OrdersScreenRouteProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: order.trackingItems.customer.name, 
            headerTintColor: "#EB6A7C",
            headerTitleStyle: { color: "black" },
            headerBackTitle: "Deliveries",
        })
    }, [order])

    return (
        <View className="-mt-2">
            <DeliveryCard order={order} fullWidth={true} />
        </View>
    )
}

export default OrderScreen