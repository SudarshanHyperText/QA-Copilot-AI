import fs from "fs";
import { PDFParse } from "pdf-parse";

export async function extractTextFromPDF(filePath: string): Promise<string> {

    const dataBuffer = fs.readFileSync(filePath);

    const parser = new PDFParse({
        data: dataBuffer
    });

    try {

        const result = await parser.getText();

        return result.text.trim();

    } finally {

        await parser.destroy();

    }
}