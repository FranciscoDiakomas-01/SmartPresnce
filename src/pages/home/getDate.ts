
export default function getDate(){
  const date = new Date()
  const str = date.toLocaleString("Pt-BR")
  const month = ["Janeiro" , "Fevereiro" , "Março" , "Abril" , "Maio" , "Junho" , "Julho" , "Agosto" , "Setembro" , "Outubro" , "Novembro" , "Dezembro"]
  const week = ["Domingo" , "Segunda-feira" , "Terça-feira" , "Quarta-feira" , "Quinta-feira" , "Sexta-feira" , "Sábado" , "domingo"]
  const m = month[date.getMonth()]
  const w = week[date.getDay()]
  const resultDate = `${m} , ${w} ${str}`
  return resultDate
}