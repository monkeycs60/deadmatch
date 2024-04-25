'use client';

import { UploadButton } from '@/utils/uploadthing';
import { useSession } from 'next-auth/react';

export default function Importer() {
	const session = useSession();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const csvFile = formData.get('csvFile') as File;

		if (csvFile) {
			try {
				const response = await fetch('/api/parsecsv', {
					method: 'POST',
					body: formData,
				});

				if (response.ok) {
					alert('CSV data imported successfully');
				} else {
					alert('Failed to import CSV data');
				}
			} catch (error) {
				console.error('Error:', error);
				alert('An error occurred while importing CSV data');
			}
		}
	};

	return (
		<div>
			<h1>Importer les CSV contenant les morts</h1>
			{session.data?.user ? (
				<form onSubmit={handleSubmit}>
					<input type='file' name='csvFile' accept='.csv' />
					<button type='submit'>Import CSV</button>
				</form>
			) : (
				<p>Vous devez être connecté pour importer des morts</p>
			)}
		</div>
	);
}
