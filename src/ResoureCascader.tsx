import './App.css';
import { bitable, IFieldMeta, FieldType, ITable, IRecordList,ITableMeta} from "@lark-base-open/js-sdk";
import React from 'react';
import { Tag, Tooltip , Button , Divider } from 'antd';
import BiCascader from "./BiCascader";
import SiCascader from "./SiCascader";
import {getLan} from './lang'
interface IState{
    selectTable:string,
    selectTableFieldList:Option[]|undefined,
    selectTableField:string,
    lookupField: string,


    
    

}
interface Option {
    value: string;
    label: string;
    children?: Option[];
    isLeaf?: boolean;
    disabled?: boolean;
  }
interface IProps{
    name:string,
    eng:boolean
    setResoureTableId:(tableId:string, fieldId:string)=>void,
    setResoureLookupField:(id:string)=>void,



}

export default class ResoureCad extends React.Component<IProps,IState>{
    
    constructor(props:IProps){
        
        super(props);
        this.state = {
            selectTable:'',
            selectTableFieldList:[],
            selectTableField:'',
            lookupField:'',
                }
 
    }    
    render(){
        return <div className='ReCarb'>
            <div className='ReCarbIt'>
                <div>{getLan(2,this.props.eng)}<Button type='link' size = 'small' >{getLan(3,this.props.eng)}</Button>{getLan(4,this.props.eng)}<Button type='link' size = 'small' >{getLan(5,this.props.eng)}</Button></div>
                <BiCascader changeSelect = {this.changeSelect}  name = 'name'/>
            </div>
            <Divider/>

            <div className='ReCarbIt'>
                <div>{getLan(2,this.props.eng)}<Button type='link' size = 'small' >{getLan(1,this.props.eng)}</Button></div> 
                <SiCascader changeLookup={this.changeLookup} key={this.state.selectTable} fieldList ={this.state.selectTableFieldList} name = 'name2'/>

            </div>
            
            </div>
        
         
    }
    componentDidMount(){ 
        

    }
    changeSelect=(tableId:string, fieldList:Option[]|undefined, field:Option)=>{
        // console.dir(fieldList)
        fieldList?this.setState({selectTable:tableId,selectTableFieldList:fieldList,selectTableField: field.value}, ()=>this.props.setResoureTableId(tableId,field.value )):null
    }
    changeLookup=(field:Option)=>{
        // console.dir(field.value)
        this.props.setResoureLookupField(field.value)


    }
    
    
     
    
}
