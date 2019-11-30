import React from "react"
import firebase from './Firestore'
import { ethers } from 'ethers';
import Loader from 'react-loader-spinner'

class Withdraw extends React.Component
{
    constructor()
    {
        super()
        this.state={
            
            
            Id:"",
            
           
        }
        this.handlechange=this.handlechange.bind(this)
        this.handlesubmit=this.handlesubmit.bind(this)
        
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
        // let rewards="0x8566f909e9af442dcfb075bfc48e489dd2f43019"
        
        let tx1= await contract.getwithdrawbyId(this.state.Id)
        this.setState({
            Id:"",
           
          })
      
        
    }
    render()
    {
        return(
            <div>
                <form onSubmit={this.handlesubmit}>
                
                <input  type="text"  name="Id"  label="Id" onChange={this.handlechange} value={this.state.Id} placeholder="Enter Id"/>
                
                 <button type="submit" >Submit</button>


                </form>
            </div>
        )
    }
}
export default Withdraw