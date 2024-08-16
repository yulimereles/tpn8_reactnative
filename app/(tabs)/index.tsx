import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const titlePosition = useSharedValue(-100); // Inicia fuera de la pantalla (arriba)
  const titleScale = useSharedValue(0.5); // Escala inicial del título
  const backgroundColor = useSharedValue(0); // Gradiente de color inicial

  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titlePosition.value }, { scale: titleScale.value }],
    };
  });

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const backgroundColors = interpolateColor(
      backgroundColor.value,
      [0, 1],
      ['blue', 'purple']
    );

    return {
      backgroundColor: backgroundColors,
    };
  });

  const buttonScale = useSharedValue(1); // Escala inicial del botón
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  React.useEffect(() => {
    // Animación de deslizamiento y escala al cargar la pantalla
    titlePosition.value = withTiming(0, { duration: 1000 });
    titleScale.value = withTiming(1, { duration: 1000 });
  }, []);

  const handleStartPress = () => {
    // Animación de cambio de color de fondo
    backgroundColor.value = withTiming(1, { duration: 1000 });

    // Animación de desvanecimiento del título
    titlePosition.value = withTiming(-100, { duration: 1000 });
    titleScale.value = withTiming(0.5, { duration: 1000 });

    // Animación de rebote del botón
    buttonScale.value = withSpring(1.2, { damping: 5, stiffness: 100 }, () => {
      buttonScale.value = withSpring(1);
    });
  };

  return (
    <Animated.View style={[styles.container, animatedBackgroundStyle]}>
      <Animated.Text style={[styles.title, animatedTitleStyle]}>
        ¡¡Bienvenido!!
      </Animated.Text>
      <TouchableOpacity onPress={handleStartPress}>
        <Animated.View style={[styles.button, animatedButtonStyle]}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue', // Color inicial del fondo
  },
  title: {
    fontSize: 32,
    color: 'white',
    marginBottom: 50,
  },
  button: {
    position: 'static',
    bottom: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  buttonText: {
    color: 'blue',
    fontSize: 18,
  },
});

export default HomeScreen;
