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

let info;

$('#btn-chkCert').on('click', async function(){
    if (typeof web3 !== 'undefined') {
        console.log('Metamask가 설치되어 있습니다.')
        ethereum.enable();
        const contract = web3.eth.contract(contractABI).at(contractAddress);
        const accounts = await ethereum.enable();
        let account = accounts[0];
        
		let studentID = $("#input-studentId").val();
		
		contract.chkIssue.call(studentID, {
			from: account
		}, function(error, isIssued) {
			if(error) {
                console.log(error);
                alert("Improper action");
            } else {
				let duration = 1200;
				if (!isIssued) {
					$('#outputResult').slideUp(duration);

					$('#outputChk').text('발급 가능한 증명서가 없습니다.');
					$('#outputChk').slideDown(duration);
				}
				else {
					contract.showIssue.call(studentID, {
						from: account
					}, function(error, result) {
						if (error) {
							console.log(error);
                			alert("Improper action");
						}
						else {
							$('#outputChk').text('다음 증명서를 발급 가능합니다.');
							$('#studentId').text(studentID);
							$('#memberName').text(result[3]);
							$('#issueDate').text(result[6]);
							$('#txHash').text(result[1]);
							$('#txHash').attr('href', 'https://ropsten.etherscan.io/tx/' + result[1]);
							$('#txHash').attr('target', '_blank');
							
							$('#outputChk').slideDown(duration);
							$('#outputResult').slideDown(duration);

							info = result;
							info.push(studentID);
						}
					});
				}
            }
		});
		
    }else {
        console.log('Metamask 설치하세요');
    }
});

$('#btn-getCert').on('click', function() {
	if (info != null) {
		sessionStorage.setItem('hash', info[1]);
		sessionStorage.setItem('season', info[2]);
		sessionStorage.setItem('name', info[3]);
		sessionStorage.setItem('startDate', info[4]);
		sessionStorage.setItem('endDate', info[5]);
		sessionStorage.setItem('certifyDate', info[6]);
		sessionStorage.setItem('schoolId', info[7]);

		window.open("/certification", "_blank", "width=1015px, height=720px, menubar=no, status=no, toolbar=no");
	}
});

$("#download").on('click', function(e) {
	html2canvas($('.certifyContainer').get(0)).then(function(canvas) {
		let el = document.getElementById("target");
		el.href = canvas.toDataURL("image/jpeg");
		el.download = 'certification.jpg';
		el.click();
	});
});