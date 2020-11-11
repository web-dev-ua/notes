export default function ({ $axios, store }) {
  $axios.defaults.baseURL = process.env.apiUrl

  if (process.server) {
    return
  }

  $axios.onError((data) => {
    if (data.response) {
      store.dispatch('snackbar/showError', getErrorText(data.response))
    } else {
      store.dispatch('snackbar/showError', 'Проверьте интернет соединение')
    }
  })
}

function getErrorText (response) {
  let errorText = 'Произошла ошибка! Попробуйте ещё раз.'
  if (response.status === 422) {
    errorText = response.data.errors[Object.keys(response.data.errors)[0]]
    if (typeof errorText === 'object') { errorText = errorText[Object.keys(errorText)[0]] }
  } else if (response.data && response.data.message) { errorText = response.data.message }

  return errorText
}
