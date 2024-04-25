import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/layout/AuthProvider';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
	title: 'Dead match',
	description: 'Find your dead match',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<html lang='en'>
				<body className='m-auto bg-zinc-200 xl:max-w-[1400px]'>
					<Header />
					{children}
				</body>
			</html>
		</AuthProvider>
	);
}
