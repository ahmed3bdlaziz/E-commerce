import { useRouteError } from 'react-router-dom'

const ErrorElement = () => {
  const error = useRouteError()
  console.log(error)

  return <div>there is an error</div>
}

export default ErrorElement
