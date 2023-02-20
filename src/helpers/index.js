export const calcDiscount = (price = 0, discount = 0)=> price - (price * (discount / 100))

const DEF_FORMAT_OPT = {
  dateStyle: 'full',
  timeStyle: 'short',
}

const DEF_LANG = 'es-AR'

export const formatDate = (date, opt = DEF_FORMAT_OPT) => {
  const intl = new Intl.DateTimeFormat(DEF_LANG, opt)
  
  return intl.format(date)
}