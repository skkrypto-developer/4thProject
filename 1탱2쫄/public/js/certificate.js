const contractABI = [
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
	}
]
const contractAddress = "0xDC5724C1D0573fFDCD89F2B980AF7cA71588b418";

$('#btncert1').on('click',async function(){
    if (typeof web3 !== 'undefined') {
        console.log('Metamask가 설치되어 있습니다.')
        ethereum.enable();
        const contract = web3.eth.contract(contractABI).at(contractAddress);
        const accounts = await ethereum.enable();
        let account = accounts[0];
        
		let studentID = $("#cert_schoolId").val();
		
		contract.showIssue.call(studentID, {
			from: account
		}, function(error, result) {
			if(error){
                console.log(error);
                alert("Improper action");
            }else{
                
                sessionStorage.setItem('hash',result[0]);
                sessionStorage.setItem('schoolId',result[1].c[0]);
                sessionStorage.setItem('season',result[2]);
                sessionStorage.setItem('name',result[3]);
                sessionStorage.setItem('startDate',result[4]);
                sessionStorage.setItem('endDate',result[5]);
                sessionStorage.setItem('certifyDate',result[6]);


                
                window.open("/certification","_blank","width=1316px, height=733px,menubar=no, status=no, toolbar=no");
            }
        });


       
   
    }else {
        console.log('Metamask 설치하세요');
    }
   
})

$("#btnCertify").on('click', function(e) {
    
    html2canvas($('.certifyContainer').get(0)).then(function(canvas) {
        var el = document.getElementById("target");
        el.href = canvas.toDataURL("image/jpeg");
        el.download = 'certification.jpg';
        el.click();
        });
    });

