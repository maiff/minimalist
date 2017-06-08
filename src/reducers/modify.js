const modify = (state = {}, action) => {
  switch (action.type) {
    case 'MODIFY_ID':
      return (
        {
          id: action.id,
          flag: true,
          text: action.text
        })
    case 'SET_FLAG_TO_FALSE':
      return ({
        flag: false
      })
    default:
      return state
  }
}

export default modify
