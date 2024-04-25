import { auth } from '@/lib/auth';
import { log } from 'console';
import Image from 'next/image';

export default async function Home() {
	const session = await auth();
	console.log(session);
	return (
		<div className='bg-zinc-500 px-4 py-6'>
			<h2>Hello toi</h2>
			{session?.user ? (
				<div>
					{session.user.image && session.user.name && (
						<Image
							src={session.user.image}
							alt={session.user.name}
							width={50}
							height={50}
						/>
					)}
					<h3>{session.user.name}</h3>
					<p>{session.user.email}</p>
				</div>
			) : (
				<p>Not connected</p>
			)}
		</div>
	);
}
