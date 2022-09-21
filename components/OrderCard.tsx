import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card, Icon } from '@rneui/themed';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';

export type OrdersScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, 'Orders'>, NativeStackNavigationProp<RootStackParamList>>;

type Props = {
    item: Order;
};

const OrderCard = ({ item }: Props) => {
    const navigation = useNavigation<OrdersScreenNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Order", { order:item })}>
            <Card containerStyle={{ paddingHorizontal: 15, borderRadius: 10}}>
                <View className="flex-row justify-between items-center">
                    <View>
                        <Icon 
                            name="truck-delivery"
                            color={"#EB6A7C"}
                            type="material-community"
                        />
                        <Text className="text-[10px]">{new Date(item.createdAt).toDateString()} </Text>
                    </View>

                    <View>
                        <Text className="text-gray-400 text-[12px]">{item.carrier} - {item.trackingId}</Text>
                        <Text className="text-gray-500 text-xl">{item.trackingItems.customer.name}</Text>
                    </View>

                    <View className="flex-row items-center">
                        <Text className="text-sm color-[#EB6A7C]">{item.trackingItems.items.length} x</Text>
                        <Icon 
                            name="box"
                            type="feather"
                            containerStyle={{marginLeft: 2}}
                        />
                    </View>

                    <View>
                        <Text>{}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
} 

export default OrderCard