import './App.css';
import { bitable, IFieldMeta, FieldType, ITable, IRecordList,ITableMeta} from "@lark-base-open/js-sdk";
import React from 'react';
import { Radio, Button, Cascader , Divider } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
  disabled?: boolean;
}
let optionLists: Option[] =[]
interface MyTable{
    name:string,
    id:string,

}
interface IState{
    tableList: ITableMeta[],
    tableOptions: Option[],
    allFiledList: Option[],
    resoureId:string,
    resoureField:string,
    
    

}
interface IProps{
    name:string,
    changeSelect?:(tableId:string, fieldList:Option[]|undefined,field:Option)=>void,
    setOutputTableId?:(tableId:string, fieldId:string)=>void
    

}
export default class BiCascader extends React.Component<IProps,IState>{
    
    constructor(props:IProps){
        
        super(props);
        this.state = {
            tableList:[],
            tableOptions: [],
            allFiledList:[],
            resoureId:'',
            resoureField:'',

                    
                }
 
    }
    static defalutProps = {}      
    render(){
        return <div className = 'biCarb'>
            <Cascader style={{maxWidth:'100%',}} allowClear ={false} size='small' options={this.state.allFiledList}  onChange={(value, selectedOptions)=>{
                // console.dir(this.state.allFiledMap.get(selectedOptions[0].value))
                // this.props.changeSelect?this.props.changeSelect(selectedOptions[0].value,this.state.allFiledMap.get(selectedOptions[0].value)):null
                // console.dir(value)
                // console.dir(this.state.allFiledList)
                this.state.allFiledList.map((FiledList)=>{

                    if(value[0] === FiledList.value){

                        this.props.changeSelect?this.props.changeSelect(FiledList.value, FiledList.children, selectedOptions[1] ):null
                        this.props.setOutputTableId?this.props.setOutputTableId(FiledList.value, value[1].toString()):null
                    }
                })
                //   this.setState({resoureId: selectedOptions[0].value, resoureField: selectedOptions[1].label},)
                }
            }/>
          
            </div>
        
         
    }
    componentDidMount(){ 
        bitable.base.getTableMetaList()
        .then(tabLs=>{
            // console.dir(tabLs)
            
            this.setState({tableList: tabLs},()=>this.getAllFiled().then((val)=>{
                // console.dir(val)
                let options:Option[] = []
                val.forEach((value, key, map)=>{
                    let chOptions:Option[] = []
                    value.map(valu=>{
                        chOptions.push({
                            value:valu.id,
                            label:valu.name,
                        })

                    })
                    

                    options.push({
                        value: key.id,
                        label: key.name,
                        children: chOptions,
                    } )
                    // console.dir(options)
                })
                // console.dir(options)
                this.setState({allFiledList: options,})}))
        })

    }

    getAllFiled = ()=>{
        const promise = new Promise<Map<MyTable,IFieldMeta[]>>((resolve, reject) => {
            let optionNew = new Map
            bitable.base.getTableList().then((tableLis)=>{
                // console.dir(tableLis)
                for(let table of tableLis){
                    // console.dir(table.id)

                    table.getFieldMetaList()
                    // .then((val)=>optionNew.set(val.,val))
                    .then(
                        val=>table.getName().then(tableName=>optionNew.set({id:table.id,name:tableName},val))
                    )
                    .then(()=>resolve(optionNew))
                }
            })
});
          
          return promise
    }
    
    
     
    
}
