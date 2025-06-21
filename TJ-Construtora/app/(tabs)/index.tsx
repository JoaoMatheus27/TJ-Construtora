import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { listarObras } from "../storage";
import { Obra } from "../storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function Home() {
  const [obras, setObras] = useState<Obra[]>([]);
  const router = useRouter();

  // Carrega as obras quando a tela recebe foco
  useFocusEffect(() => {
    const carregarObras = async () => {
      try {
        const obrasCadastradas = await listarObras();
        setObras(obrasCadastradas);
      } catch (error) {
        console.error("Erro ao carregar obras:", error);
        setObras([]);
      }
    };

    carregarObras();
  });

  // Função para navegar para os detalhes
  const navegarParaDetalhes = (id: string) => {
    router.push({
      pathname: "/detalhesObras/[id]",
      params: { id: String(id) },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Obras Cadastradas</Text>

      {obras.length > 0 ? (
        <FlatList
          data={obras}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-blue-100 p-4 rounded-lg mb-2"
              onPress={() => navegarParaDetalhes(item.id)}
            >
              <Text className="text-lg font-semibold">{item.titulo}</Text>
              <Text className="text-gray-600">{item.localizacao}</Text>
              <Text className="text-sm text-gray-500">
                Responsável: {item.responsavel}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text className="text-gray-500 text-center mt-8">
          Nenhuma obra cadastrada ainda
        </Text>
      )}
    </SafeAreaView>
  );
}
