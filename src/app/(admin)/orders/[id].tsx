import {
	View,
	Text,
	FlatList,
	Pressable,
	ActivityIndicator,
} from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'

import { useOrderDetails } from '@/api/orders'
import { OrderStatusList } from '@/types'
import Colors from '@/constants/Colors'
import OrderItemListItem from '@/components/OrderItemListItem'
import OrderListItem from '@/components/OrderListItem'

export default function OrderDetailsScreen() {
	const { id: idString } = useLocalSearchParams()
	const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

	const { data: order, isLoading, error } = useOrderDetails(id)

	if (isLoading) {
		return <ActivityIndicator />
	}

	if (error || !order) {
		return <Text>Failed to fetch</Text>
	}

	return (
		<View style={{ padding: 10, gap: 20, flex: 1 }}>
			<Stack.Screen options={{ title: `Order #${id}` }} />

			<FlatList
				data={order.order_items}
				renderItem={({ item }) => <OrderItemListItem item={item} />}
				contentContainerStyle={{ gap: 10 }}
				ListHeaderComponent={() => <OrderListItem order={order} />}
				ListFooterComponent={() => (
					<>
						<Text style={{ fontWeight: 'bold' }}>Status</Text>
						<View style={{ flexDirection: 'row', gap: 5 }}>
							{OrderStatusList.map((status) => (
								<Pressable
									key={status}
									onPress={() => console.warn('Update status')}
									style={{
										borderColor: Colors.light.tint,
										borderWidth: 1,
										padding: 10,
										borderRadius: 5,
										marginVertical: 10,
										backgroundColor:
											order.status === status
												? Colors.light.tint
												: 'transparent',
									}}
								>
									<Text
										style={{
											color:
												order.status === status ? 'white' : Colors.light.tint,
										}}
									>
										{status}
									</Text>
								</Pressable>
							))}
						</View>
					</>
				)}
			/>
		</View>
	)
}
