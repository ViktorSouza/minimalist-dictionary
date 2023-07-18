'use client'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
	const [theme, setTheme] = useTheme()
	return (
		<button
			title='Toggle theme'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			className='flex items-center justify-center px-3 py-2 rounded-full bg-slate-200/70 dark:bg-slate-900 '>
			{theme === 'light' ? (
				<i className='bi bi-sun'></i>
			) : (
				<i className='bi bi-moon'></i>
			)}
		</button>
	)
}
