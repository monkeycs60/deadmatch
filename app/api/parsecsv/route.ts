import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse';
import { PrismaClient } from '@prisma/client';
import { parse as parseDate, isValid } from 'date-fns';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const csvFile = formData.get('csvFile') as File | null;

	if (!csvFile) {
		return NextResponse.json(
			{ message: 'No CSV file provided' },
			{ status: 400 }
		);
	}

	const csvData = await csvFile.text();

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

		// Parser les dates au format français
		const parsedBirthdate = birthdate
			? parseDate(birthdate, 'dd/MM/yyyy', new Date())
			: null;
		const parsedDeathdate = deathdate
			? parseDate(deathdate, 'dd/MM/yyyy', new Date())
			: null;

		// Vérifier si les dates sont valides
		const isValidBirthdate = parsedBirthdate && isValid(parsedBirthdate);
		const isValidDeathdate = parsedDeathdate && isValid(parsedDeathdate);

		// Ajouter les données dans la base de données uniquement si les dates sont valides ou nulles
		if (
			(isValidBirthdate || birthdate === null) &&
			(isValidDeathdate || deathdate === null)
		) {
			await prisma.deadData.create({
				data: {
					lastname,
					firstname,
					gender,
					birthdate: parsedBirthdate,
					birthplace,
					birthcountry,
					deathdate: parsedDeathdate,
				},
			});
		}
	}

	return NextResponse.json({
		message: 'CSV data parsed and saved to database',
	});
}

export async function GET(request: NextRequest) {
	return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
