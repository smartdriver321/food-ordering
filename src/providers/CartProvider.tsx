import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { useRouter } from 'expo-router'
import { randomUUID } from 'expo-crypto'

import { CartItem, Tables } from '@/types'
import { useInsertOrder } from '@/api/orders'

type Product = Tables<'products'>

type CartType = {
	items: CartItem[]
	addItem: (product: Product, size: CartItem['size']) => void
	updateQuantity: (itemId: string, amount: -1 | 1) => void
	total: number
	checkout: () => void
}

const CartContext = createContext<CartType>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	total: 0,
	checkout: () => {},
})

const CartProvider = ({ children }: PropsWithChildren) => {
	const router = useRouter()
	const [items, setItems] = useState<CartItem[]>([])

	const { mutate: insertOrder } = useInsertOrder()

	const addItem = (product: Product, size: CartItem['size']) => {
		// If already in cart, increment quantity
		const existingItem = items.find(
			(item) => item.product === product && item.size === size
		)

		if (existingItem) {
			updateQuantity(existingItem.id, 1)
			return
		}

		const newCartItem: CartItem = {
			id: randomUUID(), // Generate id
			product,
			product_id: product.id,
			size,
			quantity: 1,
		}

		setItems([newCartItem, ...items])
	}

	const updateQuantity = (itemId: string, amount: -1 | 1) => {
		setItems(
			items
				.map((item) =>
					item.id !== itemId
						? item
						: { ...item, quantity: item.quantity + amount }
				)
				.filter((item) => item.quantity > 0)
		)
	}

	const total = items.reduce(
		(sum, item) => (sum += item.product.price * item.quantity),
		0
	)

	const checkout = async () => {
		insertOrder(
			{ total },
			{
				onSuccess: (data) => {
					clearCart()
					router.push(`/(user)/orders/${data.id}`)
				},
			}
		)
	}

	const clearCart = () => {
		setItems([])
	}

	return (
		<CartContext.Provider
			value={{ items, addItem, updateQuantity, total, checkout }}
		>
			{children}
		</CartContext.Provider>
	)
}

export default CartProvider
export const useCart = () => useContext(CartContext)
