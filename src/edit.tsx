import './App.css';
import { bitable, IFieldMeta, FieldType, ITable, IRecordList} from "@lark-base-open/js-sdk";
import React from 'react';
import { Input, Button, Tooltip  , Divider } from 'antd';
import {getLan} from './lang'


// bitable.base.getTableById('')
interface IProps{
    SelectLs:Array<string>,
    setWrongMassage:(wrongMas: string)=>void,
    checkUp:()=>string,
    eng: boolean,
}


interface IState{
    wrongMassage:string,
    name:string,



    

}
export default class Edit extends React.Component<IProps,IState>{
    
    constructor(props:IProps){
        
        super(props);
        this.state = {
            wrongMassage:'',
            name:getLan(6,this.props.eng),
        }
        
        
        
        
                    
       
    } 
    render(){

        

        return <div className='editD' >
            <div className='outputD'>
                <Input   size='small' placeholder={getLan(9,this.props.eng)} onChange={(val)=>this.setState({name:val.target.value})}/>
                <Divider/>
                <Button type='primary'  onClick={this.checkup} size='small' >{getLan(10,this.props.eng)}</Button>
            </div>
          </div>
        
         
    }
   
    checkup =()=>{
        this.props.checkUp()?console.dir('wrong'):this.setAllData()        
        
        
  
      }
    setAllData = ()=>{
        this.upDate().then(val=>{
            let isNum:boolean 
            for (let value of val.values()) {
                isNum = typeof(value) =='number'?true:false;
                break
            }
            bitable.base.getTableById(this.props.SelectLs[3]).then((table=>{
                table.addField({ type: isNum?FieldType.Number:  FieldType.Text, name:this.state.name }).then(newFieldId=>{
                    table.getRecordList().then(recLs=>{
                                        for(let rec of recLs){
                                            rec.getCellByField(this.props.SelectLs[4]).then(cel1=>{
                                                cel1.getValue().then(cel2=>{
                                                    let ne1 = ((typeof(cel2) =='number')?cel2:cel2[0].text)
                                                    rec.getCellByField(newFieldId).then(cell=>{cell.setValue(isNum?val.get(ne1):(val.get(ne1).text?val.get(ne1).text:val.get(ne1)[0].text)).then(re=>this.props.setWrongMassage(''))}) })})}})})
                                                    .catch(reject=>this.props.setWrongMassage(getLan(15,this.props.eng)))
                                                }))})

    }
    upDate =()=>{
        let promise = new Promise<Map<any, any>>((resolve, reject) => {
            
            bitable.base.getTableById(this.props.SelectLs[0])
            .then(table=>{ 
                let map = new Map
                table.getRecordList()
                .then(recLs=>{
                   
                    for(let rec of recLs){
                        rec.getCellByField(this.props.SelectLs[1]).then(cel1=>{
                            this.props.SelectLs[2]?rec.getCellByField(this.props.SelectLs[2]).then(cel2=>{
                                cel1.getValue().then(val1=>{
                                    cel2.getValue().then(val2=>{
                                        let ne1 = ((typeof(val1) =='number')?val1:val1[0].text)
                                        // console.log(val1[0].text, val2)
                                        map.set(ne1, val2)
                                    }).then((val1)=>resolve(map))
                                })
                            }):null
                        })
                    }
                })
    
            }
            )

            
        })
        return promise
        
        
    }
    
    
    
    
    
}
