export default {
  getRoute() {
    const path = location.hash ? location.hash.slice(1) : ''
    const [quiz_type, category] = path.split('/')
    return { quiz_type, params: { category } }
  },
}
