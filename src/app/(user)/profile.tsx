import { View, Text, Button } from 'react-native'

import { supabase } from '@/lib/supabase'

export default function ProfileScreen() {
	return (
		<View>
			<Text>Profile</Text>

			<Button
				title='Sign out'
				onPress={async () => await supabase.auth.signOut()}
			/>
		</View>
	)
}
