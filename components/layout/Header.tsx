import { auth } from '@/lib/auth';
import { LoginButton, LogoutButton } from './AuthButton';

const Header = async () => {
	const session = await auth();
	return (
		<div className='flex items-center justify-between px-10 py-6'>
			<h1 className='text-2xl font-bold'>Dead Match</h1>
			<div className='flex items-center space-x-4'>
				{session?.user ? <LogoutButton /> : <LoginButton />}
			</div>
		</div>
	);
};

export default Header;
