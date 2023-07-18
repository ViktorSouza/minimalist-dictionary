'use client'
import React from 'react'
import { SessionProvider as SessionProviderAuth } from 'next-auth/react'
import { ThemeProvider } from '../hooks/useTheme'

export default function SessionProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SessionProviderAuth>
			<ThemeProvider>{children}</ThemeProvider>
		</SessionProviderAuth>
	)
}
