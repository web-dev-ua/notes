export const createFormData = (object, form, namespace) => {
  const formData = form || new FormData()
  for (const property in object) {
    // eslint-disable-next-line no-prototype-builtins
    if (!object.hasOwnProperty(property) || !object[property]) {
      continue
    }
    const formKey = namespace ? `${namespace}[${property}]` : property
    if (object[property] instanceof Date) {
      formData.append(formKey, object[property].toISOString())
    } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
      createFormData(object[property], formData, formKey)
    } else if (typeof object[property] === 'boolean') {
      formData.append(formKey, Number(object[property]))
    } else {
      formData.append(formKey, object[property])
    }
  }
  return formData
}

export const createPutFormData = (object, form, namespace) => {
  object._method = 'PUT'

  return createFormData(object, form, namespace)
}
