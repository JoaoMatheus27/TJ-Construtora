import { View, Image } from 'react-native';
import '../global.css';
import bg from '../assets/images/bg.png';

export default function RootLayout() {
  return (
    <View className="pt-10 bg-[#2B60A4]">
      <Image source={bg} />
    </View>
  );
}
