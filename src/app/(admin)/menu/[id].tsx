import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

import { PizzaSize } from '@/types'
import Colors from '@/constants/Colors'
import products from '@assets/data/products'
import { useCart } from '@/providers/CartProvider'
import { defaultPizzaImage } from '@/components/ProductListItem'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

export default function ProductDetailsScreen() {
	const { id } = useLocalSearchParams()
	const router = useRouter()

	const { addItem } = useCart()

	const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

	const product = products.find((p) => p.id.toString() === id)

	if (!product) {
		return <Text>Product not found</Text>
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
