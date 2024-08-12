import { useState } from 'react'
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'

import { PizzaSize } from '@/types'
import { useGetProductById } from '@/api/products'
import { useCart } from '@/providers/CartProvider'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Button from '@/components/Button'
import RemoteImage from '@/components/RemoteImage'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

export default function ProductDetailsScreen() {
	const router = useRouter()
	const { id: idString } = useLocalSearchParams()
	const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

	const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
	const { data: product, error, isLoading } = useGetProductById(id)
	const { addItem } = useCart()

	const addToCart = () => {
		if (!product) {
			return
		}
		addItem(product, selectedSize)
		router.push('/cart')
	}

	if (isLoading) {
		return <ActivityIndicator />
	}

	if (error) {
		return <Text>Failed to fetch products</Text>
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: product?.name }} />

			<RemoteImage
				path={product?.image}
				fallback={defaultPizzaImage}
				style={styles.image}
				resizeMode='contain'
			/>

			<Text>Select size</Text>
			<View style={styles.sizes}>
				{sizes.map((size) => (
					<Pressable
						onPress={() => {
							setSelectedSize(size)
						}}
						style={[
							styles.size,
							{
								backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
							},
						]}
						key={size}
					>
						<Text
							style={[
								styles.sizeText,
								{
									color: selectedSize === size ? 'black' : 'gray',
								},
							]}
						>
							{size}
						</Text>
					</Pressable>
				))}
			</View>

			<Text style={styles.price}>{product.price}</Text>
			<Button text='Add to Cart' onPress={addToCart} />
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
	price: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 'auto',
	},

	sizes: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10,
	},
	size: {
		backgroundColor: 'gainsboro',
		width: 50,
		aspectRatio: 1,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	sizeText: {
		fontSize: 20,
		fontWeight: '500',
	},
})
