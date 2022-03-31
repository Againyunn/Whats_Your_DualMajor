//서버로부터 보안HTTP request를 받기 위한 함수
//user의 access token을 받아 HTTP Authorization header로 반환

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }



// 노드JS 용
//   export default function authHeader() {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user && user.accessToken) {
//       // for Node.js Express back-end
//       return { 'x-access-token': user.accessToken };
//     } else {
//       return {};
//     }
//   }