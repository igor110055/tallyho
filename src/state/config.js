export const Abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_vestedTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_recurring",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_recurringAmounts",
				"type": "uint256"
			}
		],
		"name": "AddS1address",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_vestedTime",
				"type": "uint256"
			}
		],
		"name": "AddS2address",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			}
		],
		"name": "AddS3address",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "DeceasedInheritorTokens",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "DeceasedTokens",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "InheritorValidation",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "S1Array",
		"outputs": [
			{
				"internalType": "address",
				"name": "depositor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "beneficiaries",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amounts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vestedTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "distributed",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "recurring",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "recurringAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "S1ArrayIndexMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_beneficiaries",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amounts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_vestedTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_phrase",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_recurring",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_recurringamounts",
				"type": "uint256"
			}
		],
		"name": "S1Deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "S1ExistenceCheck",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "S1IndexNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "S2Array",
		"outputs": [
			{
				"internalType": "address",
				"name": "depositor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "beneficiaries",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amounts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vestedTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "distributed",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "S2ArrayIndexMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "S2ExistenceCheck",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "S2IndexNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "S3Array",
		"outputs": [
			{
				"internalType": "address",
				"name": "depositor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vestedTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "S3ArrayIndexMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_beneficiaries",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "_totalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_phrase",
				"type": "uint256"
			}
		],
		"name": "S3Deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "S3ExistenceCheck",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "S3IndexNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "S3VestingMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "vestedTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "distributed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "secondDistribute",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "numberofSignature",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_deceased",
				"type": "address"
			}
		],
		"name": "TriggerS3",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_beneficiaries",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_recurringAmounts",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "_totalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_vestedTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_phrase",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_recurring",
				"type": "uint256"
			}
		],
		"name": "bulkS1Deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_beneficiaries",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "_totalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_vestedTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_phrase",
				"type": "uint256"
			}
		],
		"name": "bulkS2Deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "changeAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			}
		],
		"name": "changeS1Amount",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numb1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb3",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb4",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb5",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb6",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb7",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb8",
				"type": "uint256"
			}
		],
		"name": "changeS1Price",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			}
		],
		"name": "changeS1address",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			}
		],
		"name": "changeS2Amount",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numb1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb3",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb4",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb5",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb6",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb7",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb8",
				"type": "uint256"
			}
		],
		"name": "changeS2Price",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			}
		],
		"name": "changeS2address",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "indexOfAddress",
				"type": "uint256"
			}
		],
		"name": "changeS3Amount",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_add",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_phrase",
				"type": "uint256"
			}
		],
		"name": "changeS3Depositor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_addresses",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			}
		],
		"name": "changeS3MultipleAddress",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numb1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb3",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb4",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb5",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb6",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb7",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numb8",
				"type": "uint256"
			}
		],
		"name": "changeS3Price",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "indexOfAddress",
				"type": "uint256"
			}
		],
		"name": "changeS3address",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_main",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_royalty",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_royalty2",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_mkt",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_research",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_security",
				"type": "address"
			}
		],
		"name": "changeWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "checkUpkeep",
		"outputs": [
			{
				"internalType": "bool",
				"name": "upkeepNeeded",
				"type": "bool"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			}
		],
		"name": "deleteS1address",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			}
		],
		"name": "deleteS2address",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_indexOfArray",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "indexOfAddress",
				"type": "uint256"
			}
		],
		"name": "deleteS3address",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "distributionS1",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "distributionS2",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "distributionS3",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_depositor",
				"type": "address"
			}
		],
		"name": "getNumberS3ofAccounts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "depositor",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "beneficiaries",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "amounts",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "totalAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "vestedTime",
						"type": "uint256"
					}
				],
				"internalType": "struct TPAYDEFI.S3Account[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberofAccounts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "depositor",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "beneficiaries",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amounts",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "vestedTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "distributed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "recurring",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "recurringAmount",
						"type": "uint256"
					}
				],
				"internalType": "struct TPAYDEFI.S1Account[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberofS2Accounts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "depositor",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "beneficiaries",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amounts",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "vestedTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "distributed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					}
				],
				"internalType": "struct TPAYDEFI.S2Account[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getfullS3Array",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "depositor",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "beneficiaries",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "amounts",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "totalAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "vestedTime",
						"type": "uint256"
					}
				],
				"internalType": "struct TPAYDEFI.S3Account[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "interval",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastTimeStamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "performUpkeep",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s1price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "S1BNBPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S1TALLYPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S1AddWalletPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S1AddwalletTally",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S1removeWalletPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S1removeWalletTally",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S1ChagneWalletPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S1ChagneWalletTally",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s2price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "S2BNBPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S2TALLYPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S2AddWalletPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S2AddwalletTally",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S2removeWalletPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S2removeWalletTally",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S2ChagneWalletPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S2ChagneWalletTally",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s3price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "S3BNBPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S3TALLYPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S3AddWalletPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S3AddwalletTally",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S3removeWalletPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S3removeWalletTally",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S3ChagneWalletPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "S3ChagneWalletTally",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_deceased",
				"type": "address"
			}
		],
		"name": "vestingStarted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
export const conAddress = "0x3CDb881F1cBadcEC16BFd49CE41d8AB4C3eEB6C0"

export const tokenAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minTokensBeforeSwap",
				"type": "uint256"
			}
		],
		"name": "MinTokensBeforeSwapUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokensSwapped",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ethReceived",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokensIntoLiqudity",
				"type": "uint256"
			}
		],
		"name": "SwapAndLiquify",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "enabled",
				"type": "bool"
			}
		],
		"name": "SwapAndLiquifyEnabledUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_liquidityFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_maxTxAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_taxFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tAmount",
				"type": "uint256"
			}
		],
		"name": "deliver",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "excludeFromFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "excludeFromReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "geUnlockTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "includeInFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "includeInReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "isExcludedFromFee",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "isExcludedFromReward",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "lock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tAmount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "deductTransferFee",
				"type": "bool"
			}
		],
		"name": "reflectionFromToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "liquidityFee",
				"type": "uint256"
			}
		],
		"name": "setLiquidityFeePercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "maxTxPercent",
				"type": "uint256"
			}
		],
		"name": "setMaxTxPercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_enabled",
				"type": "bool"
			}
		],
		"name": "setSwapAndLiquifyEnabled",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "taxFee",
				"type": "uint256"
			}
		],
		"name": "setTaxFeePercent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "swapAndLiquifyEnabled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "rAmount",
				"type": "uint256"
			}
		],
		"name": "tokenFromReflection",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalFees",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapV2Pair",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapV2Router",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Router02",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unlock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

export const tokenAddress = "0x95c557eAF2A00Db09628036ecf3d9Ba6E7c092aa"

const AssetAddress = "0xc0a5E512a047555A87f9291864d5f6E079EAfcAF"

export const chainId = 97

//0xdD65C7f79547Cb50e429df366A0fab903642192F

//0x127Cd433e87A6d268FE484a75A6A23313580418c