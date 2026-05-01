// Pega a data formatada em Sexta, 2 de fevereiro
export const getFormattedDate = () => {
  const date = new Date();
  let formattedDate = formatter.format(date);
  formattedDate = formattedDate.replace("-feira", "");
  formattedDate = capitalizeFirstLetter(formattedDate);
  return formattedDate;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const formatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
