import { getCurrentUser } from '@/lib/session'
import UserWords from '../../../components/UserWords'

export default async function UserInfo() {
	const user = await getCurrentUser()
	if (!user) return
	return (
		<div className=''>
			<p className='text-red-500'>*still creating</p>
			<h1 className='text-3xl font-semibold mb-5'>{user?.username}</h1>
			<ul className='space-y-5'>
				<li>
					<h2 className='text-2xl font-semibold mb-2'>Favorite words</h2>
					<UserWords />
				</li>
			</ul>
		</div>
	)
}
