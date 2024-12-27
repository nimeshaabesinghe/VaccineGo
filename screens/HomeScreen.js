import React, { useEffect, useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; 

export default function HomeScreen({ route }) {
  const { username } = route.params; // Get username from navigation params
  const { clickCount, setClickCount } = useContext(AppContext); // Access clickCount and its setter
  const [items, setItems] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    axios
      //.get('https://jsonplaceholder.typicode.com/posts') // Example API
      .get('https://myvaccination-backend.vercel.app/api/pop')
      .then((response) => setItems(response.data)) // Save full response data
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Increment the click count
  const handleItemClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <View style={styles.container}>
      {/* Welcome Header */}
      <View style={styles.headerContainer}>
      <Ionicons
        name='happy-sharp'
        size={24}
        color="#7E2480"
      />
      <Text style={styles.header}>Hi, <Text style={styles.username}>{username}!</Text></Text>
      </View>

      <Text style={styles.intro}>
        Explore the population statistics for each state. 
      </Text>

      {/* Item List with Two Columns */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.stateName} // Use state name as the unique key
        numColumns={2} // Always display 2 columns
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            {/* Image */}
            <Image
              source={require('../assets/image-removebg-preview (2).png')} // Example image URL (replace with actual image URL from API if available)
              style={styles.image}
            />

            <View style={styles.cardContent}>
              <Text style={styles.stateName}>{item.stateName}</Text>

              <Text style={styles.title}>Population Data:</Text>

              <Text style={styles.description}>
                Total Population: {item.total}
              </Text>
              <Text style={styles.description}>
                18 to 59: {item['18to59']}
              </Text>
              <Text style={styles.description}>
                60 and Above: {item['60andAbove']}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>Count: {clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  headerContainer: {
    flexDirection: 'row',       // Align icon and text in a row
    alignItems: 'center',       // Vertically center the icon and text
    marginBottom: 10,           // Space below the header
    marginTop: 20,              // Add some space from the top of the screen
    paddingHorizontal: 10,      // Add some horizontal padding to avoid text being too close to edges
  },
  header: {
    fontSize: 18,
    color: '#333',              // Set text color for better visibility
    marginLeft: 5,              // Add space between icon and text
    flex: 1,                    // Ensures text takes up remaining space
  },
  username: {
    fontWeight: 'bold',
    fontSize:20
  },
  intro: {
    fontSize: 14,
    color: '#7C7B7C',
    marginBottom: 10,  // Space below the description text
    textAlign: 'center', // Center align the description text
  },
  card: {
    flex: 1,
    flexDirection: 'column', // Align image and text vertically
    padding: 6,  // Reduced padding for smaller cards
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 10, // Space between columns
    marginLeft: 10, // Space between columns
    justifyContent: 'center', // Center content
    height: 230, // Set card height
    overflow: 'hidden', // Hide overflow content
  },
  image: {
    width: '100%', // Make image full width
    height: 70, // Reduced height of the image
    borderRadius: 8,
    marginBottom: 10, // Space between image and text
    resizeMode: 'cover',
  },
  cardContent: {
    flexShrink: 1, // Allow content to shrink to fit inside the card
    justifyContent: 'flex-start', // Align text at the top
  },
  stateName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color:'#7E2480'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginBottom: 3,
    marginTop:3
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#7E2480',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
