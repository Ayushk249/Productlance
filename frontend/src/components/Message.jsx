import { Alert } from "react-bootstrap";

import React from 'react'

const Message = ({variant,childern}) => {
  return (
    <Alert variant={variant}>
        {childern}
    </Alert>
  )
}

Message.defaultProps= {
    variant:'info'
}

export default Message