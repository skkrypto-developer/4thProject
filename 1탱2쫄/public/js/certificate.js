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
	}
]
const contractAddress = "0x3797E0746dd67bA64C0767e77186544D357f201c";

let info;

function checkNetworkId() {
	if (typeof web3 !== 'undefined') {
		return new Promise((resolve, reject) => {
			web3.version.getNetwork(function(err, result) {
				if (err) { reject(err); }
				else { resolve(result); }
			})
		});
	}
	else { return -1; }
}


$('#btn-chkCert').on('click', async function(){
    if (typeof web3 !== 'undefined') {
        ethereum.enable();
        const accounts = await ethereum.enable();
		const account = accounts[0];
		const contract = web3.eth.contract(contractABI).at(contractAddress);

		let networkId = await checkNetworkId();
		if (networkId == -1) {
			alert('Metamask를 설치하세요.');
			return;
		}
		else if (networkId != 3) {
			alert('Ropsten Network를 사용하세요.');
			return;
		}
		let studentId = $('#input-studentId').val();
		contract.chkIssue.call(studentId, {
			from: account
		}, function(error, isIssued) {
			if(error) {
				alert("Something wrong calling smart contract method.");
				return;
            } else {
				let duration = 1200;
				if (!isIssued) {
					$('#outputResult').slideUp(duration);

					$('#outputChk').text('발급 가능한 증명서가 없습니다.');
					$('#outputChk').slideDown(duration);
				}
				else {
					contract.showIssue.call(studentId, {
						from: account
					}, function(error, result) {
						if (error) {
							alert("Something wrong calling smart contract method.");
							return;
						}
						else {
							$('#outputChk').text('다음 증명서를 발급 가능합니다.');
							$('#studentId').text(studentId);
							$('#memberName').text(result[3]);
							$('#issueDate').text(result[6]);
							$('#txHash').text(result[1]);
							$('#txHash').attr('href', 'https://ropsten.etherscan.io/tx/' + result[1]);
							$('#txHash').attr('target', '_blank');
							
							$('#outputChk').slideDown(duration);
							$('#outputResult').slideDown(duration);

							info = result;
							info.push(studentId);
						}
					});
				}
            }
		});
		
    } else {
        alert('Metamask를 설치하세요.');
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