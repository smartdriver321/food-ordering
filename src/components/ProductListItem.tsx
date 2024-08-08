import { Image, StyleSheet, Text, View } from 'react-native'

import { Product } from '@/types'
import Colors from '@/constants/Colors'

export const defaultPizzaImage =
	'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductListItemProps = {
	product: Product
}

export default function ProductListItem({ product }: ProductListItemProps) {
	return (
		<View style={styles.container}>
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
		padding: 10,
		borderRadius: 20,
	},

	image: {
		width: '100%',
		aspectRatio: 1,
	},

	title: {
		fontSize: 18,
		fontWeight: '600',
		marginVertical: 10,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: 'bold',
	},
})
