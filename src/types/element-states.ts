export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export const colorMap = new Map();
colorMap.set(ElementStates.Default, '4px solid rgb(0, 50, 255)')
colorMap.set(ElementStates.Changing, '4px solid rgb(210, 82, 225)')
colorMap.set(ElementStates.Modified, '4px solid rgb(127, 224, 81)')
