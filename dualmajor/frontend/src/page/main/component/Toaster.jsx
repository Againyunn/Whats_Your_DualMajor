import React from 'react';
import { Toast } from 'react-bootstrap';

export default function Toaster(title, content) {
    // console.log("test in");

  return (
    <Toast>
        <Toast.Header>
            <img src={require('../../../media/structure/부_원형.jpg')} className="rounded me-2" alt="부_로고" />
            <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{content}</Toast.Body>
    </Toast>
  )
}
