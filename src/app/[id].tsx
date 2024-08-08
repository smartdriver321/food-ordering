import { Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

export default function ProductDetailsScreen() {
	const { id } = useLocalSearchParams()
	return (
		<View>
			<Text style={{ fontSize: 20 }}>ProductDetailsScreen for id: {id}</Text>
		</View>
	)
}
