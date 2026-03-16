export default function arrayCombiner(arrays: unknown[][], separator: string): string[] | undefined {
    const indexes: number[] = []
    const maxIndexes: number[] = []
    const values: unknown[] = []
    const final: string[] = []

    const stopFactor = arrays.map((x) => x.length).reduce((a, b) => a * b)

    for (const arr of arrays) {
        indexes.push(0)
        maxIndexes.push(arr.length - 1)
        values.push(0)
    }

    let i: number

    do {
        for (i = 0; i < arrays.length; ++i) {
            values[i] = arrays[i][indexes[i]]
        }
        final.push(values.join(separator))
        if (final.length === stopFactor) {
            return final
        }
        while (i--) {
            if (indexes[i] < maxIndexes[i]) {
                ++indexes[i]
                break
            } else if (i > 0) {
                indexes[i] = 0
            } else {
                return undefined
            }
        }
    } while (true)
}
