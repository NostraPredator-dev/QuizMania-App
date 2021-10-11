import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyQuizes from '../screens/MyQuizes';
import CreateQuiz from '../screens/CreateQuiz';
import QuizDetails from '../screens/QuizDetails';
import AddQuizQstn from '../screens/AddQuizQstn';

const Stack = createStackNavigator();
export default function MyQuizStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="My Quizzes" component={MyQuizes}></Stack.Screen>
            <Stack.Screen options={{headerShown:false}} name="CreateQuiz" component={CreateQuiz}></Stack.Screen>
            <Stack.Screen options={{headerShown:false}} name="Quiz Details" component={QuizDetails}></Stack.Screen>
            <Stack.Screen options={{headerShown:false}} name="Add Question" component={AddQuizQstn} />
        </Stack.Navigator>
    );
}