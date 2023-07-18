import React from 'react'
import Header from '@/components/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main
				className='mx-auto xl:max-w-7xl max-2xl:px-5'
				style={{
					minHeight: 'calc(100vh - 106px)',
				}}>
				{children}
			</main>
		</>
	)
}
