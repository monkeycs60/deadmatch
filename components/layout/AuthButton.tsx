'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from '../ui/button';

export const LoginButton = () => {
	return (
		<Button variant='default' onClick={() => signIn()}>
			Se connecter
		</Button>
	);
};

export const LogoutButton = () => {
	return (
		<Button variant='outline' onClick={() => signOut()}>
			Se déconnecter
		</Button>
	);
};
