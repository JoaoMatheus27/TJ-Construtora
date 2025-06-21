import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { listarObras, salvarObra, Obra } from "@/app/storage";

export default function EditarObra() {
  const { id } = useLocalSearchParams();
  const obraId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const [obra, setObra] = useState<Obra | null>(null);

  const [titulo, setTitulo] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  // Carregar os dados da obra
  useEffect(() => {
    async function carregarObra() {
      const obras = await listarObras();
      const encontrada = obras.find((o) => o.id === obraId);
      if (encontrada) {
        setObra(encontrada);
        setTitulo(encontrada.titulo);
        setResponsavel(encontrada.responsavel);
        setDataInicio(encontrada.dataInicio || "");
        setDataFim(encontrada.dataFim || "");
        setDescricao(encontrada.descricao || "");
        setLocalizacao(encontrada.localizacao || "");
      } else {
        Alert.alert("Erro", "Obra não encontrada");
        router.back();
      }
    }

    carregarObra();
  }, [obraId]);

  async function handleSalvarEdicao() {
    if (!obra) return;

    const obraAtualizada: Obra = {
      ...obra,
      titulo,
      responsavel,
      dataInicio,
      dataFim,
      descricao,
      localizacao,
    };

    await salvarObra(obraAtualizada);
    Alert.alert("Sucesso", "Obra atualizada com sucesso!");
    router.back();
  }

  if (!obra) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Carregando dados da obra...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Editar Obra</Text>

      <TextInput
        placeholder="Título da Obra"
        value={titulo}
        onChangeText={setTitulo}
        className="border border-[#2B60A4] rounded px-4 py-3 mb-4"
      />

      <TextInput
        placeholder="Responsável"
        value={responsavel}
        onChangeText={setResponsavel}
        className="border border-[#2B60A4] rounded px-4 py-3 mb-4"
      />

      <TextInput
        placeholder="Data Início"
        value={dataInicio}
        onChangeText={setDataInicio}
        className="border border-[#2B60A4] rounded px-4 py-3 mb-4"
      />

      <TextInput
        placeholder="Data Fim"
        value={dataFim}
        onChangeText={setDataFim}
        className="border border-[#2B60A4] rounded px-4 py-3 mb-4"
      />

      <TextInput
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
        className="border border-[#2B60A4] rounded px-4 py-3 mb-4"
      />

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
        className="border border-[#2B60A4] rounded px-4 py-3 mb-4"
      />

      <TouchableOpacity
        onPress={handleSalvarEdicao}
        className="bg-[#2B60A4] rounded p-3 mt-4 items-center"
      >
        <Text className="text-white">Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
