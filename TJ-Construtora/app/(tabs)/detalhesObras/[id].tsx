import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useCallback } from "react";
import { listarObras, excluirObra } from "../../storage";
import * as MailComposer from "expo-mail-composer";
import { useFocusEffect } from "@react-navigation/native";

export default function DetalhesObra() {
  const { id } = useLocalSearchParams();
  const obraId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const [obra, setObra] = useState<any>(null);

  async function carregarObra() {
    const obras = await listarObras();
    const encontrada = obras.find((o) => o.id === obraId);
    setObra(encontrada);
  }

  // Recarrega sempre que volta pra tela
  useFocusEffect(
    useCallback(() => {
      carregarObra();
    }, [obraId])
  );

  if (!obra) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Carregando...</Text>
      </View>
    );
  }

  async function handleExcluir() {
    Alert.alert("Excluir", "Deseja excluir essa obra?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await excluirObra(obraId);
          router.push("/");
        },
      },
    ]);
  }

  async function handleEnviarEmail() {
    let corpoEmail = `📌 Dados da Obra:\n`;
    corpoEmail += `Título: ${obra.titulo}\n`;
    corpoEmail += `Responsável: ${obra.responsavel}\n`;
    corpoEmail += `Data Início: ${obra.dataInicio}\n`;
    corpoEmail += `Data Fim: ${obra.dataFim}\n`;
    corpoEmail += `Descrição: ${obra.descricao}\n`;
    corpoEmail += `Localização: ${obra.localizacao}\n`;

    if (obra.fiscalizacoes && obra.fiscalizacoes.length > 0) {
      corpoEmail += `\n📋 Fiscalizações:\n`;
      obra.fiscalizacoes.forEach((f: any, index: number) => {
        corpoEmail += `\nFiscalização ${index + 1}:\n`;
        corpoEmail += `Data: ${f.data}\n`;
        corpoEmail += `Status: ${f.status}\n`;
        corpoEmail += `Observações: ${f.observacoes}\n`;
        corpoEmail += `Localização: ${f.localizacao}\n`;
      });
    }

    const isAvailable = await MailComposer.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert("Erro", "Nenhum app de e-mail disponível.");
      return;
    }

    await MailComposer.composeAsync({
      subject: `Dados da Obra: ${obra.titulo}`,
      body: corpoEmail,
    });
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Detalhes da Obra</Text>

      <Text>Título: {obra.titulo}</Text>
      <Text>Responsável: {obra.responsavel}</Text>
      <Text>Data Início: {obra.dataInicio}</Text>
      <Text>Data Fim: {obra.dataFim}</Text>
      <Text>Descrição: {obra.descricao}</Text>
      <Text>Localização: {obra.localizacao}</Text>

      <Text className="mt-4 text-xl font-semibold">Fiscalizações:</Text>
      {obra.fiscalizacoes && obra.fiscalizacoes.length > 0 ? (
        obra.fiscalizacoes.map((f: any, index: number) => (
          <View key={index} className="border p-2 mt-2 rounded">
            <Text>Data: {f.data}</Text>
            <Text>Status: {f.status}</Text>
            <Text>Observações: {f.observacoes}</Text>
            <Text>Localização: {f.localizacao}</Text>
          </View>
        ))
      ) : (
        <Text>Nenhuma fiscalização cadastrada.</Text>
      )}

      {/* Botão Nova Fiscalização */}
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/cadastroFiscalizacao",
            params: { id: String(obraId) },
          })
        }
        className="bg-blue-500 p-3 rounded mt-4"
      >
        <Text className="text-white text-center">Nova Fiscalização</Text>
      </TouchableOpacity>

      {/* Botão Editar Obra */}
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/editarObra",
            params: { id: String(obraId) },
          })
        }
        className="bg-yellow-500 p-3 rounded mt-4"
      >
        <Text className="text-white text-center">Editar Obra</Text>
      </TouchableOpacity>

      {/* Botão Excluir Obra */}
      <TouchableOpacity
        onPress={handleExcluir}
        className="bg-red-500 p-3 rounded mt-4"
      >
        <Text className="text-white text-center">Excluir Obra</Text>
      </TouchableOpacity>

      {/* Botão Enviar por Email */}
      <TouchableOpacity
        onPress={handleEnviarEmail}
        className="bg-green-600 p-3 rounded mt-4"
      >
        <Text className="text-white text-center">Enviar por E-mail</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
