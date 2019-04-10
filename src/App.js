import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';







const Card = function(props){ return <div  className=" move card  shadow p-3 mb-5 bg-white rounded   ">
                                             <div className="card-body ">
                                             <h5 className="card-title">{props.card_info.BANK}</h5>
                                        <div>{props.card_info.BANKCODE}</div>
                                      <div>{props.card_info.CITY}</div>
                                      <div>{props.card_info.STATE}</div>
                                      <div>{props.card_info.ADDRESS}</div>
                                      <div>{props.card_info.CONTACT}</div>
                                      <div>{props.card_info.BRANCH}</div>
                                      </div></div>;}




class App extends Component {
  constructor(){
    super();
    this.state={ifsc:"",card:{},show_cards:false,show_cards_region:false,ifsc_error:false,region_error:false,bank:[
{CONTACT:"",BRANCH:"MORADABAD",STATE:"UTTAR PRADESH",ADDRESS:"SHOP NO 19 TO 23, LOWER GROUND FLOOR, CHADDHA SHOPPING COMPLEX, G. M. D. ROAD, MORADABAD 244001",CITY:"MORADABAD",DISTRICT:"MORADABAD",BANK:"ICICI Bank",BANKCODE:"ICIC",IFSC:"ICIC0000190"},
{BRANCH:"MORABADBAD",ADDRESS:"CHADDHA SHOPPING COMPLEX,GMD ROADMORADABADUTTAR PRADESH244001",CONTACT:"9935903333",CITY:"MORADABAD",DISTRICT:"MORADABAD",STATE:"UTTAR PRADESH",BANK:"HDFC Bank",BANKCODE:"HDFC",IFSC:"HDFC0000303"},
{BRANCH:"MORADABAD",ADDRESS:"PRAHLAD MARKET, MANDI CHOWK, MORADABAD, UP,244001",CONTACT:"",CITY:"MORADABAD",DISTRICT:"MORADABAD",STATE:"UTTAR PRADESH",BANK:"State Bank of India",BANKCODE:"SBIN",IFSC:"SBIN0002581"},
{"CITY":"JAIPUR","CONTACT":"2367175","BRANCH":"JAIPUR","STATE":"RAJASTHAN","ADDRESS":"G-1,PBNO354,SHYAMANUKAMPA,O-11,ASHOKMARG,C-SCHEME,JAIPUR302001JAIPURATSBT","DISTRICT":"JAIPUR","BANK":"State Bank of India","BANKCODE":"SBIN","IFSC":"SBIN0070612"},
{"BRANCH":"JAIPUR - JOHARI BAZAR","ADDRESS":"PANDYA BHAWAN,SHOP NO 85-86JOHARI BAZARJAIPURRAJASTHAN302003","CONTACT":"9875003333","CITY":"JAIPUR","DISTRICT":"JAIPUR","STATE":"RAJASTHAN","BANK":"HDFC Bank","BANKCODE":"HDFC","IFSC":"HDFC0000289"},
{"CONTACT":"9893603333","BRANCH":"BHOPAL - MADYA PRADESH","STATE":"MADHYA PRADESH","ADDRESS":"E-1/57, ARERA COLONYSCHEME OF CAPITAL PROJECTBHOPALMADHYA PRADESH462016","CITY":"BHOPAL","DISTRICT":"BHOPAL","BANK":"HDFC Bank","BANKCODE":"HDFC","IFSC":"HDFC0000062"},
{"BRANCH":"BHOPAL","ADDRESS":"TT NAGAR, BHOPAL,MP","CONTACT":"","CITY":"BHOPAL","DISTRICT":"BHOPAL","STATE":"MADHYA PRADESH","BANK":"State Bank of India","BANKCODE":"SBIN","IFSC":"SBIN0001308"},
{"CITY":"BHOPAL","CONTACT":"6612001","BRANCH":"BHOPAL, MADHYA PRADESH","STATE":"MADHYA PRADESH","ADDRESS":"YES BANK LTD., GR FLOOR,, PLOT NO. 215, MP NAGAR,, PHASE 1, BHOPAL, MADHYA PRADESH-462011","DISTRICT":"BHOPAL","BANK":"Yes Bank","BANKCODE":"YESB","IFSC":"YESB0000119"},
{"BRANCH":"BHOPAL","ADDRESS":"PLOT NO 165A & 166, STAR ARCADE  M P NAGAR, ZONE 1","CONTACT":"","CITY":"BHOPAL","DISTRICT":"BHOPAL","STATE":"MADHYA PRADESH","BANK":"Axis Bank","BANKCODE":"UTIB","IFSC":"UTIB0000044"}

],Region_bank:[],region:false}
  }

  handleClick(e){

 this.setState({ifsc:e.target.value});

  }


  handleChangeChk(e){

     let isChecked = e.target.checked;
     if(isChecked)
this.setState({region:true});
else {this.setState({region:false});

}
  }

  search(){
var url="https://ifsc.razorpay.com/";
var new_url=url+this.state.ifsc;
if(!this.state.region)
$.ajax({
    url: new_url,
    dataType: 'json',

    success: (data) => {

    this.setState({card:data,show_cards:true,ifsc_error:false,show_cards_region:false})
  },
  error: (xhr,err) =>{
  if(err)
  this.setState({ifsc_error:true,show_cards:false,show_cards_region:false});
  }
  });
else {

var arr=[]
for(var i=0;i<this.state.bank.length;i++)
if(this.state.bank[i].DISTRICT==this.state.ifsc.toUpperCase())
arr.push(this.state.bank[i]);
if(arr.length==0)
this.setState({Region_bank:arr,show_cards_region:false,show_cards:false,region_error:true});
else
this.setState({Region_bank:arr,show_cards_region:true,show_cards:false,region_error:false});


}

}
  render() {
    console.log(this.state.region);
    console.log(this.state.Region_bank)

    return (
      <div>

      <div class="custom-control custom-checkbox cbox">
        <input type="checkbox" className="custom-control-input" onChange={this.handleChangeChk.bind(this)} id="customCheck1"/>
        <label className="custom-control-label" for="customCheck1">Search By Region</label>
      </div>
      <div class="form-group">
  <input  class="form-control input" placeholder="IFSC Code" onChange={this.handleClick.bind(this)}/>

        <button className="btn btn-secondary"onClick={this.search.bind(this)}>Search</button>
</div>
    {this.state.ifsc_error?<div  className="alert alert-danger msg"><strong> Incorrect </strong>IFSC Code , check your input</div>:null}
      {this.state.show_cards?<Card className="shift" card_info={this.state.card}/>:null}

  {this.state.region_error?<div  className="alert alert-danger msg"><strong> Incorrect </strong>Region , or Data out of bound</div>:null}

            {(this.state.show_cards_region)?(this.state.Region_bank.map((info,index)=>
      <Card className="shift" key={index} card_info={info}/>)):null
            }
</div>


    );
  }
}

export default App;
