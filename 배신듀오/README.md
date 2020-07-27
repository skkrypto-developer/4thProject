# Survey_Project

본 프로젝트는 블록체인 기반 설문조사 서비스로, 설문을 원하는 사람들이 쉽게 설문을 올리고 그 결과를 받을 수 있는 웹 페이지입니다.       
또한, 설문을 올리는 사람들은 그 대가로 토큰을 지불하고, 설문에 참여하는 사람들은 보상으로 해당 토큰을 얻을 수 있습니다.

## 설치 방법

1. 다음의 라이브러리, 패키지를 사용해야 합니다.

   **1) node js**

   **2) framework : express**

   **3) database : mysql**

   **4) view engine : ejs**

   **5) web3.js**

2.  Mysql **로컬 데이터 베이스**는 다음과 같습니다. 프로그램을 실행하기 위해서는 로컬 데이터베이스를 구성해야 합니다.

   ![image-20200728013426911](C:\Users\BaeJunho\AppData\Roaming\Typora\typora-user-images\image-20200728013426911.png)

   ![image-20200728013505480](C:\Users\BaeJunho\AppData\Roaming\Typora\typora-user-images\image-20200728013505480.png)

3. Ethereum 기반 **BetrayToken 스마트컨트랙트**는 Contract 폴더에서 확인할 수 있습니다.

4. 포트는 **localhost:3000**을 이용합니다.

## 사용 방법

1. **Sign Up** 페이지에서 회원가입을 합니다. 
2. 회원가입 시 **Metamask**가 연동되어 지갑 주소가 연결되고 계정을 생성할 수 있습니다.
```js
  if (typeof web3 !== 'undefined') {
      console.log('sign in 페이지 Metamask가 설치되어 있습니다.')
    ethereum.enable();

    async function getAccount() {
      const accounts = await ethereum.enable();
      const account = await accounts[0]
          console.log(account);
          $('input[name=address]').val(account)    
    }
      getAccount();
  }
// 회원가입 시 Metamask 지갑 주소를 불러오는 코드입니다.
```

3. 회원가입 후 로그인하여 원하는 Create Survey 페이지에서 설문을 등록하실 수 있습니다. 
>* **Create Survey** 페이지에 접속합니다.
>* 우측에 보이는 질문 형식 중에서 원하는 항목을 좌측에 드래그합니다.
>* 좌측에 놓인 형식에 맞게 질문을 기입해줍니다. 
>* 위와 같은 과정을 반복하여, 조사하고자 하는 설문을 만드실 수 있습니다. 
4. 설문 등록 뿐만 아니라, 설문조사에 참여하여 보상으로 토큰을 받으실 수 있습니다. 

## Contribute

**MIT LICENSE를 따릅니다.

## 주의점 

- 설문에 참여하는 기능이 아직 미구현되어 있습니다.
- 현재 토큰 사용에 관한 이슈로, 서비스 내 토큰은 테스트 이더로 사용하고 있습니다.

