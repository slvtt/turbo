export const fetchClient = async () => {
  const res = await fetch("https://api.example.com/data");
  return res.json();
};
