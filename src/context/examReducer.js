export default (previousState = [], { type, payload }) => {
  if (type === 'SET_EXAM_QUESTIONS') {
    return payload
  }
  return previousState
}