const FormRaw = ({ label, placeHolder, type, name, error = '' }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend capitalize">{label}</legend>
      <input
        type={type}
        className="input w-full"
        placeholder={placeHolder}
        name={name}
      />
      {error && <p className="label">error</p>}
    </fieldset>
  )
}

export default FormRaw
