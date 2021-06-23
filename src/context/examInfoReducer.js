export default (previousState = [], { type, payload }) => {
  if (type === 'SET_EXAM_INFO') {
    return payload
  }
  return previousState
}