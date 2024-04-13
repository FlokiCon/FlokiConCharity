import React from 'react';

export const Req = ({data}) => {
  let users = data.result;
  let formated = []
  for (let i = 0; i < users.length; ++i) {
    formated.push(<h1 key={i}>{users[i]}</h1>)
  }
  return (
    <div>
      {formated}
    </div>
  )
}
