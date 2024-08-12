import React, { ComponentProps, useEffect, useState } from 'react'
import { Image } from 'react-native'

import { supabase } from '../lib/supabase'

type RemoteImageProps = {
	path?: string | null
	fallback: string
} & Omit<ComponentProps<typeof Image>, 'source'>

export default function RemoteImage({
	path,
	fallback,
	...imageProps
}: RemoteImageProps) {
	const [image, setImage] = useState('')

	useEffect(() => {
		if (!path) return
		;(async () => {
			setImage('')
			const { data, error } = await supabase.storage
				.from('product-images')
				.download(path)

			if (error) {
				console.log(error)
			}

			if (data) {
				const fr = new FileReader()
				fr.readAsDataURL(data)
				fr.onload = () => {
					setImage(fr.result as string)
				}
			}
		})()
	}, [path])

	if (!image) {
	}

	return <Image source={{ uri: image || fallback }} {...imageProps} />
}
