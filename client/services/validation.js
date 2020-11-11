export const required = (text = 'Поле обязательно для заполнения') => {
  return (v) => {
    if (typeof v === 'object' && v !== null) {
      return !!Object.keys(v).length || text
    }

    return !!v || text
  }
}

export const minLength = (length, text = `Минимальная длина ${length} символов`) => {
  return v => !v || !v.length || v.length >= length || text
}

export const maxLength = (length, text = `Максимальная длина ${length} символов`) => {
  return v => !v || !v.length || v.length <= length || text
}
