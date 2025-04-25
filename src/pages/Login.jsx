import { FormRaw, SubmitBtn } from '../components'

const Login = () => {
  return (
    <div className="grid h-screen place-items-center ">
      <form action="" className="w-96 shadow-md p-5 rounded">
        <h2 className="text-center text-3xl uppercase font-bold">login</h2>
        <FormRaw label="email" type="email" name="email" placeHolder="email" />
        <FormRaw
          label="password"
          type="password"
          name="password"
          placeHolder="password"
        />
        <SubmitBtn submitted="login" />
      </form>
    </div>
  )
}

export default Login
