import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import QuizItem from '../components/QuizItem'
import db from '../FirebaseConfig'

export default function MyQuizes({ navigation }) {
    const [quiz, setQuiz] = useState([])
        /*"quiz_name": "Algebra Quiz",
        "quiz_img_uri": "https://squeakychimp.com/wp-content/uploads/2016/11/math-algebra-legging-texture.jpg",
    },
    {
        "quiz_name": "McLaren Quiz",
        "quiz_img_uri": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.41HMsIq_KBbPKyjMe-J7GQHaFj%26pid%3DApi&f=1",
    },
    {
        "quiz_name": "Cricket Quiz",
        "quiz_img_uri": "https://wp-seo-mainpage.s3-accelerate.amazonaws.com/uploads/cricket-players.jpg",
    },
    {
        "quiz_name": "Advance Algorithm Quiz",
        "quiz_img_uri": "https://www.geeksforgeeks.org/wp-content/uploads/Competitive-Programming-1.jpg",
    },
    ]); */

    //function to handle when any quiz item is clicked on
    function handleQuizItemClick(item) {
        navigation.navigate('Quiz Details', {
            insertKey:item.x,
            quizImgUri:"",
            quizName:item.quizName,
            quizDesc:item.quizDesc,
            quizType:item.quizType,
        });
    }

    //fuction to hanlde when add new quiz btn is pressed on
    function handleAddNewQuizBtnClick() {
        navigation.navigate('CreateQuiz')
        //redirecting to CreateQuiz.js
    }

    useEffect(() =>{
        const quizesDbRef = db.ref('quizes');
            quizesDbRef
            .on('value',
            function(resp){
                const quizes = resp.val();
                if (quizes) {
                //sorting out quizes of that user
                    var myQuizes = [];
                    for (const x in quizes) 
                    {
                        myQuizes.push({x, ...quizes[x]});
                    }
                    setQuiz(myQuizes)
                }
            }
        )
    },[])

    //component rendering
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>My Quizzes</Text>
            <View style={styles.divider}></View>

            {
                quiz.map((item, idx) => {
                    return (
                        <QuizItem
                            key={idx}
                            index={idx}
                            name={item.quizName}
                            imageUrl=""
                            onPress={() => {handleQuizItemClick(item)}}
                        />
                    )
                })
            }

            <TouchableOpacity style={styles.addNewBtn} onPress={handleAddNewQuizBtnClick}>
                <Text style={styles.addNewBtnText}>+ Add new quiz</Text>
            </TouchableOpacity>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 60,
        paddingHorizontal: 30,
    },

    title: {
        fontWeight: '500',
        fontSize: 20,
        letterSpacing: 0.1,
        color: '#2E2E2E',
    },

    divider: {
        paddingVertical: 8,
    },

    addNewBtn: {
        marginTop: 35,
        alignItems: "center",
    },

    addNewBtnText: {
        fontWeight: '500',
        fontSize: 16,
        color: '#2A34DC'
    },
});