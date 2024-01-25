import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 1,
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Title 2',
        text: 'Other cool stuff',
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        backgroundColor: '#22bcb5',
    }
];

const Onboarding = () => {

    const [showHomePage, setShowHomePage] = useState(false);

    const buttonLabel = (label) => {
        return (
            <View style={{padding: 12, fontWeight: '600'}}>
                <Text>
                    {label}
                </Text>
            </View>
        )
    }
    if (!showHomePage) {
        return (
            <AppIntroSlider
                data={slides}
                renderItem={({item}) => {
                    return (
                        <View style={styles.container}>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>
                                {item.title}
                            </Text>
                            <Text style={{textAlign: 'center', marginTop: 20}}>
                                {item.text}
                            </Text>
                        </View>
                    )
                }}
                activeDotStyle={{
                    backgroundColor: '#00D49D',
                    width: 30,
                }}
                showSkipButton
                renderNextButton={() => buttonLabel("Next")}
                renderSkipButton={() => buttonLabel("Skip")}
                renderDoneButton={() => buttonLabel("Done")}
                onDone={() => {
                    setShowHomePage(true);
                }}
            />
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={setShowHomePage(false)}>
            <Text>
                Onboarding
            </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Onboarding
