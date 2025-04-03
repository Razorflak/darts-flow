import { readdirSync, statSync } from "node:fs"
import path from "node:path"

export const getMostRecentFile = (dir: string): string | null => {
	const files = readdirSync(dir)

	// Si le répertoire est vide, retourner null
	if (files.length === 0) return null

	// Trouver le fichier le plus récent
	const mostRecentFile = files
		.map((file) => {
			const filePath = path.join(dir, file)
			const stats = statSync(filePath) // Récupérer les stats du fichier
			return { file, mtime: stats.mtime } // Retourner le nom du fichier et la date de modification
		})
		.reduce((latest, current) => {
			return current.mtime > latest.mtime ? current : latest // Comparer les dates de modification
		})

	return mostRecentFile.file // Retourner le nom du fichier le plus récent
}
