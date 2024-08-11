import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import { withLayoutContext } from 'expo-router'

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function OrderListNavigator() {
	return (
		<SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'white' }}>
			<TopTabs>
				<TopTabs.Screen name='index' options={{ title: 'Active' }} />
			</TopTabs>
		</SafeAreaView>
	)
}
