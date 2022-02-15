import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Directions, TextInput } from 'react-native-gesture-handler';
import { Size } from 'react-native-ui-lib/generatedTypes/src/components/skeletonView';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import {
    getFirestore,
    query,
    getDocs,
    collection,
    doc,
    setDoc,
    where,
    addDoc,
    forEach,
    deleteDoc,
} from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { firebase, auth, db, storage } from '../firebase/config.js'

//component = function
function PTWorkoutCrud(navigation) {

    const [coreName, setCoreName] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [duration, setDuration] = useState('')
    const [program, setProgram] = useState('')
    const [docId, setDocId] = useState('')

    const data = {
        coreName,
        difficulty,
        duration,
        program,
    };
    const coreRef = collection(db, 'workout',);

    const onPressSaveButton = async () => {
        if (coreName == '') {
            alert("Name can not be empty")
        }
        const q = query(collection(db, "workout"), where("coreName", "==", coreName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setDocId(doc.id)
            coreRef
                .doc(docId)
                .update({data})
                .then((workoutDoc) => {
                    alert("Save Successfully")
                    console.log(workoutDoc)
                })
                .catch((e) => {
                    console.log(e)
                })
        })
    }

    const onPressCreateButton = () => {
        addDoc(coreRef,data).then(workoutDoc => {
            console.log(workoutDoc)
            alert("Create Successfully")
            navigation.navigate("PTHomeWorkout")
        })
    }

    const onPressDeleteButton = async () => {
        if (coreName == '') {
            alert("Name can not be empty")
        }
        const q = query(collection(db, "workout"), where("coreName", "==", coreName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setDocId(doc.id)
            deleteDoc(doc(db, "workout", docId))
        })
    }




    return (
        <View
            style={{
                backgroundColor: '#F0F8FF',
                flex: 1,
            }}>
            <View
                style={{
                    justifyContent: 'flex-start',
                    marginTop: 25,
                    flexDirection: 'row',
                }}>
                <View>
                    <Text
                        style={{
                            fontSize: 30,
                            marginLeft: 20,
                            fontWeight: '500',
                            color: 'black',
                        }}>
                        Workout
                    </Text>
                </View>
            </View>

            <View
                style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    margin: 10,
                    marginTop: 40,
                }}>
                <View
                    style={{
                        flexDirection: 'column',
                    }}>
                    <View
                        style={{
                            marginLeft: 40,
                            marginTop: 20,
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginTop: 10,
                            }}>
                            Name:
                        </Text>
                        <TextInput
                            style={{
                                color: 'black',
                            }}
                            value={coreName}
                            onChangeText={(text) => setCoreName(text)}
                            placeholder="Name workout"
                            placeholderTextColor={'grey'}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginTop: 10,
                            }}>
                            Difficulty:
                        </Text>
                        <TextInput
                            style={{
                                color: 'black',
                            }}
                            value={difficulty}
                            onChangeText={(text) => setDifficulty(text)}
                            placeholder="Difficulty"
                            placeholderTextColor={'grey'}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginTop: 10,
                            }}>
                            Duration:
                        </Text>
                        <TextInput
                            style={{
                                color: 'black',
                            }}
                            value={duration}
                            onChangeText={(text) => setDuration(text)}
                            placeholder="Duration"
                            placeholderTextColor={'grey'}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginTop: 10,
                            }}>
                            Program:
                        </Text>
                        <TextInput
                            style={{
                                color: 'black',
                            }}
                            value={program}
                            onChangeText={(text) => setProgram(text)}
                            placeholder="Program"
                            placeholderTextColor={'grey'}
                        />
                    </View>
                </View>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                }}>
                <TouchableOpacity
                    onPress={onPressSaveButton}
                    style={{
                        backgroundColor: '#6666FF',
                        borderRadius: 20,
                        height: 55,
                        width: 100,
                        marginVertical: 30,
                        marginHorizontal: 50,
                        justifycontent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 23,
                            marginVertical: 10,
                        }}>
                        Save
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={onPressDeleteButton}
                    style={{
                        backgroundColor: 'red',
                        borderRadius: 20,
                        height: 55,
                        width: 100,
                        marginVertical: 30,
                        marginLeft: 30,
                        justifycontent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 23,
                            marginVertical: 10,
                        }}>
                        Delete
                    </Text>
                </TouchableOpacity>

            </View>
            <TouchableOpacity
                onPress={onPressCreateButton}
                style={{
                    backgroundColor: '#4444ff',
                    borderRadius: 20,
                    height: 55,
                    width: 150,
                    marginVertical: 30,
                    marginLeft: 120,

                    justifycontent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 23,
                        marginVertical: 10,
                    }}>
                    Create
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default PTWorkoutCrud;