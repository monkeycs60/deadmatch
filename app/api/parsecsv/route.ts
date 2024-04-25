import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'csv-parse';
import prisma from '@/lib/prisma';


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const csvData = req.body;

		const records = await new Promise<any[]>((resolve, reject) => {
			parse(csvData, (err: unknown, records: unknown) => {
				if (err) {
					reject(err);
				} else {
					resolve(records as any[]);
				}
			});
		});

		for (const record of records) {
			const [
				lastname,
				firstname,
				gender,
				birthdate,
				birthplace,
				birthcountry,
				deathdate,
			] = record;

			await prisma.deadData.create({
				data: {
					lastname,
					firstname,
					gender,
					birthdate: birthdate ? new Date(birthdate) : null,
					birthplace,
					birthcountry,
					deathdate: deathdate ? new Date(deathdate) : null,
				},
			});
		}

		res.status(200).json({
			message: 'CSV data parsed and saved to database',
		});
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
