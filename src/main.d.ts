interface PivotConfig {
    groupField: string;
    valueField: (string | Array<string>);
    pivotFunction: string;
}
