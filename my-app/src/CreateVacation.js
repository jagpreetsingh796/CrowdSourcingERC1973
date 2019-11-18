import React from "react"
import firebase from './Firestore'
import { ethers } from 'ethers';
import Loader from 'react-loader-spinner'



class CreateVacation extends React.Component
{
    constructor()
    {
        super()
        this.state={
            
            Name:"",
            Goal:"",
            Id:"",
            // loading1: false,
            // loading2:false,
           
        }
        this.handlechange=this.handlechange.bind(this)
        this.handlesubmit=this.handlesubmit.bind(this)
        // this.handlesubmit1=this.handlesubmit1.bind(this)
    }
    handlechange=(e) =>
    {
        this.setState({
            [e.target.name]:e.target.value
        },console.log(this.state))
    }
    handlesubmit= async(e)=>
    {
        e.preventDefault();
        let ethereum = window.ethereum;
        let addr=await ethereum.enable()
        let  provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();
        let abi=[
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "name": "contributor",
                        "type": "address"
                    }
                ],
                "name": "getaddContributorId",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "getdonatebyId",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "name": "contributor",
                        "type": "address"
                    }
                ],
                "name": "getremoveContributorId",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "getwithdrawbyId",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_goal",
                        "type": "uint256"
                    },
                    {
                        "name": "_rewards",
                        "type": "address"
                    }
                ],
                "name": "newFactory",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "_database",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "CrowdId",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "database",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getid",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]
        let address="0xc5352569c97a485fc359444fcd6ab6c9ed25d797"
        
        let contract = new ethers.Contract(address, abi, signer);
        let rewards="0x8566f909e9af442dcfb075bfc48e489dd2f43019"
       
        let tx1= await contract.newFactory(this.state.Goal,rewards)
        
        let Id=await contract.getid()
        console.log("The id is",parseInt(Id._hex))
        Id=parseInt(Id._hex)
       
        const db = firebase.firestore();
        
        const userRef = db.collection("users").add({
            Id: Id,
            Name:this.state.Name,
            
            
            
          });

          this.setState({
            Name:"",
            Goal:""
          })
          debugger
          
        

    }
    render()
    {
        return(
            <div>
                <form onSubmit={this.handlesubmit}>
                <input  type="text"  name="Name"  label="Name" onChange={this.handlechange} value={this.state.Name} placeholder="Enter Name"/>
                 <input type="text"  name="Goal" label="Goal" onChange={this.handlechange}  value={this.state.Goal} placeholder="Enter Amount (ex. ETH)"/>
                 <button type="submit" >Submit</button>


                </form>
            </div>
        )
    }

}

export default CreateVacation