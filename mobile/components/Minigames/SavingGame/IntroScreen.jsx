import React, { useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  SafeAreaView,
  Animated,
  Easing,
  Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

const IntroScreen = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const backButtonAnim = useRef(new Animated.Value(0)).current;
  
  // Animation for the coins falling
  const coin1Position = useRef(new Animated.ValueXY({ x: width * 0.2, y: -50 })).current;
  const coin2Position = useRef(new Animated.ValueXY({ x: width * 0.5, y: -80 })).current;
  const coin3Position = useRef(new Animated.ValueXY({ x: width * 0.8, y: -30 })).current;
  
  const coin1Rotation = useRef(new Animated.Value(0)).current;
  const coin2Rotation = useRef(new Animated.Value(0)).current;
  const coin3Rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main content fade in
    Animated.sequence([
      // Fade in title
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      
      // Slide up and fade in card
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      
      // Animate buttons appearance
      Animated.parallel([
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: 600,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backButtonAnim, {
          toValue: 1,
          duration: 600,
          delay: 400, // Slight delay after main button
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Animate falling coins
    Animated.loop(
      Animated.parallel([
        animateCoin(coin1Position, coin1Rotation, 0),
        animateCoin(coin2Position, coin2Rotation, 300),
        animateCoin(coin3Position, coin3Rotation, 600),
      ])
    ).start();
  }, []);

  const animateCoin = (position, rotation, delay) => {
    position.setValue({ x: Math.random() * width * 0.8 + width * 0.1, y: -50 });
    rotation.setValue(0);
    
    return Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(position.y, {
          toValue: height + 50,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ]);
  };

  // Coin rotation interpolation
  const spin1 = coin1Rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  const spin2 = coin2Rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  const spin3 = coin3Rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      
      {/* Falling coins animation */}
      <Animated.View style={[styles.coin, {
        transform: [
          { translateX: coin1Position.x },
          { translateY: coin1Position.y },
          { rotate: spin1 }
        ]
      }]}>
        <FontAwesome5 name="coins" size={24} color="#FFD700" />
      </Animated.View>
      
      <Animated.View style={[styles.coin, {
        transform: [
          { translateX: coin2Position.x },
          { translateY: coin2Position.y },
          { rotate: spin2 }
        ]
      }]}>
        <FontAwesome5 name="coins" size={24} color="#FFD700" />
      </Animated.View>
      
      <Animated.View style={[styles.coin, {
        transform: [
          { translateX: coin3Position.x },
          { translateY: coin3Position.y },
          { rotate: spin3 }
        ]
      }]}>
        <FontAwesome5 name="coins" size={24} color="#FFD700" />
      </Animated.View>
      
      <View style={styles.container}>
        {/* Header with fade in animation */}
        <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
          <Icon name="savings" size={50} color="#9370DB" />
          <Text style={styles.title}>Financial Quest</Text>
          <View style={styles.taglineContainer}>
            <Text style={styles.subtitle}>CAN YOU SURVIVE ON A BUDGET?</Text>
            <View style={styles.subtitleUnderline} />
          </View>
        </Animated.View>

        {/* Card with slide up and fade in animation */}
        <Animated.View 
          style={[
            styles.cardContainer,
            {
              opacity: opacityAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>YOUR FINANCIAL SURVIVAL</Text>
            <Text style={styles.cardText}>
              You have 28 DAYS to manage your money. Every choice matters.
              Bills, emergencies, and daily expenses will drain your funds quickly.
            </Text>
            
            <View style={styles.bulletPoints}>
              <View style={styles.bulletPoint}>
                <FontAwesome5 name="money-bill-wave" size={18} color="#9370DB" />
                <Text style={styles.bulletText}>LIMITED RESOURCES</Text>
              </View>
              
              <View style={styles.bulletPoint}>
                <FontAwesome5 name="calendar-day" size={18} color="#9370DB" />
                <Text style={styles.bulletText}>DAILY FINANCIAL DECISIONS</Text>
              </View>
              
              <View style={styles.bulletPoint}>
                <FontAwesome5 name="exclamation-triangle" size={18} color="#9370DB" />
                <Text style={styles.bulletText}>UNEXPECTED EMERGENCIES</Text>
              </View>
              
              <View style={styles.bulletPoint}>
                <FontAwesome5 name="chart-line" size={18} color="#9370DB" />
                <Text style={styles.bulletText}>EVERY PESO COUNTS</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.Text style={[styles.quote, { opacity: opacityAnim }]}>
          "When money runs short, time runs out."
        </Animated.Text>

        {/* Button with fade in and pulse animation */}
        <Animated.View style={{ opacity: buttonAnim }}>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => navigation.navigate("Game")}
          >
            <Icon name="play-arrow" size={24} color="#fff" />
            <Text style={styles.startButtonText}>START YOUR STRUGGLE</Text>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Back to Home button */}
        <Animated.View style={{ opacity: backButtonAnim, marginTop: 15 }}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="home" size={22} color="#F9F6FF" />
            <Text style={styles.backButtonText}>BACK TO HOME</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F9F6FF",
    marginTop: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
  taglineContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9370DB",
    letterSpacing: 1.5,
  },
  subtitleUnderline: {
    height: 2,
    width: "100%",
    backgroundColor: "#9370DB",
    marginTop: 5,
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#1E1E1E",
    width: "100%",
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 15,
    borderWidth: 1,
    borderColor: "rgba(147, 112, 219, 0.4)",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F9F6FF",
    marginBottom: 15,
    textAlign: "center",
    letterSpacing: 1,
  },
  cardText: {
    fontSize: 16,
    color: "#BDBDBD",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  bulletPoints: {
    alignSelf: "flex-start",
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  bulletText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#BDBDBD",
    marginLeft: 14,
    letterSpacing: 0.5,
  },
  quote: {
    fontStyle: "italic",
    fontSize: 18,
    fontWeight: "500",
    color: "#9370DB",
    marginBottom: 40,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#9370DB",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 8,
    shadowColor: "#9370DB",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    letterSpacing: 1,
  },
  backButton: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(147, 112, 219, 0.7)",
  },
  backButtonText: {
    color: "#F9F6FF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  coin: {
    position: 'absolute',
    zIndex: 5,
  }
});

export default IntroScreen;