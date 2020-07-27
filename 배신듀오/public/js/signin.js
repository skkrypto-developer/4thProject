console.log("hi")
if (typeof web3 !== 'undefined') {
    console.log('sign in 페이지 Metamask가 설치되어 있습니다.')
	ethereum.enable();

	async function getAccount() {
		// 7. getAccount
		const accounts = await ethereum.enable();
		const account = await accounts[0]
        // 8. id myAddress 에 account 기입
        console.log(account);
        $('input[name=address]').val(account)    
	}
    getAccount();
}
