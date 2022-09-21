import { View, Text, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import useOrders from '../hooks/useOrders';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import OrderCard from '../components/OrderCard';

export type OrdersScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, 'Orders'>, NativeStackNavigationProp<RootStackParamList>>;


const OrdersScreen = () => {
    const navigation = useNavigation<OrdersScreenNavigationProp>();
    const { loading, error, orders } = useOrders();
    const [ascending, setAscending] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            tabBarLabel: ({ focused, color }) => (
                <Text style={{ color: focused ? "#EB6A7C" : color, fontSize:10 }}>
                    Orders
                </Text>
            )
        })
    }, []);

    return (
        <ScrollView className="bg-[#EB6A7C]">
            <Image 
                source={{ uri: "https://links.papareact.com/m51" }}
                className="w-full h-64"
            />

            <View>
                <View className="py-2 px-5">
                    <Button 
                        onPress={() => setAscending(!ascending)}
                        color="pink"
                        titleStyle={{color: "gray", fontWeight:"400"}}
                        >
                        {ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
                    </Button>
                </View>

                {orders?.sort((a,b) => {
                    if(ascending) {
                        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
                    } else{
                        return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
                    }
                }).map((order) => (
                    <OrderCard key={order.trackingId} item={order} />
                ))}
            </View>
        </ScrollView>
    )
}

export default OrdersScreen