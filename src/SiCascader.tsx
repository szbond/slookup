import './App.css';
import { bitable, IFieldMeta, FieldType, ITable, IRecordList,ITableMeta} from "@lark-base-open/js-sdk";
import React from 'react';
import { Radio, Button, Cascader , Divider, } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
  disabled?: boolean;
}
let optionLists: Option[] =[]

interface IState{
    tableList: ITableMeta[],
    tableOptions: Option[],
    allFiledList: Option[],
    resoureId:string,
    resoureField:string,
    

}
interface IProps{
    name:string,
    fieldList:Option[]|undefined,
    changeLookup:(field:Option)=>void,

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
        
        // console.dir('lll')
        return <div className = 'siCarb'>
            <Cascader style={{maxWidth:'100%',}} allowClear ={false} size='small' options={this.props.fieldList}  onChange={(value, selectedOptions)=>{ 
                // console.dir(value)
                //   this.setState({resoureId: selectedOptions[0].value})
                this.props.changeLookup(selectedOptions[0])
                }
            }/>
          
            </div>
        
         
    }
    componentDidMount(){ 
        bitable.base.getTableMetaList()
        .then(tabLs=>{
            // console.dir(tabLs)
            
            this.setState({tableList: tabLs},()=>this.getAllFiled().then((val)=>{
                let options:Option[] = []
                val.forEach((value, key, map)=>{
                    let chOptions:Option[] = []
                    value.map(valu=>{
                        chOptions.push({
                            value:valu.id,
                            label:valu.name + this.props.name,
                        })

                    })
                    

                    options.push({
                        value: key,
                        label: key,
                        children: chOptions,
                    } )
                    // console.dir(options)
                })
                // console.dir(options)
                this.setState({allFiledList: options})}))
        })

    }

    getAllFiled = ()=>{
        const promise = new Promise<Map<string,IFieldMeta[]>>((resolve, reject) => {
            let optionNew = new Map
            bitable.base.getTableList().then((tableLis)=>{
                // console.dir(tableLis)
                for(let table of tableLis){
                    // console.dir(table.id)

                    table.getFieldMetaList()
                    .then(val=>table.getName().then(tableName=>optionNew.set(tableName,val)))
                    .then(()=>resolve(optionNew))
                }
            })
});
          
          return promise
    }
    
    
     
    
}
