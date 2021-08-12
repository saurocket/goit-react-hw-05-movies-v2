export const dataFilter = (arr:Array<{ id: number, title: string } | any>) =>{
    return arr.filter((item, index, arr) => {
        return index===arr.findIndex(a => a.id===item.id)
    })
}