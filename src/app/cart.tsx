import { View, Text, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function CartScreen() {
	return (
		<View>
			<Text>Cart</Text>

			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	)
}
