const listABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
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
		"name": "TICKET_PRICE",
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
		"constant": false,
		"inputs": [],
		"name": "drawing2",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "number1",
				"type": "uint256"
			},
			{
				"name": "number2",
				"type": "uint256"
			},
			{
				"name": "number3",
				"type": "uint256"
			},
			{
				"name": "number4",
				"type": "uint256"
			},
			{
				"name": "number5",
				"type": "uint256"
			},
			{
				"name": "numberp",
				"type": "uint256"
			}
		],
		"name": "bet",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "drawNumbers",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "drawing1",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "random",
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
		"constant": false,
		"inputs": [],
		"name": "drawing3",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "drawing0",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "drawing5",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "MAX_POWERBALL_NUMBER",
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
		"constant": false,
		"inputs": [],
		"name": "drawing4",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "MAX_NUMBER",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_result",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "Won",
		"type": "event"
	}
]
web3 = new Web3(web3.currentProvider);
const listAddress = '0xc1f7c4fb4a71d0e2c667f308545a6e941ad84ca2';
var listContract = web3.eth.contract(listABI).at(listAddress);
console.log(web3.version);
if (typeof web3 !== 'undefined') {
    console.log('Metamask가 설치되어 있습니다.')
	ethereum.enable();
	var account;
	async function getAccount() {
		accounts = await ethereum.enable();
		account = accounts[0];
		console.log(account)
		$('#myAddress').html("Account : " + account);
		web3.eth.getBalance(account, (error, result)=>{
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
			$('#balance').html("balance : "+result.c[0]/10000+"eth");
		})
		web3.eth.getBalance(listAddress, (error, result)=>{
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
			$('.jackpot').html("Jackpot :   "+result.c[0]/10000+" eth");
		})
		$('#draw0').html(listContract.drawing0.call({from : listAddress},console.log));
		$('#draw1').html(listContract.drawing1.call({from : listAddress},console.log));
		$('#draw2').html(listContract.drawing2.call({from : listAddress},console.log));
		$('#draw3').html(listContract.drawing3.call({from : listAddress},console.log));
		$('#draw4').html(listContract.drawing4.call({from : listAddress},console.log));
		$('#draw5').html(listContract.drawing5.call({from : listAddress},console.log));
	}

	getAccount();
	$(function(){
		$('.fun-btn').on('click', function(){
			let pick1 = $("#pick-1").val();
			let pick2 = $("#pick-2").val();
			let pick3 = $("#pick-3").val();
			let pick4 = $("#pick-4").val();
			let pick5 = $("#pick-5").val();
			let pickp = $("#pick-p").val();
			console.log(listContract);
			listContract.bet.sendTransaction(pick1, pick2, pick3, pick4, pick5, pickp, {from : account, value : 1e16}, function(err, result){
				if (err) {
					console.log(err);
				} else {
					console.log(result);
				}
			});
			
			web3.eth.getBalance(listAddress, (error, result)=>{
				if (error) {
					console.log(error);
				} else {
					console.log(result);
				}
				$('.jackpot').html("Jackpot :   "+result.c[0]/10000+" eth");
			})
		});
	})	;

} else {
    $(function () {
        alert('Metamask 설치하세요');
        window.location.href = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko'
	})
}