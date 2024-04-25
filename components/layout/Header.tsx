import { auth } from '@/lib/auth';
import { LoginButton, LogoutButton } from './AuthButton';
import { UploadButton } from '@/utils/uploadthing';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '../ui/button';

const Header = async () => {
	const session = await auth();
	return (
		<div className='flex items-center justify-between px-10 py-6'>
			<Link href='/'>
				<h1 className='text-2xl font-bold'>Dead Match</h1>
			</Link>
			{session?.user && (
				<Link href='/importer'>
					<Button variant='default'>Importer les morts</Button>
				</Link>
			)}
			<div className='flex items-center space-x-4'>
				{session?.user ? <LogoutButton /> : <LoginButton />}
			</div>
		</div>
	);
};

export default Header;
