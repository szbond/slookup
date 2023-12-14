interface Lan {
    ch:string,
    en:string,
}

const alllanList:Lan[] = [
    {ch:'前言：数据表与导出表不能为同一表，查找值为唯一id，会清除重复值，导出字段与查找值不能为同一字段，可自定义输入导出字段的名称，默认名‘导出字段’',
    en:"notice: The resource-table and the export-table cannot be the same table, search-value is a unique ID, Duplicate values will be merged, the export-field and the search-value cannot be the same field, you can input the name of the resoult-field, the default name is 'export-field'"
    },
    {
        ch:'导出字段',//1
        en:'export-field'
    },{
        ch:'选择',//2
        en:'choose'
    },{
        ch:'数据表',//3
        en:'resource-table'
    },{
        ch:'与',//4
        en:'and'
    },{
        ch:'查找值',//5
        en:'search-value'
    },{
        ch:'导出字段',//6
        en:'export-field'
    },{
        ch:'导出表',//7
        en:'export-table'
    },{
        ch:'未选择',//8
        en:'unchoosen'
    },{
        ch:'输入自定义导出字段名',//9
        en:'input optional export-field name'
    },{
        ch:'确定',//10
        en:'Submit'
    },{
        ch:'错误信息:',//11
        en:'Wrong Massage:'
    },
    {
        ch:'数据表与导出表重复，请重新选择',//12
        en:'The resource-table and the export-table cannot be the same table'
    },{
        ch:'导出字段与查找值重复，请重新选择',//13
        en:'the export-field and the search-value cannot be the same field'
    },{
        ch:'未选择所有选项，请选择',//14
        en:'please complete all selections'
    },{
        ch:'新字段名已存在，请重新输入',//15
        en:'new export-field already exist, please input a new name'
    }
]
export const getLan = (ind:number, eng: boolean)=>{
    return eng?alllanList[ind].en:alllanList[ind].ch

}