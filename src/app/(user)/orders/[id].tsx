import { View, Text, FlatList } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'

import orders from '@assets/data/orders'
import OrderItemListItem from '@/components/OrderItemListItem'
import OrderListItem from '@/components/OrderListItem'

export default function OrderDetailsScreen() {
	const { id } = useLocalSearchParams()
	const order = orders.find((o) => o.id.toString() === id)

	if (!orders) {
		return <Text>Not found</Text>
	}

	return (
		<View style={{ padding: 10, gap: 20, flex: 1 }}>
			<Stack.Screen options={{ title: `Order #${id}` }} />

			<FlatList
				data={order.order_items}
				renderItem={({ item }) => <OrderItemListItem item={item} />}
				contentContainerStyle={{ gap: 10 }}
				ListHeaderComponent={() => <OrderListItem order={order} />}
			/>
		</View>
	)
}
