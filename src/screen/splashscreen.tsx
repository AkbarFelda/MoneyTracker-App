import { Text, View, Image, Animated, Dimensions } from "react-native";  
import React, { useState, useEffect, useRef } from "react"; 
import { useNavigation } from '@react-navigation/native'; 
import { IconSplash } from "../../assets";
import colors from "../theme/color";

export default function SplashScreen() {  
  const [showLogo, setShowLogo] = useState(true);  
  const [showText, setShowText] = useState(false);  
  const fadeAnim = useRef(new Animated.Value(0)).current;  
  const navigation = useNavigation<any>();

  const { width, height } = Dimensions.get("window");

  useEffect(() => {  
    const timer = setTimeout(() => {  
      setShowLogo(false);  
      setShowText(true);  

      Animated.timing(fadeAnim, {  
        toValue: 1,  
        duration: 1000,  
        useNativeDriver: true,  
      }).start();  
      navigation.navigate('HomePage');
    }, 1000);  

    return () => clearTimeout(timer);  
  }, []);  

  return (  
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.violet100, padding: 16 }}>  
      {showLogo && (  
        <Image  
          source={IconSplash} 
          style={{ width: width * 0.5, height: width * 0.5 }} // Sesuaikan ukuran gambar berdasarkan lebar layar  
        />  
      )}  

      {showText && (  
        <Animated.Text  
          style={{ 
            opacity: fadeAnim, 
            fontSize: width * 0.09, // Sesuaikan ukuran font berdasarkan lebar layar
            fontWeight: 'bold', 
            color: 'white',
            textAlign: 'center', // Untuk memastikan teks tetap di tengah
          }}
        >  
          MONEYTRACK  
        </Animated.Text>  
      )}  
    </View>  
  );  
}
