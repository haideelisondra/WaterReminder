import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Picker, ScrollView } from 'react-native';

export default function App() {
  // State variables
  const [dailyGoal, setDailyGoal] = useState(0); // Daily water intake goal
  const [totalIntake, setTotalIntake] = useState(0); // Total water intake logged
  const [unit, setUnit] = useState('ml'); // Unit of measurement (ml, oz, or cups)
  const [inputGoal, setInputGoal] = useState(''); // Temporary state for goal input
  const [goalSet, setGoalSet] = useState(false); // To check if the goal has been set
  const [goalAchieved, setGoalAchieved] = useState(false); // To check if the goal has been achieved

  // Function to set the daily water intake goal
  const handleSetGoal = () => {
    const goal = parseFloat(inputGoal);
    if (isNaN(goal) || goal <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid goal.');
    } else {
      setDailyGoal(goal);
      setTotalIntake(0); // Reset total intake after setting the goal
      setInputGoal('');
      setGoalSet(true); // Set goal as set
      setGoalAchieved(false); // Reset goal achieved state when a new goal is set
      Alert.alert('Goal Set', `Your daily goal is set to ${goal} ${unit}.`);
    }
  };

  // Function to log a quick intake (e.g., 250ml, 500ml)
  const handleQuickLog = (amount) => {
    const newTotal = totalIntake + amount;
    if (newTotal >= dailyGoal) {
      setGoalAchieved(true); // Mark goal as achieved
      Alert.alert('Goal Achieved', `Congratulations! You've reached your daily goal of ${dailyGoal} ${unit}.`);
    }
    setTotalIntake(newTotal);
  };

  // Function to convert the intake to the selected unit
  const convertIntake = (intake) => {
    const conversionFactors = {
      oz: 0.033814, // Convert ml to oz
      cups: 0.00422675, // Convert ml to cups
    };
    if (unit !== 'ml') {
      const factor = conversionFactors[unit] || 1;
      return intake * factor;
    }
    return intake;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Water Reminder App</Text>

      {/* Set Daily Goal Section */}
      <Text style={styles.label}>Set Your Daily Water Intake Goal:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputGoal}
        onChangeText={setInputGoal}
        placeholder="Enter goal:"
      />
      <TouchableOpacity style={styles.setGoalButton} onPress={handleSetGoal}>
        <Text style={styles.buttonText}>Set Goal</Text>
      </TouchableOpacity>

      {/* Show Unit of Measurement dropdown after goal is set */}
      {goalSet && (
        <>
          <Text style={styles.label}>Select Unit of Measurement:</Text>
          <Picker selectedValue={unit} style={styles.picker} onValueChange={(itemValue) => setUnit(itemValue)}>
            <Picker.Item label="Milliliters (ml)" value="ml" />
            <Picker.Item label="Ounces (oz)" value="oz" />
            <Picker.Item label="Cups" value="cups" />
          </Picker>
        </>
      )}

      {/* Display Congratulatory Message if Goal is Achieved */}
      {goalAchieved && (
        <Text style={styles.congratulationsText}>
          Congratulations!, You Successfully Drink Your Water Goal!
        </Text>
      )}

      {/* Quick Log Buttons */}
      <View style={styles.quickLogButtons}>
        <TouchableOpacity style={styles.button} onPress={() => handleQuickLog(250)}>
          <Text style={styles.buttonText}>Log 250 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleQuickLog(500)}>
          <Text style={styles.buttonText}>Log 500 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleQuickLog(1000)}>
          <Text style={styles.buttonText}>Log 1 Liter</Text>
        </TouchableOpacity>
      </View>

      {/* Display Total Intake */}
      <Text style={styles.totalIntake}>
        Total Water Intake: {convertIntake(totalIntake).toFixed(2)} {unit}
      </Text>
      <Text style={styles.goal}>
        Daily Goal: {dailyGoal} {unit}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#eaf2f8', // Light blue background color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3b3b3b',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '80%',
    marginBottom: 20,
  },
  setGoalButton: {
    backgroundColor: '#007bff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    marginVertical: 10,  // Increased vertical margin for spacing between buttons
    marginHorizontal: 20, // Add horizontal margin for more space between buttons
    borderRadius: 10,
    width: '80%', // Ensures buttons are not too wide
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  quickLogButtons: {
    flexDirection: 'column',  // Stack buttons vertically for better spacing
    marginBottom: 30,
    justifyContent: 'center', 
    alignItems: 'center',  // Center buttons in the column
    width: '100%',
  },
  totalIntake: {
    fontSize: 18,
    color: '#3b3b3b',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  goal: {
    fontSize: 18,
    color: '#3b3b3b',
    fontWeight: 'bold',
  },
  congratulationsText: {
    fontSize: 18,
    color: '#28a745', // Green color for success
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
