<h1> Skkrypto 개발 프로젝트 1팀 "1탱 2쫄 팀"의 프로젝트</h1>
<h2> "학회 홈페이지 및 학회원 학회활동 증명서 개발 진행" </h2>
<br>
<h3> 1. Member </h3>
<div id="about_team">

| 성명   	| 기수  	| 역할                         	|
|--------	|-----	|-------------------------------	|
| 박동민 	| 3th 	| 서버 연동 및 라우팅           	|
| 박승호 	| 5th 	| 스마트 컨트랙트 & 증명서 개발 	|
| 정채원 	| 4th 	| 홈페이지 Front-end 개발       	|

 ![ex_screenshot](./md_img/intro.png)



<h3> 2. Objective </h3>
<div id="about_objective">
> a. Skkrypto의 학회 홈페이지를 만들어, 보다 효과적으로 Skkrypto의 소식을 전달하고 Recruiting을 용이하게 함. <br>      
> b. Skkrypto의 정식 학회 활동 기간을 수료한 학회원들에게 블록체인 기반 증명서를 제공하여, 이력을 정확하게 증명할 수 있게 하고 학회에 관한 소속감을 제고시킴.
  
  ![ex_screenshot](./md_img/1T2Z.PNG)
  

<h3> 3. How to develop</h3>
> a. Front-end : Html, CSS, Javascript, Bootstrap 활용 (기존의 무료 템플릿에서 여러 코드를 추가하여 만듦) <br>
> b. Smart-contract :  Solidity, Ropsten 테스트넷 활용<br>
> c. 서버 연결 및 라우팅 : Node.js, express 이용 <br>
> d. Front-end와 Smart-contract 연동 : web3js와 메타마스크 이용<br>

<h3> 4. Details </h3>
<h4> a. Front-end </h4> 

>(1) Home (index page) : 학회 소개 / 학회 브로슈어 다운로드 / What to study / Recruiting (포스터, 지원서 다운로드) / After Skkrypto 기능 구현 <br>
(2) 학회 소개 (about page) : 학회 타임라인(연혁) / 학회 활동 이미지 슬라이드 / 학회 소개 카드뉴스 기능 구현 <br>
(3) 학회원 소개 (service page) : 학회원 소개 (기수, 학과, position, e-mail) 기능 구현 <br>
(4) 학회 활동 증명서 조회 (blog page) : 학회원의 학번을 입력하여 증명서를 이미지 파일로 다운로드 받을 수 있는 기능 구현 (단, PC 버전에서만 가능함. 모바일은 연동하지 못함) <br>
(5) FAQ (FAQ page) : 빈도수 높은 학회에 관한 질문들을 정리 (자문자답 형식)  <br>
(6) 관리자 page : 관리자 page는 일반 user는 접근할 수 없게, metamask와 연동시켜 설정해둔 학회 wallet일 경우에만 들어갈 수 있게 기능을 구현 <br>
이 페이지에서 학회원에 관한 학번, 활동 기간 등의 변수를 입력하고, Smart contract와 연동시켜 값이 블록체인에 기록되게 기능을 구현 <br>
(7) All page 하단 기능 : 학회의 Facebook / Instagram / Brunch / Github 링크와 하단에도 메뉴를 넣어, 클릭할 수 있는 기능을 구현 <br>

<h4> b. SmartContract </h4> 

>(1) Member 구조체 : 학회원의 개개인의 참여 정보를 담는 객체. <br>
(2) Certificate 구조체 : 수료증을 발급 기록을 담는 객체. <br>
(3) isActive Mapping : 학회원의 참여 정도를 구분하는 mapping. 현 활동 중인 학회원과 활동을 마친 학회원 구분을 목적으로 함. <br>
(4) members Mapping : 학회원 개개인을 식별하여 해당 Member 구조체를 value로 갖는 mapping. <br>
(5) isValid Mapping : 발급된 수료증의 유효성 여부를 구분하는 mapping. <br>
(6) certificates Mapping : 수료한 학회원을 식별하여 해당 Certificate 구조체를 value로 갖는 mapping. <br>
(7) register 함수 : 신규 학회원의 정보를 등록하는 역할. <br>
(8) graduate 함수 : 학회 활동을 마친 학회원에 대해 수료 인증하는 역할. <br>
(9) issue 함수 : 조건을 만족하는 학회원에 대해 수료증을 발급하는 역할. <br>
(10) showIssue 함수 : 수료증 발급을 위한 정보를 보여주는 역할. <br>
(11) update 함수 : 학회원의 등록 정보를 변경하는 역할.  <br>

<h4> c. 서버 연결 및 라우팅 </h4> 

>(1) web.js : 서버 구동의 중심이 되는 파일. <br>
(2) app.js : 어플리케이션의 중심이 되는파일  서버 설정 / 미들웨어 정의 / 라우트 정의 / 서버 운영을 위한 로직 정의 <br>
(3) views 폴더 : html파일이 들어있는 폴더. <br>
(4) routes 폴더 : 라우팅한 파일을 모아둔 폴더. get형식의 간단한 페이지만 존재하기에 한 파일에 모음<br>

<h4> d. Front와 smart contract 연동 </h4> 

두개의 페이지에서 프론트와 smart contract를 연동함<br>
<ol>
<li>관리자 페이지</li>
<li>학회 활동 증명서 조회 페이지</li>
</ol>
web3js와 메타마스크를 통하여 이더리움 상의 컨트랙트와 연동함(admin.js)<br>

![ex_screenshot](./md_img/1T2Zcerti.jpg)

<h3> 5. Results </h3>
Responsive Webapplication homepage & Certification (in homepage) <br>
http://skkrypto.com/
