const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "studentID",
				"type": "uint256"
			}
		],
		"name": "chkIssue",
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
		"name": "getCertificateCnt",
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
				"name": "studentID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "endDate",
				"type": "string"
			}
		],
		"name": "graduate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "studentID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "issueDate",
				"type": "string"
			}
		],
		"name": "issue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "studentID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "season",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "startDate",
				"type": "string"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "studentID",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "setIssueTxHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "studentID",
				"type": "uint256"
			}
		],
		"name": "showIssue",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
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
				"name": "studentID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "season",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "startDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endDate",
				"type": "string"
			}
		],
		"name": "update",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contractAddress = "0x444de8c18Ddf9fa42799e3C4e4855A6be284BB16";
// const admin = "0x4D071014619015986ad747f680f55CF0cF790D5c";
var admin = "0x60A1c0D81347035CA2F12Cd5117EA5135fA2DEd8".toLowerCase();
window.onload = async function () {
	if (typeof web3 !== 'undefined') {
		console.log('Metamask가 설치되어 있습니다.')
		const accounts = await ethereum.enable();
        let account = accounts[0].toLowerCase();
		if(account != admin){
			alert('no');
			window.close();
		}
 	} else {
		window.close();
    }
}

let nameFormat = function(name) {
	let tmp = name.split(" ");
	let result = "";
	for (let i = 0; i < tmp.length; i++)
		result += (tmp[i].toUpperCase() + " ");
	return result.substring(0, result.length - 1);
}

let activeDateFormat = function(date) {
	if (date == 0)
		return date;
    let tmp = date.split("-");
    return tmp[0] + "." + tmp[1] + "." + tmp[2];
}

let issueDateFormat = function(year, month, date) {
	if (date == 0)
		return date;
    return year + "." + month + "." + date;
}

if (typeof web3 !== 'undefined') {
    console.log('Metamask가 설치되어 있습니다.')
    ethereum.enable();

    const contract = web3.eth.contract(contractABI).at(contractAddress);
	console.log(contract);

    $(".btn_register").on('click', async function () {
		const accounts = await ethereum.enable();
        let account = accounts[0];
		
		let season = $("#register_season").val();
        let studentID = $("#register_id").val();
		let name = nameFormat($("#register_name").val());
		let startDate = activeDateFormat($("#register_startDate").val());
		
		contract.register.sendTransaction(studentID, season, name, startDate, {
			from: account,
			gas: 300000
		}, function(error, result) {
			if(error)
				console.log(error);
			else
				console.log(result);
        });
    });
    
    $(".btn_graduate").on('click', async function () {
		const accounts = await ethereum.enable();
        let account = accounts[0];
        
        let studentID = $("#graduate_id").val();
        let endDate = activeDateFormat($("#graduate_endDate").val());
		
		contract.graduate.sendTransaction(studentID, endDate, {
			from: account,
			gas: 300000
		}, function(error, result) {
			if(error)
				console.log(error);
			else
				console.log(result);
        });
    });
    
    $(".btn_issue").on('click', async function () {
		const accounts = await ethereum.enable();
        let account = accounts[0];
        
		let studentID = $("#issue_id").val();
		
		let now = new Date();
        let issueDate = issueDateFormat(now.getFullYear(), now.getMonth() + 1, now.getDate());
		
		contract.issue.sendTransaction(studentID, issueDate, {
			from: account,
			gas: 300000
		}, function(error, hash) {
			if(error)
				console.log(error);
			else {
				contract.setIssueTxHash.sendTransaction(studentID, hash, {
					from: account,
					gas: 300000
				}, function(error, result) {
					if(error)
						console.log(error);
					else
						console.log(result);
				});
			}
        });
	});

	$(".btn_showIssue").on('click', async function () {
		const accounts = await ethereum.enable();
        let account = accounts[0];
        
		let studentID = $("#showIssue_id").val();
		
		contract.showIssue.call(studentID, {
			from: account
		}, function(error, result) {
			if(error)
				console.log(error);
			else
				console.log(result);
        });
	});

	$(".btn_update").on('click', async function () {
		const accounts = await ethereum.enable();
        let account = accounts[0];
		
		let season = $("#update_season").val();
		if (season == "")
			season = "default";
		let studentID = $("#update_id").val();
		if (studentID == "")
			studentID = 0;
		let name = nameFormat($("#update_name").val());
		if (name == "")
			name = "default";
		let startDate = activeDateFormat($("#update_startDate").val());
		if (startDate == "")
			startDate = "default";
		let endDate = activeDateFormat($("#update_endDate").val());
		if (endDate == "")
			endDate = "default";

		contract.update.sendTransaction(studentID, season, name, startDate, endDate, {
			from: account,
			gas: 300000
		}, function(error, result) {
			if(error)
				console.log(error);
			else
				console.log(result);
        });
    });
    
} else {
    console.log('Metamask 설치하세요');
}

