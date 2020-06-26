const admin = "0x4D071014619015986ad747f680f55CF0cF790D5c";


	$(".btn_admin").on('click', async function () {
		if (typeof web3 !== 'undefined') {
			console.log('Metamask가 설치되어 있습니다.')
			ethereum.enable();
			const accounts = await ethereum.enable();
			let account = accounts[0];
			console.log(account);
			console.log(admin);
			if (account.toLowerCase() == admin.toLowerCase()) {
				window.open("./admin");
			} else {
				alert("NO");
			}
		}else {
			console.log('Metamask 설치하세요');
		}
	});
	
 