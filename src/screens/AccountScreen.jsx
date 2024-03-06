import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
//api
import { signedOut } from "../api/Authentication";

const AccountScreen = ({navigation}) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleInformation = () => {
        navigation.navigate("Information");
      };

    const handleRewards = () => {
        navigation.navigate("Rewards");
      };
    
    const handleMyRewards = () => {
        navigation.navigate("MyRewards");
      };
    
    const Logout = () => {
        signedOut()
    };

    return (
        <LinearGradient
        colors={["#00D49D", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 1]}
        style={styles.background}
        >
            <View style={tw`flex-1 `}>
                <View style={tw`bg-white h-4/6 mt-auto`}>
                    <View style={tw`mt-4 justify-center items-center `}>
                    <TouchableOpacity style={tw`p-5 w-full flex flex-row items-center justify-between`} onPress={handleInformation}>
                        <Text style={tw`text-lg`}>Information</Text>
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`p-5 w-full flex flex-row items-center justify-between`} onPress={handleRewards}>
                        <Text style={tw`text-lg`}>Rewards</Text>
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`p-5 w-full flex flex-row items-center justify-between`} onPress={handleMyRewards}>
                        <Text style={tw`text-lg`}>My Rewards</Text>
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`p-5 w-full flex flex-row items-center justify-between`} onPress={handleMyRewards}>
                        <Text style={tw`text-lg`}>Map</Text>
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`p-5 w-full flex flex-row items-center justify-between`} onPress={() => { setIsModalVisible(true) }}>
                        <Text style={tw`text-lg text-red-500 font-bold`}>Loguout</Text>
                    </TouchableOpacity>
                    <Modal
                        visible={isModalVisible} 
                        onRequestClose={() => { setIsModalVisible(false) }}
                        animationType='slide'
                        transparent={true}
                    >
                        <View style={styles.modalContainer}>
                        <View style={styles.modalStyle}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Log out of your account?</Text>
                            </View>
                            <View>
                                <Button title='Logout' color={'#FF005D'} onPress={Logout} />
                                <Button title='Cancel' onPress={() => { setIsModalVisible(false) }} />
                            </View>
                            
                        </View>
                        </View>
                    </Modal>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )

}

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    text: {
        marginTop: '10%',
        marginBottom: '5%',
        fontWeight: "bold",
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalStyle: {
        height: '25%',
        width: '100%',
        backgroundColor: 'white',
        // borderRadius: '25%',
    },
    background: {
        flex: 1,
      },
})
export default AccountScreen;
