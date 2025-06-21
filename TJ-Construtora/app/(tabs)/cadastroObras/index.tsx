import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import { salvarObra } from "@/app/storage";

export default function CadastroObra() {
  const [titulo, setTitulo] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  // Aqui o ref tipado corretamente
  const cameraRef = useRef<Camera | null>(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(status === "granted");
      if (status !== "granted") {
        Alert.alert("Permissão de localização negada");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
      if (status !== "granted") {
        Alert.alert("Permissão de câmera negada");
      }
    })();
  }, []);

  async function pegarLocalizacao() {
    if (!hasLocationPermission) {
      Alert.alert("Permissão de localização não concedida");
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync({});
      const coords = `${location.coords.latitude.toFixed(
        5
      )}, ${location.coords.longitude.toFixed(5)}`;
      setLocalizacao(coords);
      Alert.alert("Localização capturada", coords);
    } catch (error) {
      Alert.alert("Erro ao capturar localização", String(error));
    }
  }

  async function tirarFoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setFotoUri(photo.uri);
      setCameraOpen(false);
    }
  }

  async function handleCadastrar() {
    if (!titulo || !responsavel) {
      Alert.alert("Preencha pelo menos título e responsável");
      return;
    }

    const novaObra = {
      id: Date.now().toString(),
      titulo,
      responsavel,
      dataInicio,
      dataFim,
      localizacao,
      descricao,
      foto: fotoUri,
      fiscalizacoes: [],
    };

    await salvarObra(novaObra);
    Alert.alert("Obra cadastrada com sucesso!");
    router.push("/");
  }

  if (cameraOpen && hasCameraPermission) {
    return (
      <Camera style={{ flex: 1 }} ref={cameraRef} type="back">
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={tirarFoto}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="camera" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCameraOpen(false)}
            style={{ marginTop: 20 }}
          >
            <Text style={{ color: "white" }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl">Cadastrar Obras:</Text>

        <View className="bg-[#E9E9E9] p-4 mt-4 rounded-3xl">
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
            className="border border-[#2B60A4] rounded px-10 py-3 mb-6"
          />
          <View className="flex-row space-x-2 mb-6">
            <TextInput
              placeholder="Data Início"
              value={dataInicio}
              onChangeText={setDataInicio}
              className="border border-[#2B60A4] rounded px-10 py-3 flex-1"
            />
            <FontAwesome
              name="calendar"
              size={20}
              color="gray"
              className="absolute right-4 top-3"
            />
            <TextInput
              placeholder="Data Fim"
              value={dataFim}
              onChangeText={setDataFim}
              className="border border-[#2B60A4] rounded px-10 py-3 ml-2 flex-1"
            />
            <FontAwesome
              name="calendar"
              size={20}
              color="gray"
              className="absolute left-[40%] top-3"
            />
          </View>

          <TouchableOpacity
            onPress={pegarLocalizacao}
            className="border border-[#2B60A4] rounded px-10 py-3 mb-6 flex-row items-center justify-center"
          >
            <FontAwesome name="map" size={24} color="gray" className="mr-2" />
            <Text>{localizacao || "Adicionar Localização"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCameraOpen(true)}
            className="border border-[#2B60A4] rounded p-20 items-center mb-6"
          >
            {fotoUri ? (
              <Image
                source={{ uri: fotoUri }}
                style={{ width: 150, height: 150, borderRadius: 10 }}
              />
            ) : (
              <>
                <FontAwesome name="camera" size={24} color="gray" />
                <Text>Adicionar Imagem</Text>
              </>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Descrição"
            multiline
            numberOfLines={3}
            value={descricao}
            onChangeText={setDescricao}
            className="border border-[#2B60A4] rounded px-10 py-10"
          />

          <TouchableOpacity
            className="bg-[#2B60A4] rounded p-3 mt-4 items-center"
            onPress={handleCadastrar}
          >
            <Text className="text-white">Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
