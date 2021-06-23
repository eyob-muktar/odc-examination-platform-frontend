

export default (previousState = [], { type, payload }) => {
  if (type === 'SET_QUESTIONS') {
    console.log(previousState)
    return [...previousState, payload]
  }
  if (type === 'SET_EDITED_QUESTION') {
    console.log(previousState)
    let index = previousState.findIndex(
      (question) => question._id === payload._id
    )
    previousState[index] = payload
  }
  return previousState

}