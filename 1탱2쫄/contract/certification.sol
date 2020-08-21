pragma solidity ^0.6.8;
//SPDX-License-Identifier: MIT

contract token {

    uint256 private _certificateCnt = 0;    // 증명서 총 개수
    string private _tokenName;
    string private _tokenSymbol;

    struct Member {
        string season;
        string name;
        string startDate;
        string endDate;
    }

    struct Certificate {
        bytes32 id;
        bytes32 txHash;
        string issueDate;
    }

    mapping (uint256 => uint256) private _isActive;         // 0 : 일반인, 1 : 활동중, 2 : 졸업
    mapping (uint256 => Member) private _members;
    mapping (uint256 => bool) private _isValid;             // 증명서 발급 여부 확인
    mapping (uint256 => Certificate) private _certificates;

    constructor () public {
        _tokenName = "SKKRYPTO";
        _tokenSymbol = "SKKRYPTO";
    }

    function register(uint256 studentID, string memory season, string memory name, string memory startDate) public {
        require(_isActive[studentID] == 0, "Already Enrolled Student");
        _isActive[studentID] = 1;
        _members[studentID] = Member(season, name, startDate, "0");
    }

    function graduate(uint256 studentID, string memory endDate) public {
        require(_isActive[studentID] == 1, "Non-Enrolled or Already-Graduated");
        _isActive[studentID] = 2;
        _members[studentID].endDate = endDate;
    }

    function issue(uint256 studentID, string memory issueDate) public {
        require(_isActive[studentID] == 2, "Not Yet Graduate");
        require(_isValid[studentID] == false, "Already Issued");
        uint256 hashInput = 0;
        hashInput += uint256(keccak256(abi.encode(studentID)));
        hashInput += uint256(keccak256(abi.encode(_members[studentID].startDate)));
        hashInput += uint256(keccak256(abi.encode(_members[studentID].endDate)));
        hashInput += uint256(keccak256(abi.encode(_certificates[studentID].issueDate)));
        _certificates[studentID].id = keccak256(abi.encode(hashInput));
        _certificates[studentID].issueDate = issueDate;
    }

    function setIssueTxHash(uint256 studentID, bytes32 hash) public {
        require(_isActive[studentID] == 2, "Not Yet Graduate");
        require(_isValid[studentID] == false, "Already Issued");
        _certificates[studentID].txHash = hash;
        _isValid[studentID] = true;
        _certificateCnt++;
    }

    function chkIssue(uint256 studentID) public view returns (bool) {
        return _isValid[studentID];
    }

    function showIssue(uint256 studentID) public view returns (bytes32, bytes32, string memory, string memory, string memory, string memory, string memory) {
        if (_isValid[studentID] == true)
            return (_certificates[studentID].id, _certificates[studentID].txHash,_members[studentID].season, _members[studentID].name, _members[studentID].startDate, _members[studentID].endDate, _certificates[studentID].issueDate);
        else
            return (0, 0, "0", "0", "0", "0", "0");
    }

    // 인자 없으면 디폴트가 0인 지 확인
    function update( uint256 studentID, string memory season, string memory name, string memory startDate, string memory endDate) public {
        require(_isActive[studentID] != 0, "Not Registered");
        if ( keccak256(abi.encode(season)) != keccak256(abi.encode("default")) )
            _members[studentID].season = season;
        if ( keccak256(abi.encode(name)) != keccak256(abi.encode("default")) )
            _members[studentID].name = name;
        if ( keccak256(abi.encode(startDate)) != keccak256(abi.encode("default")) )
            _members[studentID].startDate = startDate;
        if ( keccak256(abi.encode(endDate)) != keccak256(abi.encode("default")) )
            _members[studentID].endDate = endDate;
    }

    function getCertificateCnt() public view returns (uint256) {
        return _certificateCnt;
    }

}