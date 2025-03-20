import { NoteDegree } from '$lib/types/note-degree';

export class DegreeHelper {
	public static getCOFIndexByKey(key: number): number {
		const index = key % 12;
		const degree = NoteDegree.asToneList[index];
		return NoteDegree.asCOFList.findIndex((d) => d.name === degree.name);
	}

	public static getDegreeIndexCOF(degree: NoteDegree) {
		return NoteDegree.asCOFList.findIndex((d) => d.name === degree.name);
	}

	public static getDegreeByIndexCOF(index: number) {
		return NoteDegree.asCOFList[index];
	}
}
