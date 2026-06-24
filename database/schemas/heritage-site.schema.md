# Heritage Site Schema

The current demo stores heritage data in TypeScript fixtures. A production
database can use this shape as the first collection model.

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Stable site identifier |
| `name` | string | Monument or heritage site name |
| `description` | string | Historical summary |
| `historicalEra` | string | Era or dynasty |
| `architectureStyle` | string | Architectural classification |
| `location` | string | Human-readable location |
| `entryFee` | string | Visitor fee details |
| `timings` | string | Opening hours |
| `crowdLevel` | string | Low, Medium, or High |
| `waitingTime` | string | Approximate visitor wait time |
