import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function index() {
  const obras = [
    { id: 1, titulo: 'Manutenção na Escola de IPSEP' },
    { id: 2, titulo: 'Posto de Saúde em IPSEP' },
  ];

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-blue-700">CONSTRU<Text className="text-yellow-400">VI</Text></Text>
      <Text className="text-lg mt-4">Todas as Obras ({obras.length})</Text>

      {obras.map((obra) => (
        <Link key={obra.id} href={`/obra/${obra.id}`} asChild>
          <TouchableOpacity className="bg-blue-700 text-white rounded-md p-3 my-2 flex-row items-center justify-between">
            <Text className="text-white">{obra.titulo}</Text>
            <FontAwesome name="eye" size={20} color="white" />
          </TouchableOpacity>
        </Link>
      ))}

      <View className="absolute bottom-4 left-0 right-0 flex-row justify-around">
        <FontAwesome name="home" size={24} />
        <FontAwesome name="building" size={24} />
        <FontAwesome name="cogs" size={24} />
        <FontAwesome name="user" size={24} />
      </View>
    </View>
  );
}
