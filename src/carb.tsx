import './App.css';
import { bitable, IFieldMeta, FieldType, ITable, IRecordList} from "@lark-base-open/js-sdk";
import React from 'react';
import { Radio, Button, Cascader , Divider } from 'antd';
// import { Button, Form } from '@douyinfe/semi-ui';
// import { BaseFormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';

const table = await bitable.base.getActiveTable();
const fieldMetaList = await table.getFieldMetaList();
const recordList = await table.getRecordList();
const tableList = await bitable.base.getTableMetaList();
// console.dir(tableList)
interface Option {
  value: string;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
  disabled?: boolean;
}
let optionLists: Option[] =[]
tableList.map(val=>{
  let newTyp:Option = {
    value: val.id,
    label: val.name,
    isLeaf: false,
    disabled:false,

  }
  optionLists.push(newTyp)
  
})
interface ICacuLs{
  key: string|number,
  value: number,
  
}
interface IState{
  handleTable:ITable,
  lookUpId: string,
  fieldList:IFieldMeta[],
  recordList:IRecordList,
  cacu:Map<string|number, number>,
  cacuLs: ICacuLs[],
  resoureIndex:number,
  resoureFieldList:IFieldMeta[],
  outputIndex:number,
  resoureTable: ITable,
  resoureId:string | number | null,
  resoureField:string | number | null,
  tableOption:Option[],
    

}
interface IProps{
  name:string,

}
export default class Carb extends React.Component<IProps,IState>{
    
    constructor(props:IProps){
        
        super(props);
        this.state = {
                  handleTable:table,
                  // indexId: '',
                  lookUpId: fieldMetaList[0].name,
                  fieldList:fieldMetaList,
                  cacu:new Map(),
                  cacuLs:[],
                  recordList:recordList,
                  resoureFieldList:fieldMetaList,
                  resoureIndex:0,
                  resoureTable: table,
                  outputIndex: 0,
                  tableOption:optionLists,
                  resoureId: '',
                  resoureField:'',
                    
                }
 
    }
    static defalutProps = {}      
    render(){
        return <div className = 'mainB'>
          <div>
            <Cascader allowClear ={false} size='small' placeholder = '请选择数据来源表格：' options={this.state.tableOption} loadData={(selectedOptions)=>{
              let targetOption = selectedOptions[selectedOptions.length - 1]
              console.dir(targetOption.value)
              bitable.base.getTableById(targetOption.value)
              .then(val=>val.getFieldMetaList())
              .then(value=>{
                let childrenLs:Option[] = []
                value.map(vl=>{
                  childrenLs.push({
                    label:vl.name + this.props.name,
                    value: vl.id + this.props.name,
                  })

                })
                targetOption.children = childrenLs
                this.setState({tableOption: [...this.state.tableOption]},)
              })
    
              
            }} onChange={(value, selectedOptions)=>{ 
                  this.setState({resoureId: selectedOptions[0].value, resoureField: selectedOptions[1].value},)
                }
                

              
              
              
            }/>
            
            
          </div>
            </div>
        
         
    }
    componentDidMount(){ 

    }
    
    
     
    
}
