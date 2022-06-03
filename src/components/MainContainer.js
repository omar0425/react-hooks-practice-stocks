import React, {useEffect,useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [myStocks, setMyStocks] = useState([])
  const [sortBy,setSortBy] = useState("")
  
useEffect(()=>{
    fetch('http://localhost:3001/stocks')
    .then((res) => res.json())
    .then((data) => setStocks(data))
},[])

function buyStock(stock){
  if(!myStocks.includes(stock)){
const updatedMyStocks = [...myStocks, stock]
setMyStocks(updatedMyStocks)
  }
  else{
    alert('You already have it chill!')
  }}
  function sellStock(stock){
    const updatedMyStocks = [...myStocks].filter(myStock => {
      return myStock.id !== stock.id
    })
    setMyStocks(updatedMyStocks)
  }
  useEffect(() => {
    if(sortBy === 'Alphabetically'){
    const sortedStocksName = sortByName()
    setStocks(sortedStocksName)
    } if(sortBy === 'Price'){
      const sortedStocksPrice = sortByPrice()
      setStocks(sortedStocksPrice)
    }
}, [sortBy])

function sortStocks(e){
setSortBy(e.target.value)
  }

  function sortByName(){
return [...stocks].sort(function(a,b){
  let nameA = a.name.toUpperCase()
  let nameB = b.name.toUpperCase()
  if(nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  return 0;
})
  }

  function sortByPrice(){
    return [...stocks].sort(function(a, b) {
      return a.price - b.price;
    })
    }
  return (
    <div>
      <SearchBar sortStocks = {sortStocks} sortBy= {sortBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} handleClick = {buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer myStocks = {myStocks} handleClick= {sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
