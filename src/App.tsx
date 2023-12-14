import './App.css';
import { bitable, IFieldMeta, FieldType, ITable, IRecordList} from "@lark-base-open/js-sdk";
import BiCascader from "./BiCascader";
import ResoureCad from "./ResoureCascader";
import Edit from "./edit";
// import {MainContain} from "./Contain"
import React from 'react';
import { Tag, Switch, Button,  Tooltip  , Divider } from 'antd';
import {getLan} from './lang'
interface IState{
  resoureTableId:string,
  resoureMatchFieldId:string,
  resoureLookupField:string,
  outputTableId:string,
  outputMatchFieldId:string,
  wrongMassage:string,
  eng:boolean

    

}
export default class App extends React.Component<any,IState>{
    
    constructor(props:any){
        
        super(props);
        this.state = {
          resoureTableId:'',
          resoureMatchFieldId:'',
          resoureLookupField:'',
          outputTableId:'',
          outputMatchFieldId:'',
          wrongMassage:'',
          eng:false

        }

        //   })
        
        
        
        
                    
       
    } 
    render(){

        

        return <div className='appMain'>
          <div className='titleD'>
            <div className='icon'>S-lookup</div>
            <div className='changeD'>
              <div>Language </div>
              <Switch onChange={(val)=>{this.setState({eng: val},this.checkUp)}} checkedChildren="Eng" unCheckedChildren="中文"  size='small'/>

            </div>
            
            </div>
          <div className='whiteFronD'>
          <div className='tipD'>{getLan(0,this.state.eng)}</div>
          <div className='borderFronD'>
            <ResoureCad eng={this.state.eng} setResoureTableId={this.setResoureTableId} setResoureLookupField={this.setResoureLookupField} name='re'/>  
            <Divider/>
              <div className='ReCarbIt'>
                <div>{getLan(2,this.state.eng)}<Button type='link' size = 'small' >{getLan(7,this.state.eng)}</Button> {getLan(4,this.state.eng)} <Button type='link' size = 'small' >{getLan(5,this.state.eng)}</Button></div>
                <BiCascader setOutputTableId = {this.setOutputTableId} name='字段'/>
              </div>
            <Divider/>

            
            <Edit eng ={this.state.eng} checkUp = {this.checkUp} setWrongMassage = {this.setWrongMassage} SelectLs = {[this.state.resoureTableId,this.state.resoureMatchFieldId,this.state.resoureLookupField, this.state.outputTableId,this.state.outputMatchFieldId,  ]}></Edit>
          
          </div>
          <div className='wrongTipD'>
            <div>{getLan(11,this.state.eng)}</div>
            {this.state.wrongMassage}</div>

            </div>
          </div>
        
         
    }
    componentDidMount(){
      this.checkUp()
    }
    setResoureTableId = (tableId:string, fieldId:string)=>{
      this.setState({resoureTableId: tableId, resoureMatchFieldId: fieldId},this.checkUp )
    }
    setResoureLookupField = (fieldId:string)=>{
      this.setState({resoureLookupField: fieldId} ,this.checkUp )
    }
    setOutputTableId = (tableId:string, fieldId:string)=>{
      this.setState({outputTableId: tableId, outputMatchFieldId:fieldId} ,this.checkUp )
    }
    setWrongMassage=(wrongMas: string)=>{
      this.setState({wrongMassage: wrongMas,} )
    }
    checkUp = ()=>{
      let newWrongMas:string = 
      this.state.outputMatchFieldId && this.state.outputTableId &&this.state.resoureLookupField&& this.state.resoureMatchFieldId&& this.state.resoureTableId?(this.state.outputTableId == this.state.resoureTableId?getLan(12,this.state.eng):(this.state.resoureLookupField== this.state.resoureMatchFieldId?getLan(13,this.state.eng):'')):getLan(14,this.state.eng)
      this.setWrongMassage(newWrongMas)
      // console.log(newWrongMas) 
      return newWrongMas
    }

    
    
    
    
    
}
