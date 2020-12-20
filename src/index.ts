import pivot from './pivot'

type PivotConfig = {
    groupField: string;
    valueField: (string | Array<string>);
    pivotFunction: string;
}

export default function (data: Array<object>, pivotconfig: PivotConfig) {
    return pivot(data, pivotconfig)
}
  