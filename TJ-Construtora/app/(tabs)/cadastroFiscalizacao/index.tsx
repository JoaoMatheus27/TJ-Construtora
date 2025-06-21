import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { listarObras, salvarObra, Fiscalizacao } from "../../storage";

export default function CadastroFiscalizacao() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [data, setData] = useState("");
  const [status, setStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [localizacao, setLocalizacao] = useState<string | null>(null);
  const [foto, setFoto] = useState<string | null>(null);

  async function obterLocalizacao() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Habilite o acesso à localização.");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setLocalizacao(`${location.coords.latitude}, ${location.coords.longitude}`);
  }

  async function tirarFoto() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  }

  async function salvarFiscalizacao() {
    if (!data || !status) {
      Alert.alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const obras = await listarObras();
    const indexObra = obras.findIndex((o: any) => o.id === id);

    if (indexObra === -1) {
      Alert.alert("Obra não encontrada.");
      return;
    }

    const novaFiscalizacao: Fiscalizacao = {
      data,
      status,
      observacoes,
      localizacao: localizacao ?? undefined,
      foto: foto ?? undefined,
    };
    if (!obras[indexObra].fiscalizacoes) {
      obras[indexObra].fiscalizacoes = [];
    }

    obras[indexObra].fiscalizacoes.push(novaFiscalizacao);
    await salvarObra(obras[indexObra]); // Atualiza só a obra alterada

    Alert.alert("Sucesso", "Fiscalização cadastrada.");
    router.back(); // Volta para os detalhes da obra
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl mb-4">Nova Fiscalização</Text>

      <TextInput
        placeholder="Data da fiscalização (ex: 20/06/2025)"
        value={data}
        onChangeText={setData}
        className="border border-gray-400 rounded p-2 mb-4"
      />

      <TextInput
        placeholder="Status (Em dia, Atrasada, Parada)"
        value={status}
        onChangeText={setStatus}
        className="border border-gray-400 rounded p-2 mb-4"
      />

      <TextInput
        placeholder="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
        className="border border-gray-400 rounded p-2 mb-4"
      />

      <TouchableOpacity
        onPress={obterLocalizacao}
        className="bg-blue-500 rounded p-3 mb-4"
      >
        <Text className="text-white text-center">Obter Localização</Text>
      </TouchableOpacity>
      {localizacao && <Text>Localização: {localizacao}</Text>}

      <TouchableOpacity
        onPress={tirarFoto}
        className="bg-blue-500 rounded p-3 mb-4"
      >
        <Text className="text-white text-center">Tirar Foto</Text>
      </TouchableOpacity>
      {foto && <Text>Foto capturada!</Text>}

      <TouchableOpacity
        onPress={salvarFiscalizacao}
        className="bg-green-600 rounded p-3 mt-4"
      >
        <Text className="text-white text-center">Salvar Fiscalização</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
