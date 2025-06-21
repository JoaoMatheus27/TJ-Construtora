import { View, Image } from "react-native";
import "../global.css";
import bg from "../assets/images/bg.png";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <View className="pt-10 bg-[#2B60A4] flex-1">
      <Image source={bg} />

      <Stack>
        {/* Telas principais (abas) */}
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }} // Esconde o header padrão
        />

        {/* Telas de detalhes (abertas sobre as tabs) */}
        <Stack.Screen
          name="detalhesObras/index"
          options={{
            title: "Detalhes da Obra",
            presentation: "modal", // Abre como modal (opcional)
          }}
        />
      </Stack>
    </View>
  );
}
