import React ,{useEffect} from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your desired icon library
import AsyncStorage from "@react-native-async-storage/async-storage";

//db
import { db } from "../../../firebaseConfig";
import {
  getDoc,
  getDocs,
  doc,
  collection,
  listCollections,
  query,
} from "firebase/firestore";

const FriendsScreen = () => {
    const [text, setText] = React.useState("");
    // const [text, setText] = useState('');

    const handleChangeText = (inputText) => {
        setText(inputText);
    };

    useEffect(() => {
        getUser();
      }, []);
    
      const getUser = async () => {
        const username = await AsyncStorage.getItem("username");
        const docRef = collection(db,'UserInfo');
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
            if (doc.exists()) {
              const userData = doc.id;
              console.log('User data:', userData);
            } else {
              console.log('User not found');
            }
          });

       
      };



    return (
        <View style={styles.container}>
            <View style={styles.greenContainer}>
                <Text style={styles.textHeader}>Friends</Text>
                <View style={{ height: 50 }}></View>
                <View style={styles.inputContainer}>
                    <Icon name="search" size={20} color="white" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChangeText}
                        value={text}
                        placeholderTextColor="white"
                        backgroundColor='#313047'
                        placeholder="Search your friend or #"
                    />
                </View>
            </View>

            <View style={styles.whiteContainer}>
                <View style={styles.height}></View>
                <Text style={styles.textTitle}>Request friends</Text>
                <View style={styles.height20}></View>
                <Text style={styles.textSubTitle}>No request</Text>
                <View style={styles.height20}></View>
                <View style={{ flexDirection: 'row', }}
                >
                    <Text style={styles.textTitle}>Your friends </Text>
                    <View style={{
                        marginTop: 5,
                        width: 20,
                        height: 20,
                        borderRadius: 50,
                        backgroundColor: '#313047',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>3</Text>
                    </View>
                </View>

                <View style={styles.height20}></View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    <View style={{ flexDirection: 'column', }}>
                        <View style={styles.circle}>
                        </View>
                        <Text style={{ textAlign: 'center', }}>Gun</Text>
                    </View>

                    <View style={{ flexDirection: 'column', }}>
                        <View style={styles.circle}>
                        </View>
                        <Text style={{ textAlign: 'center', }}>Tee</Text>
                    </View>

                    <View style={{ flexDirection: 'column', }}>
                        <View style={styles.circle}>
                        </View>
                        <Text style={{ textAlign: 'center', }}>Fluke</Text>
                    </View></View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        flex: 3,
        backgroundColor: 'white',
        width: '100%',
    },
    greenContainer: {
        height: 200,
        backgroundColor: '#00D49D',
        alignItems: 'center',
        width: '100%',
    },
    textHeader: {
        paddingTop: 30,
        color: '#313047',
        fontSize: 25,
        fontWeight: 'bold',

    },
    textTitle: {
        color: '#313047',
        fontSize: 20,
        fontWeight: 'bold',

    },
    textSubTitle: {
        textAlign: 'center',
        color: '#8F8F8F',
        fontSize: 16,
        fontWeight: 'regular',

    },
    height: {
        height: 10
    },
    height20: {
        height: 20
    },
    circle: {
        width: 90,
        height: 90,
        borderWidth: 5,
        borderRadius: 50,
        borderColor: '#313047',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '70%',
        height: 40,
        borderWidth: 0,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18
    },
    icon: {
        marginRight: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#313047',
        borderRadius: 15,
        paddingHorizontal: 10,
    },
});


export default FriendsScreen;

