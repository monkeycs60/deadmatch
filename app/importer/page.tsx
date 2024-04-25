'use client';

import { UploadButton } from '@/utils/uploadthing';
import { useSession } from 'next-auth/react';

export default function Importer() {
	const session = useSession();

	const handleUploadComplete = async (res: any) => {
		const csvFile = res[0];
		console.log('CSV file:', csvFile);
		const csvData = await csvFile.data.text();

		try {
			const response = await fetch('/api/parsecsv', {
				method: 'POST',
				headers: {
					'Content-Type': 'text/csv',
				},
				body: csvData,
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
	};

	return (
		<div>
			<h1>Importer les CSV contenant les morts</h1>
			{session.data?.user ? (
				<UploadButton
					endpoint='imageUploader'
					onClientUploadComplete={(res) => {
						// Do something with the response
						console.log('Files: ', res);
						handleUploadComplete(res);
					}}
					onUploadError={(error: Error) => {
						// Do something with the error.
						alert(`ERROR! ${error.message}`);
					}}
				/>
			) : (
				<p>Vous devez être connecté pour importer des morts</p>
			)}
		</div>
	);
}
