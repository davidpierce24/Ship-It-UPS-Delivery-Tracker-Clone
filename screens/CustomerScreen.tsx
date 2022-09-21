import { View, Text, SafeAreaView, ScrollView, Image, TextInput } from 'react-native'
import React from 'react'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigator/RootNavigator'
import { useLayoutEffect } from 'react'
import { Input } from '@rneui/base'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { GET_CUSTOMERS, GET_ORDERS } from '../graphql/queries'
import CustomerCard from '../components/CustomerCard'
// import { Image } from '@rneui/themed'

export type CustomerScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, 'Customers'>, NativeStackNavigationProp<RootStackParamList>>

const CustomerScreen = () => {
    const navigation = useNavigation<CustomerScreenNavigationProp>();
    const [input, setInput] = useState<string>("");
    const { loading, error, data } = useQuery(GET_CUSTOMERS)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <ScrollView className="bg-[#59C1CC]">
            <Image 
                source={{
                    uri: "https://links.papareact.com/3jc"
                }}
                className='w-full h-64'
            />
            <View className="bg-white pt-5 pb-0 px-5">
                <Input 
                placeholder="Search by Customer" 
                value={input} 
                onChangeText={(text) => setInput(text)} 
                />
            </View>

            {data?.getCustomers
                ?.filter((customer: CustomerList) => customer.value.name.includes(input))
                .map(({ name:ID, value: { email, name } }: CustomerResponse) => (
                    <CustomerCard key={ID} email={email} name={name} userId={ID} />
            ))}
            
        </ScrollView>
    )
}

export default CustomerScreen