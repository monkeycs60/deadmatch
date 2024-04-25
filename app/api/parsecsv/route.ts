import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const csvFile = formData.get('csvFile') as File | null;
	console.log(csvFile);

	if (!csvFile) {
		return NextResponse.json(
			{ message: 'No CSV file provided' },
			{ status: 400 }
		);
	}

	const csvData = await csvFile.text();
	console.log(csvData);

	const records = await new Promise<any[]>((resolve, reject) => {
		parse(csvData, (err, records) => {
			if (err) {
				reject(err);
			} else {
				resolve(records);
			}
		});
	});

	for (const record of records) {
		const [
			placement,
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
				birthdate,
				// birthdate: birthdate ? new Date(birthdate) : null,
				birthplace,
				birthcountry,
				deathdate,
				// deathdate: deathdate ? new Date(deathdate) : null,
			},
		});
	}

	return NextResponse.json({
		message: 'CSV data parsed and saved to database',
	});
}

export async function GET(request: NextRequest) {
	return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
