console.log("am I right?")
if (typeof web3 !== 'undefined') {
    ethereum.enable();
    console.log("hihi");
    // 10. id send 버튼이 클릭되면
    
	$('button').on('click', async function () {
        console.log("herehere")
		const myAccount = web3.eth.accounts[0]; 
        const balance = web3.eth.getBalance(myAccount,function(err,result) {
            if (err) throw err;
            if (result < 10000) {
                console.log(balance);
                alert("Not enough Coin");
            } else {
                //web3.eth.transfer("0x3a2eE196FCEE211B7CBD6887949275f3a7D52Aa3",100);
                web3.eth.sendTransaction({
                    from: myAccount,
                    to: "0x3a2eE196FCEE211B7CBD6887949275f3a7D52Aa3",
                    value: 10000000000000000000
                }, function(err, transactionHash) {
                    console.log(transactionHash);
                    window.location.href = "http://localhost:3000/create_survey_detail"
                });

            }
            
        })
 })
console.log("????????????????????")


}
else {
        console.log("실패")
        alert('Metamask 설치하세요');
        window.location.href = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko'
}