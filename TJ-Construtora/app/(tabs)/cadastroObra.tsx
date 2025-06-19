import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function cadastroObra() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-blue-700">CONSTRU<Text className="text-yellow-400">VI</Text></Text>
      <Text className="text-lg mt-4">Cadastrar Obras</Text>

      <View className="bg-gray-100 rounded-xl p-4 mt-4">
        <TextInput placeholder="Título da Obra" className="border border-blue-700 rounded px-3 py-2 mb-2" />
        <TextInput placeholder="Responsável" className="border border-blue-700 rounded px-3 py-2 mb-2" />
        <View className="flex-row space-x-2">
          <TextInput placeholder="Data Início" className="border border-blue-700 rounded px-3 py-2 flex-1" />
          <TextInput placeholder="Previsão Fim" className="border border-blue-700 rounded px-3 py-2 flex-1" />
        </View>
        <TextInput placeholder="Localização" className="border border-blue-700 rounded px-3 py-2 mb-2" />

        <TouchableOpacity className="border border-blue-700 rounded p-3 items-center mb-2">
          <FontAwesome name="camera" size={24} color="gray" />
          <Text>Adicionar Imagem</Text>
        </TouchableOpacity>

        <TextInput placeholder="Descrição" multiline numberOfLines={3} className="border border-blue-700 rounded px-3 py-2" />

        <TouchableOpacity className="bg-blue-700 rounded p-3 mt-4 items-center">
          <Text className="text-white">Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-4 left-0 right-0 flex-row justify-around">
        <FontAwesome name="home" size={24} />
        <FontAwesome name="building" size={24} />
        <FontAwesome name="cogs" size={24} />
        <FontAwesome name="user" size={24} />
      </View>
    </View>
  );
}
