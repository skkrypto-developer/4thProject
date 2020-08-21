// const admin = "0x4D071014619015986ad747f680f55CF0cF790D5c";
const admin = "0x60A1c0D81347035CA2F12Cd5117EA5135fA2DEd8".toLowerCase();


	$(".btn_admin").on('click', async function () {
		if (typeof web3 !== 'undefined') {
			console.log('Metamask가 설치되어 있습니다.')
			ethereum.enable();
			const accounts = await ethereum.enable();
			let account = accounts[0].toLowerCase();
			console.log(account.localeCompare(admin));
			if (account.localeCompare(admin) == 0) {
				window.open("./admin");
			} else {
				alert("NO");
			}
		}else {
			console.log('Metamask 설치하세요');
		}
	});
	
 