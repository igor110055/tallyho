import Web3 from 'web3'
import { Abi,conAddress,tokenAbi,tokenAddress } from './config';
import axios from 'axios';

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

var web3;
var contract
var address
var tokenContract
export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async(a,thunkApi)=>{
    

        try {
            if(Web3.givenProvider){ 
                web3 = new Web3(Web3.givenProvider);
			    await Web3.givenProvider.enable()
                var networkId = await web3.eth.net.getId()
				contract = new web3.eth.Contract(Abi, conAddress);
				tokenContract = new web3.eth.Contract(tokenAbi,tokenAddress)
				const addresses = await web3.eth.getAccounts()
                address = addresses[0];
				var ethBalance = await web3.eth.getBalance(address)
			    thunkApi.dispatch(balance({
                    // contract,
                    // address: address,
					// tokenContract

                }))
				return {
                    web3,
                    contract,
                    address,
					conAddress,
					ethBalance,
                    networkId,
                                                       }
            }else {console.log("error in loading web3")
					return {web3:null,contract:null,address:null,SeekGoldAddress:null}}
        } catch (error) {
            console.log("Error", error)
        }

    }
)



export const balance = createAsyncThunk("balance",
    async ({})=>{

		
        try {
            const balance1 = await tokenContract.methods.balanceOf(address).call()
			const prices1 = await contract.methods.s1price().call()
            const prices2 = await contract.methods.s2price().call()
            const prices3 = await contract.methods.s3price().call()
            const S2Data = await contract.methods.getNumberofS2Accounts().call({from:address})
            const S1Data = await contract.methods.getNumberofAccounts().call({from:address})
            const S3Data = await contract.methods.getNumberS3ofAccounts(address).call({from:address})
            var TallyPriceGet =  await axios.get("https://api.pancakeswap.info/api/v2/tokens/0x7d340a084bd22e15884f3d7e6431c66bba97c367")
            var TallyPrice = TallyPriceGet.data.data.price
            var BNBPriceGet = await axios.get("https://api.pancakeswap.info/api/v2/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c")
            var BNBPrice = BNBPriceGet.data.data.price
            
            return {balance1,prices1,prices2,prices3,TallyPrice,BNBPrice,S2Data,S1Data,S3Data}

        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )


export const S1DepositA = createAsyncThunk("S1DepositA",
    async ({
        _recurringAmount,
        _recurring,
        _token,
        _beneficiaries,
        _amounts,
        _totalAmount,
        _vestedTime,
        _phrase,
        value
    })=>{

        try {
			const result = await contract.methods.bulkS1Deposit(
                _token,
                _beneficiaries,
                _amounts,
                _recurringAmount,
                _totalAmount,
                _vestedTime,
                _phrase,
                _recurring,

            ).send({from:address, value:value })
        } catch (error) {
            console.log("Error in S1DepositA Function",error)
        }})

export const S1DepositB = createAsyncThunk("S1DepositB",
async ({
    _token,
    _beneficiaries,
    _amounts,
    _totalAmount,
    _vestedTime,
    _phrase,
    value
})=>{
    console.log("data received",{
        _token,
        _beneficiaries,
        _amounts,
        _totalAmount,
        _vestedTime,
        _phrase,
        value
    })
    try {
        const result = await contract.methods.AddS1address(
            _token,
            _beneficiaries,
            _amounts,
//            _totalAmount,
            _vestedTime,
  //          _phrase
        ).send({from:address, value:value })
    } catch (error) {
        console.log("Error in S1DepositB Function",error)
    }})


    export const S2DepositA = createAsyncThunk("S2DepositA",
    async ({
        _token,
        _beneficiaries,
        _amounts,
        _totalAmount,
        _vestedTime,
        _phrase,
        value
    })=>{
console.log("data received in redux",{
    _token,
    _beneficiaries,
    _amounts,
    _totalAmount,
    _vestedTime,
    _phrase,
    value
})
        try {
			const result = await contract.methods.bulkS2Deposit(
                _token,
                _beneficiaries,
                _amounts,
                _totalAmount,
                _vestedTime,
                _phrase
            ).send({from:address, value:value })
        } catch (error) {
            console.log("Error in S2DepositA Function",error)
        }})

export const S2DepositB = createAsyncThunk("S2DepositB",
async ({
    _token,
    _beneficiaries,
    _amounts,
    _totalAmount,
    _vestedTime,
    _phrase,
    value
})=>{
    console.log("data received",{
        _token,
        _beneficiaries,
        _amounts,
        _totalAmount,
        _vestedTime,
        _phrase,
        value
    })
    try {
        const result = await contract.methods.AddS2address(
            _token,
            _beneficiaries,
            _amounts,
//            _totalAmount,
            _vestedTime,
  //          _phrase
        ).send({from:address, value:value })
    } catch (error) {
        console.log("Error in S2DepositB Function",error)
    }})

export const changeAmountA = createAsyncThunk("changeAmountA",
    async ({
        _amount,
        _indexOfArray,
        value
    })=>{
        
        try {
            const result = await contract.methods.changeS2Amount(
                _amount,
                _indexOfArray
            ).send({from:address, value:value })
        } catch (error) {
            console.log("Error in changeAmountA Function",error)
        }})

export const changeAddressA = createAsyncThunk("changeAddressA",
        async ({
            _address,
            _indexOfArray,
            value
        })=>{
            
            try {
                const result = await contract.methods.changeS2address(
                    _address,
                    _indexOfArray
                ).send({from:address, value:value })
            } catch (error) {
                console.log("Error in changeAddressA Function",error)
            }})

export const removeAddressA = createAsyncThunk("removeAddressA",
async ({

    _indexOfArray,
    value
})=>{
    
    try {
        const result = await contract.methods.deleteS2address(

            _indexOfArray
        ).send({from:address, value:value })
    } catch (error) {
        console.log("Error in removeAddressA Function",error)
    }})

export const changeAmountB = createAsyncThunk("changeAmountB",
    async ({
        _amount,
        _indexOfArray,
        value
    })=>{
        
        try {
            const result = await contract.methods.changeS1Amount(
                _amount,
                _indexOfArray
            ).send({from:address, value:value })
        } catch (error) {
            console.log("Error in changeAmountB Function",error)
        }})

export const changeAddressB = createAsyncThunk("changeAddressB",
        async ({
            _address,
            _indexOfArray,
            value
        })=>{
            
            try {
                const result = await contract.methods.changeS1address(
                    _address,
                    _indexOfArray
                ).send({from:address, value:value })
            } catch (error) {
                console.log("Error in changeAddressB Function",error)
            }})

export const removeAddressB = createAsyncThunk("removeAddressB",
async ({

    _indexOfArray,
    value
})=>{
    
    try {
        const result = await contract.methods.deleteS1address(

            _indexOfArray
        ).send({from:address, value:value })
    } catch (error) {
        console.log("Error in removeAddressB Function",error)
    }})

export const S3DepositA = createAsyncThunk("S3DepositA",
    async ({
        _token,
        _beneficiaries,
        _amounts,
        _totalAmount,
        
        _phrase,
        value
    })=>{
        console.log("data received",{
            _token,
            _beneficiaries,
            _amounts,
            _totalAmount,
            
            _phrase,
            value
        })
        try {
			const result = await contract.methods.S3Deposit(
                _token,
                _beneficiaries,
                _amounts,
                _totalAmount,
        
                _phrase
            ).send({from:address, value:value })
        } catch (error) {
            console.log("Error in S3DepositA Function",error)
        }})

export const S3DepositB = createAsyncThunk("S3DepositB",
        async ({
            _token,
            _beneficiaries,
            _amounts,
            
            _Index,
            
            value
        })=>{
            console.log("data received",{
                _token,
                _beneficiaries,
                _amounts,
                
                _Index,
                
                value
            })
            try {
                const result = await contract.methods.AddS3address(
                    _beneficiaries,
                    _amounts,
                    _Index,        
                ).send({from:address, value:value })
            } catch (error) {
                console.log("Error in S1DepositB Function",error)
            }})


export const removeAddressC = createAsyncThunk("removeAddressC",
            async ({
                
                _indexOfArray,
                _indexOfAddress,
                value
            })=>{
                console.log("index",_indexOfArray)
                try {
                    const result = await contract.methods.deleteS3address(
            
                        
                        _indexOfArray,
                        _indexOfAddress
                    ).send({from:address, value:value })
                } catch (error) {
                    console.log("Error in removeAddressC Function",error)
                }})

export const changeAmountC = createAsyncThunk("changeAmountC",
    async ({
        _amount,
        _indexOfArray,
        _indexOfAddress,
        value
    })=>{
        
        try {
            const result = await contract.methods.changeS3Amount(
                _amount,
                _indexOfArray,
                _indexOfAddress
            ).send({from:address, value:value })
        } catch (error) {
            console.log("Error in changeAmountC Function",error)
        }})

export const changeAddressC = createAsyncThunk("changeAddressC",
        async ({
            _address,
            _indexOfArray,
            _indexOfAddress,
            value
        })=>{
            
            try {
                const result = await contract.methods.changeS3address(
                    _address,
                    _indexOfArray,
                    _indexOfAddress
                ).send({from:address, value:value })
            } catch (error) {
                console.log("Error in changeAddressC Function",error)
            }})

export const Recovery = createAsyncThunk("Recovery",
            async ({
                _address,
                _indexOfArray,
                phrase
            })=>{
                console.log("date received",{
                    _address,
                    _indexOfArray,
                    phrase
                })
                try {
                    const result = await contract.methods.changeS3Depositor(
                        _address,
                        _indexOfArray,
                        phrase
                    ).send({from:address})
                } catch (error) {
                    console.log("Error in Recovery Function",error)
                }})


export const TriggerS3A = createAsyncThunk("TriggerS3",
async ({
    _address,
})=>{
    try {
        const result = await contract.methods.TriggerS3(
            _address,
            ).send({from:address})
    } catch (error) {
        console.log("Error in TriggerS3 Function",error)
    }})

const adoptSlice = createSlice({
    name: "AdopSlice",
    initialState: {
        web3: null,
		ethBalance: null,
        address : null,
        balance: null,
		Active: null,
        toggle: false,
		remaining: null,
        networkId: null,
        prices1: null,
        prices2: null,
        prices3: null,
        TallyPrice: null,
        BNBPrice: null,
        S2Data: null,
        S1Data:null,
        S3Data:null,



    },
    reducers: {
        toggle : (state,actions)=>{
            state.toggle = !state.toggle;
        },
		setAccount: (state,actions)=>{
			state.address = actions.payload
		}
    },
    extraReducers: {
        [initWeb3.fulfilled] : (state,action)=>{
            state.web3 = action.payload.web3;
            state.address = action.payload.address;
			state.ethBalance = action.payload.ethBalance;
            state.networkId = action.payload.networkId



         },

         [balance.fulfilled] : (state,action)=>{
            state.balance = action.payload.balance1
            state.prices1 = action.payload.prices1
            state.prices2 = action.payload.prices2
            state.prices3 = action.payload.prices3
            state.TallyPrice = action.payload.TallyPrice
            state.BNBPrice = action.payload.BNBPrice    
            state.S2Data = action.payload.S2Data
            state.S1Data = action.payload.S1Data
            state.S3Data = action.payload.S3Data
        },


		

       
        [S1DepositA.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [S1DepositA.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [S1DepositB.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [S1DepositB.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [S2DepositA.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [S2DepositA.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [S2DepositB.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [S2DepositB.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },

        [changeAmountA.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [changeAmountA.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [changeAddressA.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [changeAddressA.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [removeAddressA.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [removeAddressA.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [changeAmountB.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [changeAmountB.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [changeAddressB.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [changeAddressB.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [removeAddressB.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [removeAddressB.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [S3DepositA.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [S3DepositA.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [S3DepositB.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [S3DepositB.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [removeAddressC.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [removeAddressC.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        [changeAmountC.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [changeAmountC.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },

        [changeAddressC.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [changeAddressC.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },



        [Recovery.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [Recovery.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },

        
        [TriggerS3A.pending] : (state,action)=>{
			

            state.toggle = !state.toggle;
			state.error = null;
        },
        [TriggerS3A.fulfilled] : (state,action)=>{
			
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


        



       
//
    }
})

export const adopreducer = adoptSlice.reducer;
export const { toggle } = adoptSlice.actions
