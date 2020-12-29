import {separator} from './settings'

const isObject = (item: any) => item && typeof item === 'object' && !Array.isArray(item)

// from: https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeDeep(target: { [x: string]: any; }, ...sources: object[]): any {
    if (!sources.length) return target;
    const source = sources.shift();
  
    if (isObject(target) && isObject(source)) {
      for (const key in source!) {
        if (isObject((<any>source)[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], (<any>source)[key]);
        } else {
          Object.assign(target, { [key]: (<any>source)[key] });
        }
      }
    }
    return mergeDeep(target, ...sources);
  }

export default function getTreeResults (results: Array<object>): object {
    const firstResultKeys = Object.keys(results[0])
    const firstKey = firstResultKeys[0]
    const columns = [...firstKey.split(separator), ...firstResultKeys.slice(1, )]
    if (!firstKey.includes(separator)) {
        return {
            columns,
            values: results.map(item => columns.map(
                column => (<any>item)[column]
            ))
        }
    }
    let outObject = {}
    results.forEach(item => {
        const values = Object.keys(item).slice(1, ).map(x => (<any>item)[x])
        const keys = (<any>item)[firstKey].split(separator)
        let previousObject: object
        keys.reverse().forEach((key: string, i: number) => {
          if (!previousObject) {
            previousObject = {
              [key]: values
            }
          }
          else {
            previousObject = {
              [key]: previousObject
            }
          }
          if (i === keys.length - 1) {
            outObject = mergeDeep(outObject, previousObject)
          }
        })
    })
    return {
      columns,
      values: outObject
    }
}