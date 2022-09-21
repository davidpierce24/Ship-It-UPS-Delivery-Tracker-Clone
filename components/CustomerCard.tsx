import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useCustomerOrders from '../hooks/useCustomerOrders';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../screens/CustomerScreen';
import { Card, Icon } from '@rneui/themed';

type Props = {
    userId: string;
    name: string;
    email: string;
};

const CustomerCard = ({ email, name, userId }: Props) => {
    const { loading, error, orders } = useCustomerOrders(userId);
    const navigation = useNavigation<CustomerScreenNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("MyModal", {
            name: name,
            userId: userId,
        })}>
            <Card containerStyle={{'padding': 20, 'borderRadius': 10,}}>
                <View>
                    <View className="flex-row justify-between">
                        <View>
                            <Text className="text-2xl font-bold">{name}</Text>
                            <Text className="text-sm color-[#59C1CC]">ID: {userId}</Text>
                        </View>
                    

                        <View className="flex-row items-center justify-end">
                            <Text className="color-[#59C1CC]">{loading? "loading..." : `${orders.length} x`}</Text>
                            <Icon 
                                name="box"
                                type="entypo"
                                color="#59C1CC"
                                size={50}
                                containerStyle={{marginLeft: 'auto', marginBottom: 20}}
                            />
                        </View>
                    </View>
                </View>
                <Card.Divider />
                <Text>{email}</Text>
            </Card>
        </TouchableOpacity>
    ) 
}

export default CustomerCard