import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Text> Tour Việt - 23659751 - Lê Thế Anh</Text>

          <TextInput style={styles.otim} placeholder='Tìm tour theo tên' 
          // onChangeText={}
          >
            
          </TextInput>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  otim:{
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
  }
});
