export type PivotOptions<T> = {
  columnField: keyof T
  columnHeader?: string
  columnValueGetter?: (value: string | number) => string | undefined
  renderColumnHeader?: (value: string) => React.ReactNode
  rowField: keyof T
  rowValueGetter?: (
    value: string | number
  ) => string | number | undefined | null
  rowHeader?: string
  renderRowHeader?: (value: string) => React.ReactNode
  valueField: keyof T
  aggStrategy: PivotStrategy
  percentageOverride?: boolean
  hideTotalColumn?: boolean
  hideTotalRow?: boolean
  fixedHighlight?: boolean
}
export function pivotData<T extends object>(
  data: T[],
  options: PivotOptions<T>
) {
  const columnSet = new Set<string>()
  const rowSet = new Set<string>()
  const columnTotals = new Map<string, number>()
  let valueMax = 0
  let valueTotal = 0
  const { columnField, rowField, valueField, aggStrategy, percentageOverride } =
    options
  const pivotedData: {
    [key: string | number]: { [key: string | number]: T[] }
  } = {}

  for (const item of data) {
    const rowValue = item[rowField]?.toString()?.trimEnd() || ""
    const columnValue = item[columnField]?.toString()?.trimEnd() || ""
    const relevantValue = safeNumberify(item[valueField])

    if (!pivotedData[rowValue]) {
      pivotedData[rowValue] = {}
    }

    if (!pivotedData[rowValue][columnValue]) {
      pivotedData[rowValue][columnValue] = []
    }

    // total up the values for calculating percentages
    if (relevantValue) {
      valueTotal += relevantValue as number
    }
    pivotedData[rowValue][columnValue].push({ ...item, value: relevantValue })
    rowSet.add(rowValue)
    columnSet.add(columnValue)
    const currentColumnTotal = columnTotals.get(columnValue) || 0
    if (currentColumnTotal) {
      columnTotals.set(columnValue, (relevantValue || 0) + currentColumnTotal)
    } else {
      columnTotals.set(columnValue, relevantValue || 0)
    }
  }

  // after gathering up all the data for each row/column combo, we need to aggregate it together
  for (const row of Object.keys(pivotedData)) {
    for (const column of Object.keys(pivotedData[row])) {
      const aggregatedValue = aggregateData({
        data: pivotedData[row][column],
        totalDataPoints: data.length,
        valueField: valueField,
        valueMax: valueTotal,
        columnMax: columnTotals.get(column) || 0,
        strategy: aggStrategy,
      })
      // @ts-ignore
      pivotedData[row][column] = aggregatedValue

      // keep track of the max number
      if (aggregatedValue && valueMax < aggregatedValue) {
        valueMax = aggregatedValue as number
      }
    }
  }

  return { data: pivotedData, columnSet, rowSet, maxValue: valueMax }
}
export type PivotStrategy =
  | "sum"
  | "avg"
  | "count"
  | "percentage"
export function safeNumberify<T>(
  value: string | number | undefined | null | T[keyof T]
) {
  return value ? Number(value) : 0
}
export function aggregateData<T>({
  data,
  totalDataPoints,
  valueField,
  valueMax,
  columnMax = 1,
  strategy,
}: {
  data: T[]
  totalDataPoints: number
  valueField: keyof T
  valueMax: number
  columnMax?: number
  strategy: PivotStrategy
}) {
  switch (strategy) {
    case "sum":
      return data.reduce(
        (acc, curr) => acc + safeNumberify(curr[valueField]),
        0
      )
    case "avg":
      if (data.length === 0) {
        return null
      }
      return (
        data.reduce((acc, curr) => acc + safeNumberify(curr[valueField]), 0) /
        data.length
      )
    case "count":
      return data.length
    case "percentage":
      return (
        data.reduce((acc, curr) => acc + safeNumberify(curr[valueField]), 0) /
        valueMax
      ) || 0
    default:
      return 0
  }
}

