export default async function Main (...args) {
    const res = await fetch(...args);
  
    return res.json();
};