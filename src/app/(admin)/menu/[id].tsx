import { useState } from 'react'
import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

import { PizzaSize } from '@/types'
import Colors from '@/constants/Colors'
import { useGetProductById } from '@/api/products'
import { defaultPizzaImage } from '@/components/ProductListItem'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

export default function ProductDetailsScreen() {
	const router = useRouter()
	const { id: idString } = useLocalSearchParams()
	const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

	const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
	const { data: product, error, isLoading } = useGetProductById(id)

	if (isLoading) {
		return <ActivityIndicator />
	}

	if (error) {
		return <Text>Failed to fetch products</Text>
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: 'Menu',
					headerRight: () => (
						<Link href={`/(admin)/menu/create?id=${id}`} asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name='pencil'
										size={25}
										color={Colors.light.tint}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>

			<Stack.Screen options={{ title: product.name }} />

			<Image
				source={{ uri: product.image || defaultPizzaImage }}
				style={styles.image}
			/>

			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		padding: 10,
	},
	image: {
		width: '100%',
		aspectRatio: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	price: {
		fontSize: 18,
		fontWeight: '500',
	},
})
